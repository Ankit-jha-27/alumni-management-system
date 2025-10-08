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

      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note._id}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-200"
          >
            <h2 className="text-lg font-semibold text-blue-700">
              {note.title}
            </h2>
            <p className="text-gray-700 text-sm mt-1">{note.message}</p>
            <div className="text-xs text-gray-500 mt-2">
              {note.sentAt
              ? new Date(note.sentAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
      })
    : "Unknown date"}
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
