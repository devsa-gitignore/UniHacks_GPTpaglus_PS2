from rest_framework import serializers
from .models import ReviewRequest
class ReviewRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=ReviewRequest
        fields="__all__"