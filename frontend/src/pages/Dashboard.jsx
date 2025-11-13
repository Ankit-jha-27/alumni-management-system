import React from "react";

const Dashboard = ({ user, onLogout }) => {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl text-gray-700 dark:text-gray-200">Please log in to view your dashboard.</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-blue-700 dark:text-cyan-300 mb-4 text-center">Welcome, {user.name}!</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2 text-center">Role: <span className="font-semibold">{user.role}</span></p>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Email: {user.email}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Static dashboard cards */}
          <div className="bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-600 dark:text-cyan-300 mb-2">12</span>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Projects Completed</span>
          </div>
          <div className="bg-gradient-to-br from-green-100 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-green-600 dark:text-green-300 mb-2">5</span>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Events Attended</span>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-yellow-600 dark:text-yellow-300 mb-2">3</span>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Certificates Earned</span>
          </div>
          <div className="bg-gradient-to-br from-purple-100 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-purple-600 dark:text-purple-300 mb-2">8</span>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Alumni Connections</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button onClick={onLogout} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
