from rest_framework import serializers
from .models import Rating
from api.models import User, Place

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['user', 'place', 'rating']



# class RatingSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source='user.username', read_only=True)
#     placename = serializers.CharField(source='place.name', read_only=True)

#     class Meta:
#         model = Rating
#         fields = ['username', 'placename', 'rating']

