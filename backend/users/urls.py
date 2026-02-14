# from django.urls import path
# from users.views import MyTokenObtainPairView,login_view


# urlpatterns = [
#     path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path("api/signup/",login_view),
# ]

from django.urls import path
from .views import MyTokenObtainPairView, SignupView, ReviewerListView
from rest_framework_simplejwt.views import TokenRefreshView

# FIX: Removed the "api/" prefix so it doesn't double up
urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('reviewers/', ReviewerListView.as_view(), name='reviewers-list'),
]
