import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import JoinRoom from "./components/JoinRoom";
import ChatRoom from "./components/ChatRoom";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleJoin = (user: string, roomName: string) => {
    setUsername(user);
    setRoom(roomName);
    navigate(`/chat/${roomName}`);
  };

  const handleLeave = () => {
    setUsername("");
    setRoom("");
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<JoinRoom onJoin={handleJoin} />} />
      <Route
        path="/chat/:room"
        element={
          <ChatRoom
            username={username}
            room={room}
            onLeave={handleLeave}
          />
        }
      />
    </Routes>
  );
};

export default App;
