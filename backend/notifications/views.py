from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Notification
from .serializers import NotificationSerializer
# Create your views here.
class NOtificationListView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        notifications=request.user.notifications.all().order_by('-created_at')
        serializer=NotificationSerializer(notifications,many=True)
        return Response(serializer.data)
class MarkNotificationReadView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,pk):
        try:
            notification=request.user.notifications.get(pk=pk)
            notification.is_read()=True
            notification.save()
            return Response({"status": "marked as read"}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found"}, status=status.HTTP_404_NOT_FOUND)