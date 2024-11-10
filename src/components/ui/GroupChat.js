import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
export default function GroupChat() {
    const { group } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socketRef = useRef(null);
    // Ensure username is always a string
    const username = localStorage.getItem("username") || "Anonymous";
    useEffect(() => {
        if (!username) {
            navigate("/login");
            return;
        }
        socketRef.current = new WebSocket("wss://communion.onrender.com");
        socketRef.current.onopen = () => {
            socketRef.current?.send(JSON.stringify({ type: "join-group", group, username }));
        };
        socketRef.current.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, messageData]);
        };
        return () => {
            socketRef.current?.close();
        };
    }, [group, username, navigate]);
    const sendMessage = () => {
        if (newMessage.trim()) {
            const messageData = { type: "message", username, text: newMessage };
            socketRef.current?.send(JSON.stringify(messageData));
            setNewMessage("");
        }
    };
    return (_jsx("div", { className: "flex flex-col items-center justify-center min-h-screen p-6", children: username ? (_jsxs("div", { className: "w-full max-w-md bg-white shadow-lg rounded-lg p-4", children: [_jsxs("h1", { className: "text-xl font-bold text-gray-800 mb-4", children: ["Group Chat: ", group] }), _jsx("div", { className: "h-96 overflow-y-auto p-4 border rounded-lg mb-4 bg-gray-50", children: messages.map((message, index) => (_jsxs("div", { className: `flex flex-col mb-4 ${message.username === username ? "items-end" : "items-start"}`, children: [_jsx("div", { className: `px-4 py-2 rounded-lg text-white ${message.username === username ? "bg-blue-500" : "bg-green-500"}`, children: message.text }), _jsx("span", { className: "text-xs text-gray-500 mt-1", children: message.username })] }, index))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { className: "flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400", value: newMessage, onChange: (e) => setNewMessage(e.target.value), placeholder: "Type your message..." }), _jsx("button", { onClick: sendMessage, className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition", children: "Send" })] })] })) : (_jsx("div", { children: _jsx("h2", { className: "text-2xl font-semibold text-gray-800", children: "Please log in to chat" }) })) }));
}
