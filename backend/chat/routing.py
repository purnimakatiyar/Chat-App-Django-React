from django.urls import path
from chat.consumers import ChatConsumer

websocket_urlpatterns = [
    # path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
    path('ws/wsc/', ChatConsumer.as_asgi()),
]