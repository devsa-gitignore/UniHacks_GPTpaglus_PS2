from django.db import models
from django.conf import settings
# Create your models here.
User=settings.AUTH_USER_MODEL
class ReviewRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("declined", "Declined"),
        ("completed", "Completed"),
    ]
    profile_version=models.ForeignKey(
        "profiles.ProfileVersion",
        on_delete=models.CASCADE
    )
    reviewer=models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    status=models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )
    price_snapshot = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    responded_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return f"{self.profile_version} → {self.reviewer.username}"