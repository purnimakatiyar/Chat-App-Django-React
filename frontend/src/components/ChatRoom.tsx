import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

interface ChatRoomProps {
  username: string;
  room: string;
  onLeave: () => void;
}

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ username, room, onLeave }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${room}/`);

    ws.current.onopen = () => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          user: "System",
          text: "Connected to chat room!",
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          user: data.user,
          text: data.message,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    ws.current.onclose = () => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          user: "System",
          text: "Disconnected from chat room.",
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    ws.current.onerror = () => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          user: "System",
          text: "Error connecting to chat server.",
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    return () => {
      ws.current?.close();
    };
  }, [room]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !ws.current || ws.current.readyState !== WebSocket.OPEN) {
      return;
    }

    ws.current.send(
      JSON.stringify({
        user: username,
        message: input.trim(),
      })
    );
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-4rem)] flex flex-col p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Room: <span className="text-indigo-600">{room}</span>
        </h2>
        <button
          onClick={onLeave}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Leave Room
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-xl shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 p-3 rounded-lg transition-all duration-200 ${
              msg.user === "System"
                ? "bg-yellow-50 text-yellow-800"
                : msg.user === username
                ? "bg-indigo-50 text-indigo-800 ml-8"
                : "bg-gray-100 text-gray-800 mr-8"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">{msg.user}</span>
              <span className="text-xs text-gray-500">
                {format(new Date(msg.timestamp), "HH:mm")}
              </span>
            </div>
            <p className="mt-1">{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={sendMessage}
        className="mt-4 flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
