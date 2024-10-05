from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    age = models.IntegerField(null=True, blank=True)  # Optional field
    liked_places = models.JSONField(default=list, blank=True)  # List of places user rated above 3 
    visited_places = models.JSONField(default=list, blank=True)  # List of places user visited 

    def __str__(self) -> str:
        return self.username


class Place(models.Model):
    name = models.CharField(max_length=50)
    tagline = models.CharField(max_length=50)
    description = models.TextField()  # Changed to TextField for longer descriptions
    image_url = models.URLField(max_length=200)  # Changed to URLField to store the image URL
    location = models.CharField(max_length=50)
    average_price = models.IntegerField()
    average_rating = models.IntegerField()

    def __str__(self) -> str:
        return self.place

