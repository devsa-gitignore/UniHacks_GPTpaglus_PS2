from django.urls import path
from .views import ProfileVersionView

urlpatterns = [
    path("versions/", ProfileVersionView.as_view()),
]
