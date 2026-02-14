from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.
User=settings.AUTH_USER_MODEL
class Review(models.Model):
    review_request=models.OneToOneField(
        "review_requests.ReviewRequest",
        on_delete=models.CASCADE
    )
    reviewer=models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    profile_version = models.ForeignKey(
        "profiles.ProfileVersion",
        on_delete=models.CASCADE
    )
    quick_impression = models.BooleanField(blank=True, null=True)
    overall_score=models.FloatField(blank=True, null=True)
    additional_notes=models.TextField(blank=True)
    created_at=models.DateTimeField(auto_now_add=True)

class SectionReview(models.Model):
    SECTION_CHOICES = [
        ('photos', 'Photos'),
        ('bio', 'Bio'),
        ('prompts', 'Prompts')
    ]
    review=models.ForeignKey(
        Review,
        on_delete=models.CASCADE,
        related_name="sections"
    )
    section=models.CharField(max_length=20,choices=SECTION_CHOICES)
    score=models.FloatField(validators=[MinValueValidator(0.5), MaxValueValidator(5.0)])
    liked=models.TextField()
    disliked=models.TextField()
    suggestions=models.TextField()