import React, { useState } from "react";

interface JoinRoomProps {
  onJoin: (username: string, room: string) => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ onJoin }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !room.trim()) {
      setError("Please enter both a username and a room.");
      return;
    }
    if (username.length > 20) {
      setError("Username must be 20 characters or less.");
      return;
    }
    if (room.length > 20) {
      setError("Room name must be 20 characters or less.");
      return;
    }
    setError(null);
    onJoin(username.trim(), room.trim());
    setUsername("");
    setRoom("");
  };

  return (
    <div className="max-w-md mx-auto min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl rounded-2xl p-8 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Join a Chat Room
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              maxLength={20}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              maxLength={20}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
