import React from "react";

interface HelpAlert {
  id: number;
  name: string;
  description: string;
  photo?: File | null;
}

interface HelpAlertListProps {
  alerts: HelpAlert[];
  onConnect: (alert: HelpAlert) => void;
}

const HelpAlertList: React.FC<HelpAlertListProps> = ({ alerts, onConnect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="p-4 border rounded-lg shadow-md bg-white">
          {alert.photo && (
            <img
              src={URL.createObjectURL(alert.photo)}
              alt="Help Alert"
              className="w-full h-32 object-cover rounded mb-4"
            />
          )}
          <h2 className="text-lg font-semibold">{alert.name}</h2>
          <p className="text-gray-600">{alert.description}</p>
          <button
            onClick={() => onConnect(alert)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Connect
          </button>
        </div>
      ))}
    </div>
  );
};

export default HelpAlertList;
