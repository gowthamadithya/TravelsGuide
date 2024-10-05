from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Rating
from api.models import User
from .serializers import RatingSerializer
from .model_utils import RecommendationSystem

# Create a global instance for the recommendation system
recommendation_system = RecommendationSystem()

class RatingListCreate(APIView):
    def get(self, request):
        # Retrieve all ratings from the database
        ratings = Rating.objects.all()
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Check if there are enough entries for predictions
            if Rating.objects.count() < 2:  # Adjust as necessary
                return Response({'error': 'Not enough entries for predictions yet'}, status=status.HTTP_404_NOT_FOUND)
            recommendation_system.train_model()  # New data added, so retrain the model
            return Response({"message": "Rating added successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

        recommendations = recommendation_system.recommend(user_id)
        recommendations_list = recommendations.to_dict(orient='records')

        return Response(recommendations_list, status=status.HTTP_200_OK)
