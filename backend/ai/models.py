from django.db import models

# Create your models here.
class ReviewFeedback(models.Model):
    # Links directly to the completed ReviewRequest
    request = models.OneToOneField(
        "review_requests.ReviewRequest",
        on_delete=models.CASCADE,
        related_name="feedback",
    )
    
    # Feature 7: The text fields the AI will read!
    likes = models.TextField(blank=True, null=True)
    dislikes = models.TextField(blank=True, null=True)
    suggestions = models.TextField(blank=True, null=True)
    additional_notes = models.TextField(blank=True, null=True)
    
    # Feature 7: The scores (0.5 to 5.0)
    overall_score = models.FloatField(default=0.0) 
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.request}"
