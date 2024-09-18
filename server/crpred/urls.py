from django.urls import path
from .views import RatingListCreate, RecommendUser

urlpatterns = [
    path('ratings/', RatingListCreate.as_view(), name='rating-list-create'),
    path('recommend/', RecommendUser.as_view(), name='recommend-user'),
]
