from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from authentication.models import CustomUser


class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(CustomUser, related_name="liked_posts", blank=True)
    repost = models.ManyToManyField(
        CustomUser, related_name="reposted_posts", blank=True
    )
    repost_of = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="reposts"
    )
    reply_to = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )

    class Meta:
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")

    def __str__(self):
        return f"{self.user} - {self.content}"

    def get_absolute_url(self):
        return reverse("Post_detail", kwargs={"pk": self.pk})


class Follow(models.Model):
    follower = models.ForeignKey(
        CustomUser, related_name="following", on_delete=models.CASCADE
    )
    following = models.ForeignKey(
        CustomUser, related_name="followers", on_delete=models.CASCADE
    )
    followed_at = models.DateField(
        verbose_name="date when started following", auto_now_add=True
    )

    class Meta:
        unique_together = ("follower", "following")

    def __str__(self) -> str:
        return f"{self.follower.username} follows {self.following.username}"
