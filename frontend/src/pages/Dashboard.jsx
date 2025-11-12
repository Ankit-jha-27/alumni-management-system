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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-cyan-300 mb-4">Welcome, {user.name}!</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">Role: <span className="font-semibold">{user.role}</span></p>
        <p className="text-gray-600 dark:text-gray-400">Email: {user.email}</p>
        {/* Add more personalized info here based on role */}
        <div className="mt-6">
          <button onClick={onLogout} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
