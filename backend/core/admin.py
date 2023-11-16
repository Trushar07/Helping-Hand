from django.contrib import admin
from .models import Post, Follow


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    fields = ["user", "content"]
    readonly_fields = ["posted_at"]
    list_display = ["user", "content", "posted_at", "repost_of"]
    search_fields = [
        "user__first_name__isstartwith",
        "user__last_name__isstartwith",
        "user__username",
    ]


admin.site.register(Follow)
