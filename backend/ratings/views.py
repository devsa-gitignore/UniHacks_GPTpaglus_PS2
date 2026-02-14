from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ReviewerRating
from .serializers import ReviewerRatingSerializer
# Create your views here.
class SubmitRatingView(APIView):
    def post(self,request):
        serializer=ReviewerRatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(profile_owner=request.user)
            return Response(
                {"status":"success","message":"Rating submitted and profile updated"},status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)