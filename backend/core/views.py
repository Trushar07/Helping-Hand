from rest_framework.views import APIView
from .models import Post, Follow
from .serializers import (
    FollowSerializer,
    PostSerializer,
    PostCreateSerializer,
    RepostCreateSerializer,
    ReplyCreateSerializer,
)
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return PostCreateSerializer
        return PostSerializer


class FollowViewset(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class RepostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        original_post = get_object_or_404(Post, pk=post_id)

        data = {
            "user": request.user.id,
            "content": request.data.get("content"),
            "repost_of": original_post.id,
        }

        serializer = RepostCreateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        original_post = get_object_or_404(Post, pk=post_id)

        data = {
            "user": request.user.id,
            "content": request.data.get("content"),
            "reply_to": original_post.id,
        }

        serializer = ReplyCreateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
