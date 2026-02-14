from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ReviewerProfile, User
from .serializers import ReviewerProfileSerializer, SignupSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Create your views here.
class ReviewerListView(APIView):
    def get(self,request):
        reviewers=ReviewerProfile.objects.filter(
            is_available=True
        )
        gender = request.query_params.get('gender')
        min_age = request.query_params.get('min_age')
        max_age = request.query_params.get('max_age')
        min_score = request.query_params.get('min_score')
        max_score = request.query_params.get('max_score')
        if gender:
            reviewers = reviewers.filter(user__gender__iexact=gender)
        if min_age:
            reviewers = reviewers.filter(user__age__gte=min_age)
        if max_age:
            reviewers = reviewers.filter(user__age__lte=max_age)
        if min_score:
            reviewers = reviewers.filter(credibility_score__gte=min_score)
        if max_score:
            reviewers = reviewers.filter(credibility_score__lte=max_score)
        reviewers = reviewers.order_by('-credibility_score')
        serializer = ReviewerProfileSerializer(reviewers, many=True)
        return Response(serializer.data)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        attrs = attrs.copy()
        username = attrs.get("username")

        if username and "@" in username:
            try:
                user = User.objects.get(email__iexact=username)
                attrs["username"] = user.username
            except User.DoesNotExist:
                pass

        data = super().validate(attrs)
        
        data['role'] = self.user.role 
        data['username'] = self.user.username
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
