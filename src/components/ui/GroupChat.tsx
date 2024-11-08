import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Message {
  username: string;
  text: string;
  type?: "join" | "leave" | "message";
}

export default function GroupChat() {
  const { group } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  // Ensure username is always a string
  const username = localStorage.getItem("username") || "Anonymous";

  useEffect(() => {
    if (!username) {
      navigate("/login");
      return;
    }

    socketRef.current = new WebSocket("wss://communion.onrender.com");

    socketRef.current.onopen = () => {
      socketRef.current?.send(
        JSON.stringify({ type: "join-group", group, username })
      );
    };

    socketRef.current.onmessage = (event) => {
      const messageData: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [group, username, navigate]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData: Message = { type: "message", username, text: newMessage };
      socketRef.current?.send(JSON.stringify(messageData));
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {username ? (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Group Chat: {group}</h1>

          <div className="h-96 overflow-y-auto p-4 border rounded-lg mb-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col mb-4 ${message.username === username ? "items-end" : "items-start"}`}
              >
                <div className={`px-4 py-2 rounded-lg text-white ${message.username === username ? "bg-blue-500" : "bg-green-500"}`}>
                  {message.text}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {message.username}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Please log in to chat</h2>
        </div>
      )}
    </div>
  );
}
