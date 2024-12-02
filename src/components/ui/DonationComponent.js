import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
const DonationComponent = () => {
    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [highlightedDonor, setHighlightedDonor] = useState(null);
    // Modal state
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [upi, setUpi] = useState('');
    // Donation state
    const [donateMode, setDonateMode] = useState(null);
    const [donorName, setDonorName] = useState('');
    const [amount, setAmount] = useState('');
    // Fetch token (assuming it's stored in localStorage)
    const getToken = () => {
        return localStorage.getItem('token');
    };
    const fetchWithAuth = async (url, options = {}) => {
        const token = getToken();
        if (!token) {
            console.error('No authentication token found');
            throw new Error('Unauthorized');
        }
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
        return fetch(url, { ...options, headers });
    };
    // Fetch donation requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetchWithAuth('http://localhost:8080/api/donations');
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
                const data = await response.json();
                setRequests(data);
            }
            catch (error) {
                console.error('Failed to fetch donation requests:', error);
            }
        };
        fetchRequests();
    }, []);
    // Open and close modal
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setProjectName('');
        setDescription('');
        setUpi('');
    };
    // Create donation request
    const handleCreateRequest = async () => {
        if (projectName && description && upi) {
            try {
                const response = await fetchWithAuth('http://localhost:8080/api/donations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ projectName, description, upi }),
                });
                if (!response.ok) {
                    throw new Error(`Failed to create: ${response.status}`);
                }
                const newRequest = await response.json();
                setRequests((prev) => [...prev, newRequest]);
                handleCloseModal();
            }
            catch (error) {
                console.error('Failed to create donation request:', error);
            }
        }
    };
    // Add donation
    const handleAddDonation = async (requestId) => {
        if (donorName && amount) {
            try {
                const response = await fetchWithAuth(`http://localhost:8080/api/donations/${requestId}/donate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ donorName, amount: parseFloat(amount) }),
                });
                if (!response.ok) {
                    throw new Error(`Failed to donate: ${response.status}`);
                }
                const updatedRequest = await response.json();
                setRequests((prev) => prev.map((request) => request.id === requestId ? updatedRequest : request));
                setDonateMode(null);
                setDonorName('');
                setAmount('');
            }
            catch (error) {
                console.error('Failed to add donation:', error);
            }
        }
    };
    // Verify donation
    const handleVerifyDonation = async (requestId, donorName) => {
        try {
            const response = await fetchWithAuth(`http://localhost:8080/api/donations/${requestId}/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ donorName }),
            });
            if (!response.ok) {
                throw new Error(`Failed to verify: ${response.status}`);
            }
            const updatedRequest = await response.json();
            setRequests((prev) => prev.map((request) => request.id === requestId ? updatedRequest : request));
            setHighlightedDonor(donorName);
        }
        catch (error) {
            console.error('Failed to verify donation:', error);
        }
    };
    return (_jsxs("div", { className: "donation-app p-4 bg-gray-100 min-h-screen", children: [_jsxs("header", { className: "mb-6 text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Donation Platform" }), highlightedDonor && (_jsxs("div", { className: "mt-4 bg-green-100 text-green-800 p-3 rounded-md", children: ["\uD83C\uDF89 ", _jsx("strong", { children: highlightedDonor }), " has recently donated! \uD83C\uDF89"] })), _jsx("button", { onClick: handleOpenModal, className: "mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md", children: "Request Donation" })] }), showModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white rounded-lg p-6 w-96 shadow-lg", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Create Donation Request" }), _jsxs("label", { className: "block mb-2", children: [_jsx("span", { className: "text-gray-700", children: "Project Name" }), _jsx("input", { type: "text", value: projectName, onChange: (e) => setProjectName(e.target.value), className: "w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200" })] }), _jsxs("label", { className: "block mb-2", children: [_jsx("span", { className: "text-gray-700", children: "Description" }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), className: "w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200" })] }), _jsxs("label", { className: "block mb-4", children: [_jsx("span", { className: "text-gray-700", children: "UPI ID" }), _jsx("input", { type: "text", value: upi, onChange: (e) => setUpi(e.target.value), className: "w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200" })] }), _jsx("button", { onClick: handleCreateRequest, className: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md mr-2", children: "Submit" }), _jsx("button", { onClick: handleCloseModal, className: "bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg", children: "Close" })] }) })), _jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: requests.map((request) => (_jsxs("div", { className: "bg-white shadow-md rounded-lg p-4 border border-gray-200", children: [_jsx("h3", { className: "text-xl font-semibold", children: request.projectName }), _jsx("p", { className: "text-gray-700", children: request.description }), _jsxs("p", { className: "text-sm text-gray-500", children: [_jsx("strong", { children: "UPI:" }), " ", request.upi] }), request.verifiedBy && (_jsxs("p", { className: "text-green-600 mt-2", children: [_jsx("strong", { children: "Verified by:" }), " ", request.verifiedBy] })), _jsx("button", { onClick: () => setDonateMode(donateMode === request.id ? null : request.id), className: "mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg", children: donateMode === request.id ? 'Cancel' : 'Donate' }), donateMode === request.id && (_jsxs("div", { className: "mt-4", children: [_jsxs("label", { className: "block mb-2", children: [_jsx("span", { className: "text-gray-700", children: "Your Name" }), _jsx("input", { type: "text", value: donorName, onChange: (e) => setDonorName(e.target.value), className: "w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200" })] }), _jsxs("label", { className: "block mb-4", children: [_jsx("span", { className: "text-gray-700", children: "Amount" }), _jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), className: "w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200" })] }), _jsx("button", { onClick: () => handleAddDonation(request.id), className: "bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg mr-2", children: "Submit Donation" })] })), request.donations.map((donation, index) => (_jsxs("div", { className: "mt-2 p-2 bg-gray-100 rounded-md shadow-sm", children: [_jsxs("p", { children: ["Donor: ", _jsx("strong", { children: donation.donorName }), ", Amount: \u20B9", donation.amount] }), !request.verifiedBy && (_jsx("button", { onClick: () => handleVerifyDonation(request.id, donation.donorName), className: "mt-2 text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded", children: "Verify Donation" }))] }, index)))] }, request.id))) })] }));
};
export default DonationComponent;
