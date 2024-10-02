# your_app/urls.py

from django.urls import path
from .views import user_list_create, user_detail, place_list_create, place_detail

urlpatterns = [
    path('users/', user_list_create, name='user-list-create'),
    path('users/<str:username>/', user_detail, name='user-detail'),
    path('places/', place_list_create, name='place-list-create'),
    path('places/<int:pk>/', place_detail, name='place-detail'),
]
