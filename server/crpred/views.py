from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Rating
from api.models import User, Place
from api.serializers import PlaceSerializer
from .serializers import RatingSerializer
from .model_utils import RecommendationSystem

# Create a global instance for the recommendation system
recommendation_system = RecommendationSystem()

class RatingListCreate(APIView):
    def get(self, request):
        ratings = Rating.objects.all()
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            # Save the rating first
            rating = serializer.save()

            # Update the place's average rating
            place = rating.place
            ratings = place.ratings_by_place.all()
            total_rating = sum(rating.rating for rating in ratings)
            count = ratings.count()
            place.average_rating = total_rating / count if count > 0 else 0
            place.number_of_ratings = count
            place.save()

            # Optionally check for predictions
            if Rating.objects.count() < 2:
                return Response({'error': 'Not enough entries for predictions yet'}, status=status.HTTP_404_NOT_FOUND)

            recommendation_system.train_model()  # Retrain the model if needed
            return Response({"message": "Rating added successfully."}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class RecommendUser(APIView):
#     def get(self, request):
#         user_id = request.GET.get('user_id')

#         if user_id is None:
#             return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

#         # Check if the user exists
#         try:
#             user = User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             return Response({'error': 'User ID not found'}, status=status.HTTP_404_NOT_FOUND)

#         # Check if there are enough entries for predictions
#         if Rating.objects.count() < 2:  # Adjust as necessary
#             return Response({'error': 'Not enough entries for predictions yet'}, status=status.HTTP_404_NOT_FOUND)

#         recommendations = recommendation_system.recommend(user_id)
#         recommendations_list = recommendations.to_dict(orient='records')

#         return Response(recommendations_list, status=status.HTTP_200_OK)

class RecommendUser(APIView):
    def get(self, request):
        user_id = request.GET.get('user_id')

        if user_id is None:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user exists
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User ID not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if there are enough entries for predictions
        if Rating.objects.count() < 2:  # Adjust as necessary
            return Response({'error': 'Not enough entries for predictions yet'}, status=status.HTTP_404_NOT_FOUND)

        # Get recommendations
        recommendations = recommendation_system.recommend(user_id)
        recommendations_list = recommendations.to_dict(orient='records')

        # Sort recommendations by predicted rating in descending order
        sorted_recommendations = sorted(recommendations_list, key=lambda x: x['predicted_rating'], reverse=True)

        # Fetch full Place objects based on recommended IDs
        place_ids = [rec['place'] for rec in sorted_recommendations]
        places = Place.objects.filter(id__in=place_ids)

        # Create a response list with serialized Place objects
        result = [
            PlaceSerializer(place).data
            for rec in sorted_recommendations
            for place in places if place.id == rec['place']
        ]

        return Response(result, status=status.HTTP_200_OK)
