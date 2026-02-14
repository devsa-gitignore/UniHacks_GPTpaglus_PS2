from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ReviewRequest
from rest_framework import status
from django.shortcuts import get_object_or_404
from users.models import ReviewerProfile
from profiles.models import ProfileVersion
# Create your views here.
class CreateReviewRequestView(APIView):
    def post(self,request):
        version_id=request.data.get("profile_version")
        reviewer_id=request.data.get("reviewer")
        reviewer_profile = get_object_or_404(ReviewerProfile, user_id=reviewer_id)
        profile_version = get_object_or_404(ProfileVersion, id=version_id)
        price=reviewer_profile.get_price()
        review_request=ReviewRequest.objects.create(profile_version=profile_version,
            reviewer_id=reviewer_id,
            price_snapshot=price)
        return Response({"status":"request_sent"},status=status.HTTP_201_CREATED)