from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("api-auth/", include("rest_framework.urls")),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh", jwt_views.TokenRefreshView.as_view(), name="token-refresh"),
    path("", include("authentication.urls")),
    path("__debug__/", include("debug_toolbar.urls")),
    path("", include("core.urls")),
]
