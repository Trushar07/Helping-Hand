from django.urls import path, include
from .views import FollowViewset, PostViewset, RepostView, ReplyView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"posts", PostViewset)
router.register(r"follow", FollowViewset)

urlpatterns = [
    path("", include(router.urls)),
    path("posts/<int:post_id>/repost", RepostView.as_view(), name="create_repost"),
    path("posts/<int:post_id>/reply", ReplyView.as_view(), name="create_reply"),
]
