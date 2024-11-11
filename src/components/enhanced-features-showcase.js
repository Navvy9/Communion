import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Globe, MessageCircle, Users, Book, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
const features = [
    {
        icon: Users,
        title: "Community Groups",
        description: "Connect with like-minded individuals and explore diverse faith communities.",
    },
    {
        icon: MessageCircle,
        title: "Help And Support",
        description: "Embrace the opportunity to be a blessing to others.connect, and lend support, fostering a circle of warmth, care, and divine connection.",
    },
    {
        icon: Book,
        title: "Sacred Text Study",
        description: "Dive deep into various religious texts and expand your spiritual knowledge.",
    },
    {
        icon: Globe,
        title: "Virtual Tours",
        description: "Explore places of worship from around the world, right from your device.",
    },
    {
        icon: Calendar,
        title: "Interfaith Events",
        description: "Discover and participate in local and global interfaith gatherings and celebrations.",
    },
    {
        icon: Heart,
        title: "Community Service",
        description: "Make a positive impact through interfaith volunteer opportunities and projects.",
    },
];
export function EnhancedFeaturesShowcase() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();
    // Simulating user login status (replace with actual logic)
    const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const handleClick = (title) => {
        navigate(`/${title}`);
    };
    // Handle "Join Communion Today" button click
    const handleJoinClick = () => {
        if (!isUserLoggedIn) {
            // Redirect to login if the user is not logged in
            navigate("/AuthPage");
        }
        else {
            // Navigate to the main community page if logged in
            navigate("/community");
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "container mx-auto px-4 py-16", children: [_jsxs(motion.header, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center mb-16", children: [_jsx(motion.div, { animate: {
                                rotate: 360,
                            }, transition: {
                                repeat: Infinity, // Makes it loop infinitely
                                duration: 10, // Adjust speed of the rotation
                                ease: "linear", // Smooth rotation
                            }, className: "h-16 w-16 mx-auto text-indigo-600 mb-4", children: _jsx(Globe, { className: "h-full w-full" }) }), _jsx("h1", { className: "text-4xl font-bold tracking-tight mb-2 text-gray-800", children: "Communion" }), _jsx("p", { className: "text-xl text-gray-500", children: "Uniting Communities Across Faiths" })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: 0.2 }, className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: features.map((feature, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, whileHover: { scale: 1.05 }, onHoverStart: () => setHoveredIndex(index), onHoverEnd: () => setHoveredIndex(null), children: _jsxs(Card, { onClick: () => handleClick(feature.title), className: "h-full shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-all", children: [_jsxs(CardHeader, { className: "flex items-center space-x-4", children: [_jsx(feature.icon, { className: "h-8 w-8 text-indigo-600" }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-semibold text-gray-800", children: feature.title }), _jsx(CardDescription, { className: "text-sm text-gray-600", children: feature.description })] })] }), _jsx(CardContent, { children: _jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: hoveredIndex === index ? 1 : 0, height: hoveredIndex === index ? "auto" : 0 }, transition: { duration: 0.3 }, children: _jsxs("p", { className: "text-sm text-gray-500", children: ["Discover more about ", feature.title.toLowerCase(), " and how it can enrich your spiritual journey."] }) }) })] }) }, feature.title))) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.8 }, className: "mt-16 text-center", children: [_jsx(Button, { size: "lg", className: "bg-indigo-600 text-white hover:bg-indigo-700 transition-all py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500", onClick: handleJoinClick, children: "Join Communion Today" }), _jsx("p", { className: "mt-4 text-sm text-gray-500", children: "Start your journey of interfaith connection and understanding." })] })] }) }));
}
