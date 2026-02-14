from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.validators import MinValueValidator
# Create your models here.

class User(AbstractUser):
    phone = models.CharField(max_length=12,null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    validators=[
            MinValueValidator(18, message="You must be at least 18 years old to register.")
        ]
    gender = models.CharField(
        max_length = 10,
        null=True, blank=True,
        choices= [
            ("male", "Male"),
            ("female","Female"),
            ("other","Other"),
        ])
    ROLE_CHOICES = [
    ("reviewee", "Reviewee"),
    ("reviewer", "Reviewer"),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES,null=True, blank=True)
    def __str__(self):
        return self.username

class ReviewerProfile(models.Model):
    user=models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    public_username = models.CharField(
        max_length=50,
        unique=True,
        default="anonymous",
    )
    total_reviews=models.IntegerField(default=0)
    average_rating = models.FloatField(default=0)
    credibility_score=models.FloatField(default=0)
    earnings=models.FloatField(default=0)
    is_available = models.BooleanField(default=True)
    acceptance_rate = models.FloatField(default=100.0) 
    completion_rate = models.FloatField(default=100.0)
    created_at = models.DateTimeField(auto_now_add=True)
    def get_price(self):
        score = self.credibility_score
        if score <= 20:
            return 29
        elif score <= 40:
            return 59
        elif score <= 60:
            return 99
        elif score <= 80:
            return 129
        else:
            return 159
    def __str__(self):
        return self.public_username