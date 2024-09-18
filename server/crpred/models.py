from django.db import models

class Rating(models.Model):
    username = models.CharField(max_length=20)
    place = models.CharField(max_length=50)
    rating = models.IntegerField()
