import torch
from torch.utils.data import Dataset, DataLoader
import torch.nn as nn
import torch.optim as optim
import pandas as pd
from .models import Rating

class PlacesDataset(Dataset):
    def __init__(self, data_frame):
        self.user_idx = torch.LongTensor(data_frame['user_idx'].values)
        self.place_idx = torch.LongTensor(data_frame['place_idx'].values)
        self.ratings = torch.FloatTensor(data_frame['rating'].values)

    def __len__(self):
        return len(self.ratings)

    def __getitem__(self, idx):
        return self.user_idx[idx], self.place_idx[idx], self.ratings[idx]

class MatrixFactorization(nn.Module):
    def __init__(self, n_users, n_places, embedding_dim=50):
        super(MatrixFactorization, self).__init__()
        self.user_embeddings = nn.Embedding(n_users, embedding_dim)
        self.place_embeddings = nn.Embedding(n_places, embedding_dim)
    
    def forward(self, user_idx, place_idx):
        user_embeds = self.user_embeddings(user_idx)
        place_embeds = self.place_embeddings(place_idx)
        ratings_pred = (user_embeds * place_embeds).sum(dim=1)
        return ratings_pred

class RecommendationSystem:
    def __init__(self):
        self.model = None
        self.user_to_index = {}
        self.place_to_index = {}
        self.n_users = 0
        self.n_places = 0

    def load_data(self):
        ratings = Rating.objects.all().values('username', 'place', 'rating')
        df = pd.DataFrame(ratings)
        
        user_ids = df['username'].unique()
        place_ids = df['place'].unique()
        
        self.n_users = len(user_ids)
        self.n_places = len(place_ids)

        self.user_to_index = {user: idx for idx, user in enumerate(user_ids)}
        self.place_to_index = {place: idx for idx, place in enumerate(place_ids)}
        
        df['user_idx'] = df['username'].map(self.user_to_index)
        df['place_idx'] = df['place'].map(self.place_to_index)
        
        return df

    def train_model(self):
        df = self.load_data()
        dataset = PlacesDataset(df)
        dataloader = DataLoader(dataset, batch_size=64, shuffle=True)
        
        model = MatrixFactorization(self.n_users, self.n_places)
        criterion = nn.MSELoss()
        optimizer = optim.Adam(model.parameters(), lr=0.001)
        
        n_epochs = 10
        for epoch in range(n_epochs):
            model.train()
            epoch_loss = 0.0
            
            for user_batch, place_batch, rating_batch in dataloader:
                optimizer.zero_grad()
                predictions = model(user_batch, place_batch)
                loss = criterion(predictions, rating_batch)
                loss.backward()
                optimizer.step()
                epoch_loss += loss.item() * len(rating_batch)
            
            epoch_loss /= len(dataset)
            print(f'Epoch {epoch+1}/{n_epochs}, Loss: {epoch_loss}')
        
        model.eval()
        self.model = model
        return model

    def recommend(self, user_id):
        if self.model is None:
            self.train_model()

        if user_id not in self.user_to_index:
            return None

        user_index = self.user_to_index[user_id]
        user_idx_tensor = torch.LongTensor([user_index])
        
        all_place_idx = torch.LongTensor(list(range(self.n_places)))
        predicted_ratings = self.model(user_idx_tensor.repeat(self.n_places), all_place_idx)
        
        place_predictions = pd.DataFrame({
            'place': list(self.place_to_index.keys()),
            'predicted_rating': predicted_ratings.detach().numpy()
        })
        
        return place_predictions.sort_values(by='predicted_rating', ascending=False)
