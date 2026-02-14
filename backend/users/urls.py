from django.urls import path
from users.views import MyTokenObtainPairView,login_view


urlpatterns = [
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("api/signup/",login_view),
]