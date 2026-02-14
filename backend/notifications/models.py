from django.db import models
from django.conf import settings
# Create your models here.
User=settings.AUTH_USER_MODEL
class Notification(models.Model):
    user=models.ForeignKey(
        User,
        on_delete=models.CASCADE, related_name="notifications"
    )
    title = models.CharField(max_length=207, default="Default Title")
    message=models.TextField(default="")
    type = models.CharField(
        max_length=50,
        choices=[
            ("request_received", "Request Received"),
            ("request_accepted", "Request Accepted"),
            ("request_declined", "Request Declined"),
            ("review_completed", "Review Completed"),
        ],
        default="request_received"
    )
    is_read=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)