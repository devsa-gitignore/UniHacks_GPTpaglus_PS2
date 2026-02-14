from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import *
from .serializers import ProfileVersionSerializer
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
