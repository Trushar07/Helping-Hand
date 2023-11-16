from .views import HomeView, LogoutView
from django.urls import path

urlpatterns = [
    path("home", HomeView.as_view(), name="home"),
    path("logout", LogoutView.as_view(), name="logout"),
]
