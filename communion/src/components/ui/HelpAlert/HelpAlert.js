import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
const HelpAlert = () => {
    const [formData, setFormData] = useState({
        name: '',
        helpNeeded: '',
        email: '',
        phoneNumber: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [helpAlerts, setHelpAlerts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loggedInUserId = localStorage.getItem('userId');
    const username = localStorage.getItem("username") || "";
    useEffect(() => {
        const fetchHelpAlerts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/helpalerts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setHelpAlerts(response.data);
            }
            catch (err) {
                console.error('Error fetching help alerts:', err);
                setError('Failed to fetch help alerts. Please try again later.');
                setTimeout(() => setError(null), 2000); // Clear error after 2 seconds
            }
        };
        fetchHelpAlerts();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        try {
            const response = await axios.post('http://localhost:8080/api/helpalerts', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSuccessMessage('Help Alert created successfully!');
            setTimeout(() => setSuccessMessage(null), 2000); // Clear success message after 2 seconds
            setFormData({
                name: '',
                helpNeeded: '',
                email: '',
                phoneNumber: '',
            });
            setHelpAlerts((prev) => [response.data, ...prev]);
            setIsModalOpen(false); // Close modal after successful submission
        }
        catch (err) {
            console.error('Error creating Help Alert:', err);
            setError('Failed to create Help Alert. Please log in first.');
            setTimeout(() => setError(null), 2000); // Clear error after 2 seconds
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/helpalerts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setHelpAlerts((prev) => prev.filter((alert) => alert._id !== id));
        }
        catch (err) {
            console.error('Failed to delete Help Alert:', err);
            setError('Failed to delete Help Alert. Please try again.');
            setTimeout(() => setError(null), 2000); // Clear error after 2 seconds
        }
    };
    const handleStatusChange = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/helpalerts/${id}`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setHelpAlerts((prev) => prev.map((alert) => alert._id === id ? { ...alert, status: response.data.status } : alert));
        }
        catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update status. Only user who created help will be able to change status.');
            setTimeout(() => setError(null), 2000); // Clear error after 2 seconds
        }
    };
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Help Alerts" }), _jsx("button", { onClick: () => setIsModalOpen(true), className: "absolute top-4 right-4 bg-blue-500 text-white p-2 rounded", children: "Create Help" }), successMessage && _jsx("p", { className: "text-green-500", children: successMessage }), error && _jsx("p", { className: "text-red-500", children: error }), isModalOpen && (_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center", children: _jsxs("div", { className: "bg-white p-6 rounded shadow-md w-1/3", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Create Help Alert" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Name" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), required: true, className: "mt-1 p-2 border border-gray-300 rounded w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "helpNeeded", className: "block text-sm font-medium text-gray-700", children: "Help Needed" }), _jsx("input", { type: "text", id: "helpNeeded", name: "helpNeeded", value: formData.helpNeeded, onChange: (e) => setFormData({ ...formData, helpNeeded: e.target.value }), required: true, className: "mt-1 p-2 border border-gray-300 rounded w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), required: true, className: "mt-1 p-2 border border-gray-300 rounded w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "phoneNumber", className: "block text-sm font-medium text-gray-700", children: "Phone Number" }), _jsx("input", { type: "tel", id: "phoneNumber", name: "phoneNumber", value: formData.phoneNumber, onChange: (e) => setFormData({ ...formData, phoneNumber: e.target.value }), required: true, className: "mt-1 p-2 border border-gray-300 rounded w-full" })] }), _jsxs("div", { className: "flex justify-end space-x-4", children: [_jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "bg-gray-300 text-black p-2 rounded", children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white p-2 rounded", children: "Submit" })] })] })] }) })), _jsx("div", { className: "mt-8", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: helpAlerts.map((alert) => (_jsxs("div", { className: "bg-white p-4 rounded shadow-md", children: [_jsx("h3", { className: "text-lg font-semibold", children: alert.name }), _jsx("p", { className: "text-sm text-gray-600", children: alert.helpNeeded }), _jsx("p", { className: "text-sm", children: alert.email }), _jsx("p", { className: "text-sm", children: alert.phoneNumber }), _jsx("p", { className: "text-xs text-gray-400", children: new Date(alert.createdAt).toLocaleString() }), _jsxs("div", { children: [_jsx("button", { onClick: () => handleStatusChange(alert._id, 'pending'), className: `mr-2 p-2 rounded ${alert.status === 'pending' ? 'bg-red-500' : 'bg-gray-300'}`, children: "Pending" }), _jsx("button", { onClick: () => handleStatusChange(alert._id, 'fulfilled'), className: `p-2 rounded ${alert.status === 'fulfilled' ? 'bg-green-500' : 'bg-gray-300'}`, children: "Fulfilled" }), _jsx("p", { className: `mt-2 ${alert.status === 'fulfilled' ? 'text-green-500' : 'text-red-500'}`, children: alert.status === 'fulfilled' ? '✔ Fulfilled' : '! Pending' })] }), alert.userId === loggedInUserId && (_jsx("button", { onClick: () => handleDelete(alert._id), className: "mt-2 bg-red-500 text-white p-2 rounded", children: "Delete" }))] }, alert._id))) }) })] }));
};
export default HelpAlert;
