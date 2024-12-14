import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
// Example card data (replace with actual images and descriptions)
const cardData = [
    {
        id: 1,
        image: 'https://wallpaperbat.com/img/1508960-aesthetic-wallpaper-of-kedarnath-temple-with-himalyan-mountains-in-the-background.webp',
        description: 'Kedarnath is a town in the Rudraprayag district of Uttarakhand, India, known primarily for the Kedarnath Temple, a significant Hindu shrine dedicated to Lord Shiva.'
    },
    {
        id: 2,
        image: 'https://thumbs.dreamstime.com/b/wall-decorative-mekkah-kaaba-hajj-ai-generator-wall-decorative-mekkah-kaaba-hajj-ai-generator-311124247.jpg',
        description: 'The Kaaba, located in the center of the Great Mosque in Mecca, is the most sacred site in Islam.'
    },
    {
        id: 3,
        image: 'https://img.freepik.com/premium-photo/church-night_1203138-47429.jpg',
        description: 'St Paul’s Cathedral in London is an iconic Anglican cathedral designed by Sir Christopher Wren.'
    },
    {
        id: 4,
        image: 'https://www.ghumindiaghum.com/images/Package/4g9WD1RIcJ/Shravasti_Main1.jpg',
        description: 'Shravasti in Uttar Pradesh, India, is a revered Buddhist site where Buddha spent many monastic seasons.'
    },
];
const CustomCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    };
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
    };
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (_jsxs("div", { className: "relative flex flex-col justify-center items-center max-h-screen rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 py-10 ", children: [_jsx("h1", { className: "text-3xl text-white font-semibold mb-8", children: "Divine Destinations" }), _jsx(motion.button, { onClick: handlePrev, whileHover: { scale: 1.1 }, className: "absolute left-5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg", children: "<" }), _jsx("div", { className: "flex space-x-8", children: cardData.slice(currentIndex, currentIndex + 3).map((card) => (_jsx(motion.div, { className: "cursor-pointer transition-transform transform hover:scale-110", whileHover: { scale: 1.15 }, onClick: () => handleCardClick(card), children: _jsx("div", { className: "w-64 h-64 flex justify-center items-center border-2 border-white rounded-lg overflow-hidden shadow-2xl bg-white", children: _jsx("img", { src: card.image, alt: `Card ${card.id}`, className: "w-full h-full object-cover" }) }) }, card.id))) }), _jsx(motion.button, { onClick: handleNext, whileHover: { scale: 1.1 }, className: "absolute right-5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg", children: ">" }), _jsx(AnimatePresence, { children: isModalOpen && selectedCard && (_jsx(motion.div, { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: _jsxs(motion.div, { className: "bg-white p-6 rounded-lg w-3/4 relative shadow-2xl", initial: { scale: 0.8 }, animate: { scale: 1 }, exit: { scale: 0.8 }, children: [_jsx("button", { className: "absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700", onClick: closeModal, children: "Close" }), _jsxs("div", { className: "flex flex-col md:flex-row space-y-8 md:space-x-8 justify-center items-center", children: [_jsx(motion.div, { className: "w-80 h-80 flex justify-center items-center border border-gray-300 rounded-lg overflow-hidden shadow-lg", whileHover: { scale: 1.05 }, children: _jsx("img", { src: selectedCard.image, alt: `Card ${selectedCard.id}`, className: "w-full h-full object-cover" }) }), _jsx(motion.div, { className: "w-80 h-80 flex flex-col justify-center items-center p-4 bg-gradient-to-b from-gray-100 to-gray-200 border rounded-lg shadow-lg text-center", initial: { opacity: 0 }, animate: { opacity: 1 }, children: _jsx("p", { className: "text-lg font-medium text-gray-800", children: selectedCard.description }) })] })] }) })) })] }));
};
export default CustomCarousel;
