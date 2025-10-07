import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Projects from './pages/Projects.jsx'
import Alumni from './pages/Alumni.jsx'
import Events from './pages/Events.jsx'
import Notification from './pages/Notification.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-6 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/events" element={<Events />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
