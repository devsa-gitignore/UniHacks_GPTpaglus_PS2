from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review, SectionReview
from review_requests.models import ReviewRequest
# Create your views here.
class SubmitReviewView(APIView):
    def post(self, request):
        review_request_id = request.data.get("review_request")
        review_request = get_object_or_404(ReviewRequest, id=review_request_id)
        sections = request.data.get("sections", [])
        if not sections:
            return Response({"error": "Sections cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
        calculated_score = sum(float(sec["score"]) for sec in sections) / len(sections)       
        review = Review.objects.create(
            review_request=review_request,
            reviewer=request.user,
            profile_version=review_request.profile_version,
            quick_impression=request.data.get("quick_impression"),
            overall_score=round(calculated_score, 1),
            additional_notes=request.data.get("additional_notes", ""),
        )
        for section in sections:
            SectionReview.objects.create(
                review=review,
                section=section.get("section"),
                score=section.get("score"),
                liked=section.get("liked", ""),
                disliked=section.get("disliked", ""),
                suggestions=section.get("suggestions", "")
            )
        review_request.status = "completed"
        review_request.save()
        return Response({"status": "review_submitted","calculated_score": round(calculated_score, 1)
        }, status=status.HTTP_201_CREATED)