import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
const HelpAlertChat = ({ alert, onClose }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const sendMessage = () => {
        if (message.trim()) {
            setChatMessages((prevMessages) => [...prevMessages, message]);
            setMessage("");
        }
    };
    return (_jsxs("div", { className: "fixed bottom-4 right-4 w-72 bg-white border rounded-lg shadow-lg p-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsxs("h2", { className: "text-lg font-semibold", children: [alert.name, " - Chat"] }), _jsx("button", { onClick: onClose, className: "text-red-500 font-bold", children: "X" })] }), _jsx("div", { className: "h-48 overflow-y-auto p-2 border rounded mb-2 bg-gray-50", children: chatMessages.map((msg, index) => (_jsx("div", { className: "p-2 mb-2 bg-blue-100 rounded", children: msg }, index))) }), _jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Type a message...", className: "w-full p-2 border rounded mb-2" }), _jsx("button", { onClick: sendMessage, className: "w-full bg-blue-500 text-white p-2 rounded", children: "Send" })] }));
};
export default HelpAlertChat;
