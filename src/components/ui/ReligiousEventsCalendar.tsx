import React, { useState } from "react";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";

interface Event {
  date: string;
  eventName: string;
  religion: string;
  description: string;
}

const events2024: Event[] = [
  {
    date: "2024-10-11",
    eventName: "Durga Puja",
    religion: "Hinduism",
    description:
      "Durga Puja celebrates the victory of Goddess Durga over the demon Mahishasura, symbolizing the triumph of good over evil.",
  },
  {
    date: "2024-10-13",
    eventName: "Dussehra",
    religion: "Hinduism",
    description:
      "Dussehra marks the victory of Lord Rama over the demon king Ravana, symbolizing the victory of good over evil.",
  },
  {
    date: "2024-10-15",
    eventName: "Eid Milad-un-Nabi",
    religion: "Islam",
    description:
      "Eid Milad-un-Nabi celebrates the birth of the Prophet Muhammad, the founder of Islam.",
  },
  {
    date: "2024-11-01",
    eventName: "Diwali",
    religion: "Hinduism",
    description:
      "Diwali, the festival of lights, celebrates the return of Lord Rama to Ayodhya after defeating Ravana, symbolizing the victory of light over darkness.",
  },
  {
    date: "2024-11-15",
    eventName: "Guru Nanak Jayanti",
    religion: "Sikhism",
    description:
      "Guru Nanak Jayanti marks the birth of Guru Nanak, the founder of Sikhism, and celebrates his teachings.",
  },
  {
    date: "2024-12-25",
    eventName: "Christmas",
    religion: "Christianity",
    description:
      "Christmas celebrates the birth of Jesus Christ, believed to be the son of God in Christian faith.",
  },
];

const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

const ReligiousEventsCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentMonth, setCurrentMonth] = useState(10); // October
  const [currentYear] = useState(2024);

  const handleMonthChange = (direction: number) => {
    setCurrentMonth((prev) => {
      const newMonth = prev + direction;
      if (newMonth < 10) return 12; // Allow between Oct-Dec
      if (newMonth > 12) return 10;
      return newMonth;
    });
  };

  const renderCalendar = () => {
    const numDays = daysInMonth(currentMonth, currentYear);
    const monthEvents = events2024.filter(
      (event) => new Date(event.date).getMonth() + 1 === currentMonth
    );
    const today = dayjs().date();

    const days = [];
    for (let day = 1; day <= numDays; day++) {
      const fullDate = `${currentYear}-${currentMonth
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const event = monthEvents.find((event) => event.date === fullDate);
      const isToday = day === today && currentMonth === dayjs().month() + 1;

      days.push(
        <div
          key={day}
          className={`relative p-4 border rounded-lg cursor-pointer ${
            isToday ? "bg-green-200" : ""
          }`}
          onClick={() => event && setSelectedEvent(event)}
        >
          {day}
          {event && (
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Religious Events Calendar 2024</h1>
      <div className="flex justify-between w-full max-w-2xl mb-4">
        <button
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-l"
          onClick={() => handleMonthChange(-1)}
        >
          Previous
        </button>
        <span className="text-xl font-semibold">
          {dayjs(new Date(currentYear, currentMonth - 1)).format("MMMM YYYY")}
        </span>
        <button
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r"
          onClick={() => handleMonthChange(1)}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 max-w-2xl">{renderCalendar()}</div>

      {selectedEvent && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={() => setSelectedEvent(null)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedEvent.eventName}</h2>
            <p className="text-sm mb-4 italic">{selectedEvent.religion}</p>
            <p className="text-md">{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReligiousEventsCalendar;
