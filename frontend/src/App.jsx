import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Projects from "./pages/Projects.jsx";
import MLProjects from "./pages/MLProjects.jsx";
import CyberSecurityProjects from "./pages/CyberSecurityProjects.jsx";
import Alumni from "./pages/Alumni.jsx";
import Events from "./pages/Events.jsx";
import Notification from "./pages/Notification.jsx";
import Landing from "./pages/Landing.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [user, setUser] = React.useState(null);
  // Try to load user from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogin = (res) => {
    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
    window.location.href = "/dashboard";
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {/* Always show Navbar; it will handle its own conditional rendering */}
        <Navbar user={user} onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-6 flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
            {/* Protected routes: only show if user is logged in */}
            {user && <Route path="/projects" element={<Projects />} />}
            {user && <Route path="/projects/ml" element={<MLProjects />} />}
            {user && <Route path="/projects/cyber-security" element={<CyberSecurityProjects />} />}
            {user && <Route path="/alumni" element={<Alumni />} />}
            {user && <Route path="/events" element={<Events />} />}
            {user && <Route path="/notifications" element={<Notification />} />}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
