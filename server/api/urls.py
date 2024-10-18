from django.urls import path
from .views import user_list_create, user_detail, place_list_create, place_detail
from .views import signup, login, logout, category_list_create, category_detail
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('users/', user_list_create, name='user-list-create'),
    path('users/<str:username>/', user_detail, name='user-detail'),
    path('places/', place_list_create, name='place-list-create'),
    path('places/<int:pk>/', place_detail, name='place-detail'),
    path('categories/', category_list_create, name='category-list-create'),
    path('categories/<str:categoryname>/', category_detail, name='category-detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
]
