import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const HelpAlertList = ({ alerts, onConnect }) => {
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4", children: alerts.map((alert) => (_jsxs("div", { className: "p-4 border rounded-lg shadow-md bg-white", children: [alert.photo && (_jsx("img", { src: URL.createObjectURL(alert.photo), alt: "Help Alert", className: "w-full h-32 object-cover rounded mb-4" })), _jsx("h2", { className: "text-lg font-semibold", children: alert.name }), _jsx("p", { className: "text-gray-600", children: alert.description }), _jsx("button", { onClick: () => onConnect(alert), className: "mt-4 bg-green-500 text-white px-4 py-2 rounded", children: "Connect" })] }, alert.id))) }));
};
export default HelpAlertList;
