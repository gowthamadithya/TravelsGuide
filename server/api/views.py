from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Place, Category
from .serializers import UserSerializer, PlaceSerializer, CategorySerializer

# Signup View
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    if check_password(password, user.password):
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return Response({
            "refresh": str(refresh),
            "access": access_token,
            "username": user.username
        }, status=status.HTTP_200_OK)

    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

#logout
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    # Invalidate the token on the client side by not using it anymore
    return Response({"message": "Logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)


#user views
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])  # Require JWT authentication
def user_list_create(request):
    if request.method == 'GET':
        users = User.objects.prefetch_related('visited_places', 'liked_places').all()  # Prefetch related places
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])  # Require JWT authentication
def user_detail(request, username):
    try:
        user = User.objects.prefetch_related('visited_places', 'liked_places').get(username=username)  # Prefetch related places
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Get full place details for visited and liked places
        visited_places = user.visited_places.all()  # This fetches full Place objects
        liked_places = user.liked_places.all()      # This fetches full Place objects

        user_data = UserSerializer(user).data
        user_data['visited_places'] = PlaceSerializer(visited_places, many=True).data
        user_data['liked_places'] = PlaceSerializer(liked_places, many=True).data
        return Response(user_data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Handle visited places if provided
            visited_places = request.data.get('visited_places', None)
            if visited_places is not None:
                user.visited_places.add(*visited_places)

            # Handle liked places if provided
            liked_places = request.data.get('liked_places', None)
            if liked_places is not None:
                user.liked_places.add(*liked_places)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Place Views
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])   # Require JWT authentication
def place_list_create(request):
    if request.method == 'GET':
        places = Place.objects.all()
        serializer = PlaceSerializer(places, many=True)
        return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = PlaceSerializer(data=request.data, many=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'POST':
        places_data = request.data  # Expecting a list of place dictionaries
        if not isinstance(places_data, list):
            return Response({"error": "Expecting list of dict's."}, status=status.HTTP_400_BAD_REQUEST)
        created_places = []  # To store successfully created places
        for place_data in places_data:
            category_name = place_data.get('category', None)
            # Check if category exists or create a new one
            if category_name:
                category, created = Category.objects.get_or_create(category_name=category_name)
            # Prepare data for Place serializer
            place_data['category'] = category.id  # Assign the category ID to the place data
            serializer = PlaceSerializer(data=place_data)  # No many=True here
            if serializer.is_valid():
                serializer.save()
                created_places.append(serializer.data)  # Store the created place data
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(created_places, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])  # Require JWT authentication
def place_detail(request, pk):
    try:
        place = Place.objects.get(pk=pk)
    except Place.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PlaceSerializer(place)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PlaceSerializer(place, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        place.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])  # Require JWT authentication
def place_ratings(request, pk):
    try:
        # Fetch the place by name
        place = Place.objects.get(pk=pk)
        # Retrieve all ratings for this place
        ratings = place.ratings.all()
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data)
    except Place.DoesNotExist:
        return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)


# Category Views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # Require JWT authentication
def category_list_create(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])  # Require JWT authentication
def category_detail(request, categoryname):
    try:
        category = Category.objects.get(name=categoryname)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)