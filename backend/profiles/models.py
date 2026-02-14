from django.db import models
from django.conf import settings
# Create your models here.
User = settings.AUTH_USER_MODEL

class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete = models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user.username

class ProfileVersion(models.Model):
    profile = models.ForeignKey(Profile,
        on_delete=models.CASCADE, related_name = "versions")
    bio = models.TextField()
    dating_intent_choices = (
        ("go_with_the_flow","Go with the flow"),
        ("casual","Casual"),
        ("serious","Serious"),
    )
    dating_intent = models.CharField(max_length=20, choices=dating_intent_choices)
    notes = models.TextField(blank=True)
    version_number = models.IntegerField(default=1)
    average_score = models.FloatField(default=0)
    positive_impressions = models.IntegerField(default=0)
    negative_impressions = models.IntegerField(default=0)
    improvement_percentage = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.profile.user.username} V{self.version_number}"

class ProfilePhoto(models.Model):
    profile_version = models.ForeignKey(
        ProfileVersion, on_delete=models.CASCADE,
        related_name="photos"
    )
    image = models.ImageField(upload_to="profile_photos/")
    order = models.IntegerField(default=0)

class Prompt(models.Model):
    profile_version = models.ForeignKey(
        ProfileVersion,
        on_delete=models.CASCADE,
        related_name="prompts"
    )
    question = models.CharField(max_length=255)
    answer = models.TextField()
    is_custom = models.BooleanField(default=False)