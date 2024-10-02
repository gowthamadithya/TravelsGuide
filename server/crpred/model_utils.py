import torch
from torch.utils.data import Dataset, DataLoader, random_split
import torch.nn as nn
import torch.optim as optim
import pandas as pd
from .models import Rating

# for model ref visit 
# https://www.kaggle.com/code/gowthamadithya/mfm-nn

class PlacesDataset(Dataset):
    def __init__(self, df):
        self.userdf = torch.tensor(df['user_id'].values, dtype=torch.long) 
        self.placedf = torch.tensor(df['item_id'].values, dtype=torch.long)
        self.ratingdf = torch.tensor(df['rating'].values, dtype=torch.float32)

    def __len__(self):
        return len(self.ratingdf)

    def  __getitem__(self, index):
        return (self.userdf[index], self.placedf[index], self.ratingdf[index])

class Mfm(nn.Module):
    def __init__(self, num_users, num_places, vector_dim=50):
        super(Mfm, self).__init__()
        self.user_vector_set = nn.Embedding(num_users, vector_dim)
        self.place_vector_set = nn.Embedding(num_places, vector_dim)
        
    def forward(self, users, places):
        return (self.user_vector_set(users) * self.place_vector_set(places)).sum(1)

class RecommendationSystem:
    def __init__(self):
        self.model = None
        self.df = None
        self.num_users = 0
        self.num_places = 0
        self.unique_places = None
        self.unique_users = None
        self.batch_size = 64
        self.decline_streak_threshold = 3
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    def load_data(self):
        ratings = Rating.objects.all().values('username', 'place', 'rating')
        df = pd.DataFrame(ratings)
        
        self.unique_users = df['username'].unique()
        self.unique_places = df['place'].unique()
        
        self.num_users = len(self.unique_users)
        self.num_places = len(self.unique_places)

        df['user_id'] = pd.factorize(df['username'])[0]
        df['item_id'] = pd.factorize(df['place'])[0]
        
        return df

    def train_model(self):
        self.df = self.load_data()
        dataset = PlacesDataset(self.df)

        # Split the dataset into training and validation sets
        train_size = int(0.8 * len(dataset))
        val_size = len(dataset) - train_size
        train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

        train_loader = DataLoader(train_dataset, batch_size=self.batch_size, shuffle=True)
        val_loader = DataLoader(val_dataset, batch_size=self.batch_size, shuffle=False)
        
        model = Mfm(self.num_users, self.num_places, 50).to(self.device)
        loss_fn = nn.MSELoss()
        optimizer = optim.Adam(model.parameters(), lr=1e-3)
        
        n_epochs = 128
        best_val_loss = float('inf')
        decline_streak = 0
        
        for epoch in range(n_epochs):
            # Training phase
            model.train()
            epoch_loss = 0.0
            
            for user_batch, place_batch, rating_batch in train_loader:
                optimizer.zero_grad()
                predictions = model(user_batch.to(self.device), place_batch.to(self.device))
                loss = loss_fn(predictions, rating_batch.to(self.device))
                loss.backward()
                optimizer.step()
                epoch_loss += loss.item() * len(rating_batch)
            
            epoch_loss /= len(train_dataset)
            print(f'Epoch {epoch + 1}/{n_epochs}, Training Loss: {epoch_loss}')

            # Validation phase
            model.eval()
            val_loss = 0.0
            
            with torch.no_grad():
                for user_batch, place_batch, rating_batch in val_loader:
                    predictions = model(user_batch.to(self.device), place_batch.to(self.device))
                    loss = loss_fn(predictions, rating_batch.to(self.device))
                    val_loss += loss.item() * len(rating_batch)

            val_loss /= len(val_dataset)
            print(f'Validation Loss: {val_loss}')

            if val_loss < best_val_loss:
                best_val_loss = val_loss
                decline_streak = 0
            else:
                decline_streak += 1
        
            if decline_streak > self.decline_streak_threshold:
                print('hit decline streak hence stopping training')
                break

        model.eval()
        self.model = model
        return model

    def recommend(self, username):
        if self.model is None:
            self.train_model()
    
        if username not in self.unique_users:
            return None
        
        user_id = self.df.loc[self.df['username'] == username, 'user_id'].values[0]

        # num_places = self.model.place_vector_set.weight.shape[0]

        with torch.no_grad():
            user_id_in_tensor = torch.LongTensor([user_id])
            place_ids = torch.LongTensor(list(range(self.num_places)))
            predictions = self.model(user_id_in_tensor.repeat(self.num_places), place_ids)

        predictions_np = predictions.detach().numpy()  
    
        predictions_df = pd.DataFrame({
            'item_id': range(self.num_places),
            'item': self.unique_places,  
            'predicted_rating': predictions_np
        })
    
        return predictions_df.sort_values(by='predicted_rating', ascending=False)
