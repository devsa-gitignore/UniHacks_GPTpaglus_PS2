from rest_framework import serializers
from .models import ReviewerRating
class ReviewerRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewerRating
        fields = ['id', 'reviewer', 'profile_owner', 'rating', 'feedback', 'created_at']
        read_only_fields = ['profile_owner', 'created_at']