# from django.urls import path
# from users.views import MyTokenObtainPairView,login_view


# urlpatterns = [
#     path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path("api/signup/",login_view),
# ]

from django.urls import path
from .views import MyTokenObtainPairView, SignupView, ReviewerListView

# FIX: Removed the "api/" prefix so it doesn't double up
urlpatterns = [
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/reviewers/', ReviewerListView.as_view(), name='reviewers-list'),
]