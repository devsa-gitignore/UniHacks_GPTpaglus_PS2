from django.urls import path
from .views import CreateReviewRequestView

urlpatterns = [
    path("", CreateReviewRequestView.as_view(), name="create-review-request"),
]
