import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
const initialEvents = [
    {
        date: "2024-10-11",
        eventName: "Durga Puja",
        venue: "Community Hall",
        description: "Durga Puja celebrates the victory of Goddess Durga over the demon Mahishasura.",
        participants: 15,
    },
    {
        date: "2024-10-13",
        eventName: "Dussehra",
        venue: "Main Square",
        description: "Dussehra marks the victory of Lord Rama over Ravana.",
        participants: 30,
    },
];
const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
const ReligiousEventsCalendar = () => {
    const [events, setEvents] = useState(initialEvents);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEventFormOpen, setIsEventFormOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(dayjs());
    useEffect(() => {
        const interval = setInterval(() => setCurrentDate(dayjs()), 60000);
        return () => clearInterval(interval);
    }, []);
    const handleEventSubmit = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
        setIsEventFormOpen(false);
    };
    const handleParticipate = (event) => {
        setEvents((prevEvents) => prevEvents.map((e) => e === event ? { ...e, participants: e.participants + 1 } : e));
    };
    const renderCalendar = () => {
        const numDays = daysInMonth(currentDate.month() + 1, currentDate.year());
        const monthEvents = events.filter((event) => new Date(event.date).getMonth() === currentDate.month());
        return Array.from({ length: numDays }, (_, i) => {
            const day = i + 1;
            const fullDate = `${currentDate.year()}-${String(currentDate.month() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const event = monthEvents.find((event) => event.date === fullDate);
            const isToday = day === currentDate.date() && currentDate.month() === dayjs().month();
            return (_jsxs("div", { className: `relative p-3 border rounded-lg cursor-pointer transition transform hover:scale-105 w-32 h-32 ${isToday ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"}`, onClick: () => event && setSelectedEvent(event), children: [_jsx("span", { className: "text-lg font-semibold text-gray-700", children: day }), event && (_jsxs("div", { className: "absolute inset-0 p-2 bg-blue-50 border-l-4 border-blue-400 rounded shadow-sm", children: [_jsx("h3", { className: "text-md font-semibold", children: event.eventName }), _jsx("p", { className: "text-sm text-gray-600", children: event.venue }), _jsxs("button", { className: "text-xs text-blue-600 mt-2 underline", onClick: (e) => {
                                    e.stopPropagation();
                                    handleParticipate(event);
                                }, children: ["Participate (", event.participants, ")"] })] }))] }, day));
        });
    };
    return (_jsxs("div", { className: "relative flex flex-col items-center justify-center h-screen  text-gray-800", children: [_jsx("h1", { className: "text-3xl font-bold my-6 text-blue-600 drop-shadow-md", children: "Events Calendar" }), _jsxs("div", { className: "flex justify-between w-full max-w-4xl mb-6 text-gray-700", children: [_jsx("span", { className: "text-xl font-medium", children: currentDate.format("MMMM YYYY") }), _jsx("span", { className: "text-md text-gray-500", children: currentDate.format("dddd, MMM D") }), _jsx("button", { onClick: () => setIsEventFormOpen(true), className: "bg-blue-500 text-white font-bold py-1 px-4 rounded shadow hover:bg-blue-600 transition", children: "Add Event" })] }), _jsx("div", { className: "grid grid-cols-7 gap-3 max-w-4xl", children: renderCalendar() }), selectedEvent && (_jsx("div", { className: "fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-lg z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-md relative", children: [_jsx("button", { className: "absolute top-2 right-2 text-red-500 font-bold", onClick: () => setSelectedEvent(null), children: "\u2716" }), _jsx("h2", { className: "text-2xl font-bold text-center mb-2 text-blue-700", children: selectedEvent.eventName }), _jsx("p", { className: "text-md italic text-gray-600 mb-2", children: selectedEvent.venue }), _jsx("p", { className: "text-lg text-gray-800", children: selectedEvent.description }), _jsxs("p", { className: "mt-4 text-sm text-gray-500", children: ["Participants: ", selectedEvent.participants] }), _jsx("button", { className: "w-full bg-blue-500 text-white font-bold py-2 mt-4 rounded hover:bg-blue-600 transition", onClick: () => handleParticipate(selectedEvent), children: "Participate" })] }) })), isEventFormOpen && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg max-w-lg w-full", children: [_jsx("h3", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Create New Event" }), _jsxs("form", { onSubmit: (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const newEvent = {
                                    date: formData.get("date"),
                                    eventName: formData.get("eventName"),
                                    venue: formData.get("venue"),
                                    description: formData.get("description"),
                                    participants: 0,
                                };
                                handleEventSubmit(newEvent);
                            }, children: [_jsx("input", { type: "date", name: "date", required: true, className: "w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("input", { type: "text", name: "eventName", placeholder: "Event Name", required: true, className: "w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("input", { type: "text", name: "venue", placeholder: "Venue", required: true, className: "w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("textarea", { name: "description", placeholder: "Event Description", required: true, className: "w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition", children: "Add Event" })] })] }) }))] }));
};
export default ReligiousEventsCalendar;
