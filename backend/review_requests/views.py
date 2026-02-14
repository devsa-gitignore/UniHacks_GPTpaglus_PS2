from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ReviewRequest
from rest_framework import status
from django.shortcuts import get_object_or_404
from users.models import ReviewerProfile
from profiles.models import ProfileVersion
# Create your views here.
class CreateReviewRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        version_id=request.data.get("profile_version")
        reviewer_ids = request.data.get("reviewers")
        single_reviewer_id = request.data.get("reviewer")

        if reviewer_ids is None:
            reviewer_ids = [single_reviewer_id] if single_reviewer_id else []

        reviewer_ids = [rid for rid in reviewer_ids if rid]
        if not version_id or not reviewer_ids:
            return Response(
                {"error": "profile_version and at least one reviewer are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        profile_version = get_object_or_404(
            ProfileVersion, id=version_id, profile__user=request.user
        )

        created_requests = []
        total_price = 0

        for reviewer_id in reviewer_ids:
            reviewer_profile = get_object_or_404(ReviewerProfile, user_id=reviewer_id)
            price = reviewer_profile.get_price()
            total_price += price
            review_request = ReviewRequest.objects.create(
                profile_version=profile_version,
                reviewer_id=reviewer_id,
                price_snapshot=price,
            )
            created_requests.append(review_request.id)

        return Response(
            {
                "status": "request_sent",
                "created_count": len(created_requests),
                "review_request_ids": created_requests,
                "total_price": total_price,
            },
            status=status.HTTP_201_CREATED,
        )
