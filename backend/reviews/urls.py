from django.urls import path
from .views import SubmitReviewView, LatestReviewView

urlpatterns = [
    path("submit/", SubmitReviewView.as_view(), name="submit-review"),
    path("latest/", LatestReviewView.as_view(), name="latest-review"),
]
