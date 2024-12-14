import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
const ReligiousEventsCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEventFormOpen, setIsEventFormOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(dayjs());
    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/events", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setEvents(data);
                }
                else {
                    console.error("Failed to fetch events:", data.message);
                }
            }
            catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);
    // Add a new event
    const handleEventSubmit = async (event) => {
        try {
            const response = await fetch("http://localhost:8080/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(event),
            });
            const data = await response.json();
            if (response.ok) {
                setEvents((prevEvents) => [...prevEvents, data]);
                setIsEventFormOpen(false);
            }
            else {
                alert(`Failed to add event, please login: ${data.message}`);
            }
        }
        catch (error) {
            console.error("Error adding event:", error);
            alert("Please login!");
        }
    };
    // Delete an event
    const handleDeleteEvent = async (event) => {
        if (!window.confirm("Are you sure you want to delete this event?"))
            return;
        try {
            const response = await fetch(`http://localhost:8080/api/events/${event._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                setEvents((prevEvents) => prevEvents.filter((e) => e._id !== event._id));
                setSelectedEvent(null);
                alert("Event deleted successfully.");
            }
            else {
                const data = await response.json();
                alert(`Failed to delete event, please login: ${data.message}`);
            }
        }
        catch (error) {
            console.error("Error deleting event:", error);
            alert("An error occurred while deleting the event.");
        }
    };
    // Participate in an event
    const handleParticipate = async (event) => {
        try {
            // Update participant count in the backend
            const response = await fetch(`http://localhost:8080/api/events/${event._id}/participate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                const updatedEvent = await response.json(); // Backend returns the updated event
                // Update the event in the local state
                setEvents((prevEvents) => prevEvents.map((e) => (e._id === updatedEvent._id ? updatedEvent : e)));
            }
            else {
                const error = await response.json();
                console.error("Failed to update participation:", error.message);
                alert(`Error: ${error.message}`);
            }
        }
        catch (error) {
            console.error("Error during participation update:", error);
            alert("An error occurred while updating participation. Please login.");
        }
    };
    // Render calendar days
    const renderCalendar = () => {
        const daysInMonth = new Date(currentDate.year(), currentDate.month() + 1, 0).getDate();
        const monthEvents = events.filter((event) => new Date(event.date).getMonth() === currentDate.month());
        return Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const fullDate = `${currentDate.year()}-${String(currentDate.month() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const event = monthEvents.find((event) => event.date === fullDate);
            const isToday = day === currentDate.date() && currentDate.month() === dayjs().month();
            return (_jsxs("div", { className: `relative p-3 border rounded-lg cursor-pointer transition transform hover:scale-105 w-24 h-24 md:w-32 md:h-32 ${isToday ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"}`, onClick: () => event && setSelectedEvent(event), children: [_jsx("span", { className: "text-lg font-semibold text-gray-700", children: day }), event && (_jsxs("div", { className: "absolute inset-0 p-2 bg-blue-50 border-l-4 border-blue-400 rounded shadow-sm", children: [_jsx("h3", { className: "text-md font-semibold", children: event.eventName }), _jsx("p", { className: "text-sm text-gray-600", children: event.venue }), _jsxs("button", { className: "text-xs text-blue-600 mt-2 underline", onClick: (e) => {
                                    e.stopPropagation();
                                    handleParticipate(event);
                                }, children: ["Participate (", event.participants, ")"] })] }))] }, day));
        });
    };
    return (_jsxs("div", { className: "relative flex flex-col items-center justify-center h-screen text-gray-800 px-4 sm:px-6 lg:px-8", children: [_jsx("h1", { className: "text-3xl font-bold my-6 text-blue-600 drop-shadow-md", children: "Events Calendar" }), _jsxs("div", { className: "flex justify-between w-full max-w-4xl mb-6 text-gray-700", children: [_jsx("span", { className: "text-xl font-medium", children: currentDate.format("MMMM YYYY") }), _jsx("span", { className: "text-md text-gray-500", children: currentDate.format("dddd, MMM D") }), _jsx("button", { onClick: () => setIsEventFormOpen(true), className: "bg-blue-500 text-white font-bold py-1 px-4 rounded shadow hover:bg-blue-600 transition", children: "Add Event" })] }), _jsx("div", { className: "grid grid-cols-7 gap-3 max-w-4xl sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7", children: renderCalendar() }), selectedEvent && (_jsx("div", { className: "fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-lg z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-md relative", children: [_jsx("button", { className: "absolute top-2 right-2 text-red-500 font-bold", onClick: () => setSelectedEvent(null), children: "\u2716" }), _jsx("h2", { className: "text-2xl font-bold text-center mb-2 text-blue-700", children: selectedEvent.eventName }), _jsx("p", { className: "text-md italic text-gray-600 mb-2", children: selectedEvent.venue }), _jsx("p", { className: "text-lg text-gray-800", children: selectedEvent.description }), _jsxs("p", { className: "mt-4 text-sm text-gray-500", children: ["Participants: ", selectedEvent.participants] }), _jsx("button", { className: "w-full bg-blue-500 text-white font-bold py-2 mt-4 rounded hover:bg-blue-600 transition", onClick: () => handleParticipate(selectedEvent), children: "Participate" }), _jsx("button", { className: "w-full bg-red-500 text-white font-bold py-2 mt-4 rounded hover:bg-red-600 transition", onClick: () => handleDeleteEvent(selectedEvent), children: "Delete Event" })] }) })), isEventFormOpen && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg max-w-lg w-full", children: [_jsx("h3", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Create New Event" }), _jsxs("form", { onSubmit: (e) => {
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
