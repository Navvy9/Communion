import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";

interface Event {
  date: string;
  eventName: string;
  venue: string;
  description: string;
  participants: number;
}

const initialEvents: Event[] = [
  {
    date: "2024-10-11",
    eventName: "Durga Puja",
    venue: "Community Hall",
    description:
      "Durga Puja celebrates the victory of Goddess Durga over the demon Mahishasura.",
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

const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

const ReligiousEventsCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(dayjs()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleEventSubmit = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
    setIsEventFormOpen(false);
  };

  const handleParticipate = (event: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e === event ? { ...e, participants: e.participants + 1 } : e
      )
    );
  };

  const renderCalendar = () => {
    const numDays = daysInMonth(currentDate.month() + 1, currentDate.year());
    const monthEvents = events.filter(
      (event) => new Date(event.date).getMonth() === currentDate.month()
    );

    return Array.from({ length: numDays }, (_, i) => {
      const day = i + 1;
      const fullDate = `${currentDate.year()}-${String(
        currentDate.month() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const event = monthEvents.find((event) => event.date === fullDate);

      const isToday =
        day === currentDate.date() && currentDate.month() === dayjs().month();

      return (
        <div
          key={day}
          className={`relative p-3 border rounded-lg cursor-pointer transition transform hover:scale-105 w-32 h-32 ${
            isToday ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
          }`}
          onClick={() => event && setSelectedEvent(event)}
        >
          <span className="text-lg font-semibold text-gray-700">{day}</span>
          {event && (
            <div className="absolute inset-0 p-2 bg-blue-50 border-l-4 border-blue-400 rounded shadow-sm">
              <h3 className="text-md font-semibold">{event.eventName}</h3>
              <p className="text-sm text-gray-600">{event.venue}</p>
              <button
                className="text-xs text-blue-600 mt-2 underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleParticipate(event);
                }}
              >
                Participate ({event.participants})
              </button>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen  text-gray-800">
      <h1 className="text-3xl font-bold my-6 text-blue-600 drop-shadow-md">
        Events Calendar
      </h1>

      <div className="flex justify-between w-full max-w-4xl mb-6 text-gray-700">
        <span className="text-xl font-medium">
          {currentDate.format("MMMM YYYY")}
        </span>
        <span className="text-md text-gray-500">
          {currentDate.format("dddd, MMM D")}
        </span>
        <button
          onClick={() => setIsEventFormOpen(true)}
          className="bg-blue-500 text-white font-bold py-1 px-4 rounded shadow hover:bg-blue-600 transition"
        >
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-7 gap-3 max-w-4xl">{renderCalendar()}</div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={() => setSelectedEvent(null)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-center mb-2 text-blue-700">
              {selectedEvent.eventName}
            </h2>
            <p className="text-md italic text-gray-600 mb-2">
              {selectedEvent.venue}
            </p>
            <p className="text-lg text-gray-800">{selectedEvent.description}</p>
            <p className="mt-4 text-sm text-gray-500">
              Participants: {selectedEvent.participants}
            </p>
            <button
              className="w-full bg-blue-500 text-white font-bold py-2 mt-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleParticipate(selectedEvent)}
            >
              Participate
            </button>
          </div>
        </div>
      )}

      {/* Add Event Form */}
      {isEventFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">Create New Event</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const newEvent: Event = {
                  date: formData.get("date") as string,
                  eventName: formData.get("eventName") as string,
                  venue: formData.get("venue") as string,
                  description: formData.get("description") as string,
                  participants: 0,
                };
                handleEventSubmit(newEvent);
              }}
            >
              <input
                type="date"
                name="date"
                required
                className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="eventName"
                placeholder="Event Name"
                required
                className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="venue"
                placeholder="Venue"
                required
                className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                placeholder="Event Description"
                required
                className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReligiousEventsCalendar;
