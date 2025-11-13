import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { notificationsApi } from "../lib/api";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchNotifications() {
    try {
      setLoading(true);
      setError("");
      const data = await notificationsApi.list();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <header className="flex items-center gap-2">
        <Bell className="text-blue-600" size={28} />
        <h1 className="text-2xl font-semibold text-gray-800">
          Notifications
        </h1>
      </header>

      {error && <div className="text-red-600">{error}</div>}
      {loading && <div className="text-gray-600">Loading notifications...</div>}

      {!loading && notifications.length === 0 && (
        <div className="text-gray-600 text-center mt-10">
          No notifications available.
        </div>
      )}

      <section className="flex flex-wrap justify-center gap-8">
        {notifications.map((note) => (
          <article
            key={note._id}
            className="bg-gradient-to-br from-blue-50 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl hover:shadow-cyan-400/40 transition-transform transform hover:-translate-y-2 p-6 border border-blue-200 dark:border-gray-700 w-80 flex flex-col justify-between"
          >
            <h2 className="font-bold text-xl text-blue-700 dark:text-cyan-300 mb-2">{note.title}</h2>
            <p className="text-gray-700 text-sm mt-1 dark:text-gray-300">{note.message}</p>
            <div className="text-xs text-gray-500 mt-2">
              {note.sentAt
                ? new Date(note.sentAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Unknown date"}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Notification;
