from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ImprovementRecord
from .serializers import ImprovementRecordSerializer
# Create your views here.
class ImprovementTrackerView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        records=ImprovementRecord.objects.filter(profile__owner=request.user).order_by('created_at')
        serializer=ImprovementRecordSerializer(records,many=True)
        return Response(serializer.data)
    