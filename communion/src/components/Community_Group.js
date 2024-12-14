import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const religions = [
    {
        name: 'Christianity',
        description: 'Christianity is based on the teachings of Jesus Christ and is one of the largest religions in the world.',
        groups: ['Catholic', 'Protestant', 'Orthodox'],
    },
    {
        name: 'Islam',
        description: 'Islam is a monotheistic faith revealed through the Prophet Muhammad, with teachings from the Quran.',
        groups: ['Sunni', 'Shia'],
    },
    {
        name: 'Hinduism',
        description: 'Hinduism is one of the oldest religions, characterized by a variety of rituals, philosophies, and beliefs.',
        groups: ['Vaishnavism', 'Shaivism', 'Shaktism'],
    },
    {
        name: 'Buddhism',
        description: 'Buddhism focuses on spiritual development, meditation, and the pursuit of enlightenment.',
        groups: ['Theravada', 'Mahayana', 'Vajrayana'],
    },
    {
        name: 'Judaism',
        description: 'Judaism is the monotheistic religion of the Jewish people, based on the teachings of the Torah.',
        groups: ['Orthodox', 'Conservative', 'Reform'],
    },
];
export default function CommunityGroup() {
    const [showModal, setShowModal] = useState(false);
    const [selectedReligion, setSelectedReligion] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const navigate = useNavigate();
    const handleJoinClick = (religion, group) => {
        setSelectedReligion(religion);
        setSelectedGroup(group);
        setShowModal(true);
    };
    const handleNextClick = () => {
        if (selectedReligion && selectedGroup) {
            navigate(`/chat/${selectedReligion.name}/${selectedGroup}`);
        }
    };
    return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Community Groups" }), _jsx("p", { className: "mb-6", children: "Connect with like-minded individuals and explore diverse faith communities. Discover more about community groups and how they can enrich your spiritual journey." }), _jsx("div", { className: "border shadow-lg rounded-lg overflow-hidden", children: _jsxs("table", { className: "min-w-full", children: [_jsx("caption", { className: "text-lg font-medium p-4", children: "Explore Religions and Their Groups" }), _jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: "p-4 text-left", children: _jsx("center", { children: "Group Number" }) }), _jsx("th", { className: "p-4 text-left", children: _jsx("center", { children: "Religion" }) }), _jsx("th", { className: "p-4 text-left", children: _jsx("center", { children: "Groups" }) }), _jsx("th", { className: "p-4 text-center", children: "Action" })] }) }), _jsx("tbody", { children: religions.map((religion, index) => (_jsxs("tr", { className: "border-t", children: [_jsx("td", { className: "p-4 font-medium", children: index + 1 }), " ", _jsx("td", { className: "p-4 font-medium", children: religion.name }), _jsx("td", { className: "p-4", children: religion.groups.join(', ') }), _jsx("td", { className: "p-4 text-center", children: religion.groups.map((group, idx) => (_jsxs("button", { className: "bg-blue-500 text-white px-4 py-2 m-1 rounded hover:bg-blue-600 transition-all", onClick: () => handleJoinClick(religion, group), children: ["Join ", group] }, idx))) })] }, religion.name))) })] }) }), showModal && selectedReligion && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-[400px] relative", children: [_jsx("button", { className: "absolute top-2 right-2 text-gray-600 hover:text-gray-900", onClick: () => setShowModal(false), "aria-label": "Close Modal", children: "\u00D7" }), _jsxs("h2", { className: "text-xl font-semibold mb-4", children: [selectedReligion.name, " - ", selectedGroup] }), _jsx("p", { className: "mb-4", children: selectedReligion.description }), _jsx("button", { className: "mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all", onClick: handleNextClick, children: "Next" })] }) }))] }));
}
