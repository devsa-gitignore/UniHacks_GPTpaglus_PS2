from django.urls import path
from .views import ProfileVersionView, ProfileCompareView

urlpatterns = [
    path("versions/", ProfileVersionView.as_view()),
    path("compare/", ProfileCompareView.as_view()),
]
