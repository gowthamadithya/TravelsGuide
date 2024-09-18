from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Rating
from .serializers import RatingSerializer
from .model_utils import RecommendationSystem
import json

# Create a global instance for example; in a real app, use dependency injection frameworks or containers
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
            recommendation_system.train_model() # new data added so need to retrain the model on new data
            return Response({"message": "Rating added successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecommendUser(APIView):
    def get(self, request):
        user_id = request.GET.get('username')
        recommendations = recommendation_system.recommend(user_id)
        
        if recommendations is None:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        recommendations_list = recommendations.to_dict(orient='records')
        return Response(recommendations_list)


