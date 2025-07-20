from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class ChatRoom(models.Model):
    me = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_rooms')
    other = models.ForeignKey(User, on_delete=models.CASCADE, related_name='other_rooms')
    chats = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
