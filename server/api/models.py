from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    age = models.IntegerField(null=True, blank=True)  # Optional field
    liked_places = models.ManyToManyField('Place', related_name='liked_by', blank=True)  # Many-to-many relationship for liked places
    visited_places = models.ManyToManyField('Place', related_name='visited_by', blank=True)  # Many-to-many relationship for visited places

    def __str__(self) -> str:
        return self.username


class Category(models.Model):
    category_name = models.CharField(max_length=50, unique=True)  # Unique category names

    def __str__(self) -> str:
        return self.name


class Place(models.Model):
    name = models.CharField(max_length=50)
    tagline = models.CharField(max_length=50)
    description = models.TextField()  # Long descriptions
    image_url = models.URLField(max_length=200)  # URL to the image
    location = models.CharField(max_length=100)  # Increased size for more detailed locations
    average_price = models.DecimalField(max_digits=10, decimal_places=2)  # For better price representation
    average_rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)  # Allow half ratings
    number_of_ratings = models.PositiveIntegerField(default=0)  # Number of ratings received
    trending_score = models.PositiveIntegerField(default=0)  # Score based on interaction
    category = models.ForeignKey(Category, related_name='places', on_delete=models.CASCADE)  # Link to Category model
    opening_hours = models.CharField(max_length=100, blank=True)  # Opening hours description
    website_url = models.URLField(max_length=200, blank=True)  # Official website URL
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when created
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp when updated

    def __str__(self) -> str:
        return self.name
