import React, { useState } from "react";
import CreateHelpAlertForm from "./CreateHelpAlertForm";
import HelpAlertList from "./HelpAlertList";
import HelpAlertChat from "./HelpAlertChat";

interface HelpAlert {
  id: number;
  name: string;
  description: string;
  photo?: File | null;
}

const HelpAlert: React.FC = () => {
  const [helpAlerts, setHelpAlerts] = useState<HelpAlert[]>([]);
  const [activeChat, setActiveChat] = useState<HelpAlert | null>(null);

  const addHelpAlert = (alertData: Omit<HelpAlert, 'id'>) => {
    const newAlert: HelpAlert = { ...alertData, id: Date.now() };
    setHelpAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Help Alerts</h1>
      <CreateHelpAlertForm addHelpAlert={addHelpAlert} />
      <HelpAlertList
        alerts={helpAlerts}
        onConnect={(alert) => setActiveChat(alert)}
      />
      {activeChat && (
        <HelpAlertChat
          alert={activeChat}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  );
};

export default HelpAlert;
