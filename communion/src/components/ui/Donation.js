import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
const Donation = () => {
    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [accountDetails, setAccountDetails] = useState('');
    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/donations');
            setRequests(response.data);
        }
        catch (error) {
            console.error('Error fetching donations:', error);
        }
    };
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    useEffect(() => {
        fetchRequests();
    }, []);
    const handleCreateRequest = async () => {
        try {
            const newRequest = {
                projectName,
                description,
                targetAmount: Number(targetAmount),
                accountDetails,
            };
            const response = await axios.post('http://localhost:8080/api/donations', newRequest);
            setRequests([...requests, response.data]);
            setShowModal(false);
            setProjectName('');
            setDescription('');
            setTargetAmount('');
            setAccountDetails('');
        }
        catch (error) {
            console.error('Error creating donation request:', error);
        }
    };
    const handleDonate = async (donationId, amount) => {
        try {
            const response = await axios.post('http://localhost:8080/api/donations/checkout', {
                donationId,
                amount,
            });
            const { orderId } = response.data;
            const options = {
                key: 'rzp_test_beiZwZDQVcxwNX',
                amount: amount * 100,
                currency: 'INR',
                name: 'Donation Platform',
                description: 'Thank you for your donation!',
                order_id: orderId,
                handler: async function (response) {
                    try {
                        await axios.post('http://localhost:8080/api/donations/verify', {
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                            donationId,
                            amount,
                        });
                        fetchRequests();
                        alert('Payment successful!');
                    }
                    catch (error) {
                        console.error('Payment verification failed:', error);
                        alert('Payment verification failed!');
                    }
                },
                prefill: {
                    name: '',
                    email: '',
                },
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }
        catch (error) {
            console.error('Error initiating donation:', error);
        }
    };
    return (_jsxs("div", { className: "p-6 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen", children: [_jsxs("header", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-4xl font-extrabold text-gray-800 mb-4", children: "Donation Platform" }), _jsx("p", { className: "text-xl text-gray-600 mb-6", children: "Support meaningful causes and make a difference." }), _jsx("button", { onClick: () => setShowModal(true), className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105", children: "Request Donation" })] }), showModal && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg w-96", children: [_jsx("h2", { className: "text-2xl font-semibold text-center mb-6", children: "Create Donation Request" }), _jsx("input", { type: "text", placeholder: "Project Name", value: projectName, onChange: (e) => setProjectName(e.target.value), className: "w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsx("textarea", { placeholder: "Description", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsx("input", { type: "number", placeholder: "Target Amount (\u20B9)", value: targetAmount, onChange: (e) => setTargetAmount(e.target.value), className: "w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsx("input", { type: "text", placeholder: "Account Details", value: accountDetails, onChange: (e) => setAccountDetails(e.target.value), className: "w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsxs("div", { className: "flex justify-between", children: [_jsx("button", { onClick: handleCreateRequest, className: "bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition duration-300", children: "Submit" }), _jsx("button", { onClick: () => setShowModal(false), className: "bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition duration-300", children: "Cancel" })] })] }) })), _jsx("section", { children: requests.map((request) => (_jsxs("div", { className: "bg-white shadow-lg p-6 mb-6 rounded-lg hover:shadow-2xl transition duration-300 ease-in-out", children: [_jsx("h2", { className: "text-3xl font-semibold text-gray-800 mb-2", children: request.projectName }), _jsx("p", { className: "text-gray-600 mb-4", children: request.description }), _jsxs("p", { className: "text-gray-700 mb-4", children: [_jsx("strong", { children: "Target:" }), " \u20B9", request.targetAmount, ' ', _jsx("strong", { children: "Raised:" }), " \u20B9", request.raisedAmount] }), _jsx("button", { onClick: () => handleDonate(request._id, 500), className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition duration-300", children: "Donate \u20B9500" })] }, request._id))) })] }));
};
export default Donation;
