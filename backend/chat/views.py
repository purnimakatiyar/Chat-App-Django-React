from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer
from .utils import success_response, error_response  # adjust path as needed

class RoomList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(success_response("Rooms fetched successfully", serializer.data), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(error_response("Error fetching rooms", str(e)), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(success_response("Room created successfully", serializer.data), status=status.HTTP_201_CREATED)
        return Response(error_response("Room creation failed", serializer.errors), status=status.HTTP_400_BAD_REQUEST)


class MessageList(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        room_name = self.kwargs['room_name'].lower()
        room, _ = Room.objects.get_or_create(name=room_name)
        return Message.objects.filter(room=room)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(success_response("Messages fetched successfully", serializer.data), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(error_response("Error fetching messages", str(e)), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request, *args, **kwargs):
        room_name = self.kwargs['room_name'].lower()
        room, _ = Room.objects.get_or_create(name=room_name)

        data = request.data.copy()
        data['room'] = room.id

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(success_response("Message created successfully", serializer.data), status=status.HTTP_201_CREATED)
        return Response(error_response("Message creation failed", serializer.errors), status=status.HTTP_400_BAD_REQUEST)
