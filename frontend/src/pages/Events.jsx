import React, { useEffect, useState } from "react";
import { eventsApi } from "../lib/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await eventsApi.list();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 animate-pulse text-lg">
          Loading events...
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg font-medium">
          No upcoming events 📅
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">
        Upcoming Events
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {event.description}
            </p>
            <p className="text-gray-500 text-xs">
              📍 {event.location || "HITK Campus"}
            </p>
            <p className="text-blue-600 text-xs mt-2">
              🕒 {formatDate(event.date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
