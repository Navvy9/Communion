import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import CreateHelpAlertForm from "./CreateHelpAlertForm";
import HelpAlertList from "./HelpAlertList";
import HelpAlertChat from "./HelpAlertChat";
const HelpAlert = () => {
    const [helpAlerts, setHelpAlerts] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const addHelpAlert = (alertData) => {
        const newAlert = { ...alertData, id: Date.now() };
        setHelpAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    };
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Help Alerts" }), _jsx(CreateHelpAlertForm, { addHelpAlert: addHelpAlert }), _jsx(HelpAlertList, { alerts: helpAlerts, onConnect: (alert) => setActiveChat(alert) }), activeChat && (_jsx(HelpAlertChat, { alert: activeChat, onClose: () => setActiveChat(null) }))] }));
};
export default HelpAlert;
