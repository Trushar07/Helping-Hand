from rest_framework import serializers
from .models import Follow, Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

    # read_only_fields = ["posted_at", "likes", "repost", "repost_of", "reply_to"]


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["user", "content"]


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = "__all__"


class RepostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["user", "content", "repost_of"]


class ReplyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["user", "content", "reply_to"]
