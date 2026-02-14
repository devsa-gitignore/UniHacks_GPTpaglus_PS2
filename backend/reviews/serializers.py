from rest_framework import serializers
from .models import Review, SectionReview
class SectionReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionReview
        fields = "__all__"
class ReviewSerializer(serializers.ModelSerializer):
    sections = SectionReviewSerializer(many=True, read_only=True)
    reviewer_username = serializers.CharField(source="reviewer.username", read_only=True)
    version_number = serializers.IntegerField(source="profile_version.version_number", read_only=True)

    class Meta:
        model = Review
        fields = "__all__"
