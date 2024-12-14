import React, { useState } from "react";

interface HelpAlert {
  id: number;
  name: string;
  description: string;
}

interface HelpAlertChatProps {
  alert: HelpAlert;
  onClose: () => void;
}

const HelpAlertChat: React.FC<HelpAlertChatProps> = ({ alert, onClose }) => {
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      setChatMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-72 bg-white border rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{alert.name} - Chat</h2>
        <button onClick={onClose} className="text-red-500 font-bold">X</button>
      </div>
      <div className="h-48 overflow-y-auto p-2 border rounded mb-2 bg-gray-50">
        {chatMessages.map((msg, index) => (
          <div key={index} className="p-2 mb-2 bg-blue-100 rounded">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={sendMessage}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default HelpAlertChat;
