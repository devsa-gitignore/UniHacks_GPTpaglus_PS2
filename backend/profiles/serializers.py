from rest_framework import serializers
from .models import ProfileVersion, ProfilePhoto, Prompt

class ProfilePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePhoto
        fields = "__all__"

class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = "__all__"

class ProfileVersionSerializer(serializers.ModelSerializer):
    photos = ProfilePhotoSerializer(many=True,read_only=True)
    prompts = PromptSerializer(many=True,read_only=True)
    class Meta:
        model = ProfileVersion
        fields = "__all__"