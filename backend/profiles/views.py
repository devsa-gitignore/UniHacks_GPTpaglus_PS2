from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import *
from .serializers import ProfileVersionSerializer
from reviews.models import Review
# Create your views here.
class ProfileVersionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        profile, created = Profile.objects.get_or_create(user=request.user)
        last_version = ProfileVersion.objects.filter(profile=profile).order_by('-version_number').first()
        next_v_num = last_version.version_number + 1 if last_version else 1
        new_version = ProfileVersion.objects.create(
            profile=profile,
            version_number=next_v_num,
            bio=request.data.get('bio', ''),
            dating_intent=request.data.get('dating_intent', 'go_with_the_flow'),
            notes=request.data.get('notes', '')
        )
        prompts_data = request.data.get('prompts', [])
        for prompt in prompts_data:
            Prompt.objects.create(
                profile_version=new_version,
                question=prompt.get('question'),
                answer=prompt.get('answer'),
                is_custom=prompt.get('is_custom', False)
            )
        serializer = ProfileVersionSerializer(new_version)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def get(self, request):
        profile, created = Profile.objects.get_or_create(user=request.user)
        versions = ProfileVersion.objects.filter(profile=profile).order_by('-version_number')
        serializer = ProfileVersionSerializer(versions, many=True)
        return Response(serializer.data)


class ProfileCompareView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = Profile.objects.get_or_create(user=request.user)
        versions = list(
            ProfileVersion.objects.filter(profile=profile).order_by("version_number")
        )
        reviews = (
            Review.objects.filter(profile_version__profile=profile)
            .select_related("profile_version")
            .prefetch_related("sections")
            .order_by("-created_at")
        )

        latest_review_by_version = {}
        for review in reviews:
            version_id = review.profile_version_id
            if version_id not in latest_review_by_version:
                latest_review_by_version[version_id] = review

        payload = []
        for version in versions:
            review = latest_review_by_version.get(version.id)
            section_scores = {
                "photos": None,
                "bio": None,
                "prompts": None,
            }
            if review:
                for section in review.sections.all():
                    if section.section in section_scores:
                        section_scores[section.section] = round(float(section.score) * 20, 1)

            payload.append(
                {
                    "id": version.id,
                    "version_number": version.version_number,
                    "created_at": version.created_at,
                    "bio": version.bio,
                    "overall_score": round(float(review.overall_score) * 20, 1)
                    if review and review.overall_score is not None
                    else None,
                    "section_scores": section_scores,
                }
            )

        return Response(payload, status=status.HTTP_200_OK)
