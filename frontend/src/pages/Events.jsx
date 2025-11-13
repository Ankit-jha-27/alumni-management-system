import React, { useEffect, useState } from "react";
import { eventsApi } from "../lib/api";
import { Calendar, MapPin, Clock } from "lucide-react";

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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Upcoming Events
      </h2>

      <section className="flex flex-wrap justify-center gap-8">
        {events.map((event) => (
          <article
            key={event._id}
            className="bg-gradient-to-br from-blue-50 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl hover:shadow-cyan-400/40 transition-transform transform hover:-translate-y-2 p-6 border border-blue-200 dark:border-gray-700 w-80 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-xl text-blue-700 dark:text-cyan-300 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-3 dark:text-gray-300">{event.description}</p>
            </div>
            <div className="mt-3 space-y-2">
              <p className="flex items-center text-gray-500 text-sm gap-1">
                <MapPin size={16} /> {event.location || "HITK Campus"}
              </p>
              <p className="flex items-center text-blue-600 text-sm gap-1">
                <Clock size={16} /> {formatDate(event.date)}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Events;
