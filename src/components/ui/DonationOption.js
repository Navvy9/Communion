import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
// List of community projects
const communities = [
    {
        id: 1,
        name: 'Temple Renovation Project',
        description: 'Help us restore our community temple and preserve our heritage for future generations.',
        qrCode: 'https://png.pngitem.com/pimgs/s/120-1202144_qr-code-png-file-qr-code-transparent-png.png', // Replace with actual QR code link
        upiId: 'temple@upi',
    },
    {
        id: 2,
        name: 'Church Charity Drive',
        description: 'Support our charity drive to help the underprivileged in the local community.',
        qrCode: 'https://png.pngitem.com/pimgs/s/120-1202144_qr-code-png-file-qr-code-transparent-png.png', // Replace with actual QR code link
        upiId: 'church@upi',
    },
    {
        id: 3,
        name: 'Mosque Education Fund',
        description: 'Contribute to building educational programs for children in our community.',
        qrCode: 'https://png.pngitem.com/pimgs/s/120-1202144_qr-code-png-file-qr-code-transparent-png.png', // Replace with actual QR code link
        upiId: 'mosque@upi',
    },
    {
        id: 4,
        name: 'Gurdwara Community Kitchen',
        description: 'Help us provide free meals to those in need through our community kitchen program.',
        qrCode: 'https://png.pngitem.com/pimgs/s/120-1202144_qr-code-png-file-qr-code-transparent-png.png', // Replace with actual QR code link
        upiId: 'gurdwara@upi',
    },
];
const DonationOption = () => {
    const [selectedCommunity, setSelectedCommunity] = useState(null); // Add proper type here
    const [showModal, setShowModal] = useState(false); // Control modal visibility
    // Type the community parameter correctly
    const handleDonateClick = (community) => {
        setSelectedCommunity(community);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedCommunity(null);
    };
    return (_jsxs("div", { className: "min-h-screen w-full flex flex-col items-center justify-center ", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-gray-800 ", children: "Ongoing Community Projects" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: communities.map((community) => (_jsxs("div", { className: "bg-white shadow-lg p-6 rounded-lg transform transition-transform duration-300 hover:shadow-xl hover:scale-105", children: [_jsx("h2", { className: "text-xl font-semibold mb-2 text-blue-600", children: community.name }), _jsx("p", { className: "text-gray-700 mb-4", children: community.description }), _jsx("button", { onClick: () => handleDonateClick(community), className: "w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out", children: "Donate" })] }, community.id))) }), showModal && selectedCommunity && (_jsxs("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: [_jsx("div", { className: "absolute inset-0 bg-black bg-opacity-40 backdrop-blur-xl" }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300", children: [_jsxs("h2", { className: "text-xl font-bold mb-4 text-blue-600", children: ["Donate to ", selectedCommunity.name] }), _jsx("p", { className: "text-gray-700 mb-4", children: selectedCommunity.description }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("p", { className: "text-gray-700 font-semibold mb-2", children: "Scan QR Code:" }), _jsx("img", { src: selectedCommunity.qrCode, alt: "QR Code", className: "w-40 h-40 mb-4 border border-gray-300 rounded-lg shadow-md" }), _jsx("p", { className: "text-gray-700 font-semibold mb-2", children: "Or pay with UPI:" }), _jsx("p", { className: "text-lg font-bold text-blue-600", children: selectedCommunity.upiId }), _jsx("button", { onClick: closeModal, className: "mt-6 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out", children: "Close" })] })] })] }))] }));
};
export default DonationOption;
