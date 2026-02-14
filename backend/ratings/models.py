from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from users.models import ReviewerProfile
User = settings.AUTH_USER_MODEL 
# Create your models here.
class ReviewerRating(models.Model):
    reviewer = models.ForeignKey(User,on_delete=models.CASCADE, related_name="ratings_received")
    profile_owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    rating = models.FloatField(validators=[MinValueValidator(1.0), MaxValueValidator(5.0)])    
    feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def save(self, *args, **kwargs):
        super().save(*args,**kwargs)
        reviewer_profile=ReviewerProfile.objects.get(user=self.reviewer)
        all_ratings=ReviewerRating.objects.filter(reviewer=self.reviewer)
        rating_count=all_ratings.count()
        if rating_count>0:
            total_sum=sum(r.rating for r in all_ratings)
            reviewer_profile.average_rating=round(total_sum/rating_count,1)
            reviewer_profile.save()