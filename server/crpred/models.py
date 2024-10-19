from django.db import models
from api.models import User, Place

# class Rating(models.Model):
#     username = models.CharField(max_length=20)
#     place = models.CharField(max_length=50)
#     rating = models.IntegerField()

class Rating(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null= True)  # Now a foreign key to User
    # place = models.ForeignKey(Place, on_delete=models.CASCADE, null = True)  # Assuming you want to link it to a Place
    user = models.ForeignKey(User, related_name='ratings_by_user', on_delete=models.CASCADE)
    place = models.ForeignKey(Place, related_name='ratings_by_place', on_delete=models.CASCADE)
    rating = models.IntegerField()

    def __str__(self):
        return f'{self.user.username} rated {self.place.name} with {self.rating}'

