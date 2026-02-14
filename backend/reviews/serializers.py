from rest_framework import serializers
from .models import Review, SectionReview
class SectionReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionReview
        fields = "__all__"
class ReviewSerializer(serializers.ModelSerializer):
    sections = SectionReviewSerializer(many=True)
    class Meta:
        model = Review
        fields = "__all__"
