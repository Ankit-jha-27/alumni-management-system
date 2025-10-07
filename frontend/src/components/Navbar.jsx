import { NavLink } from 'react-router-dom'

const linkBase =
  'px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 hover:text-blue-700'
const linkActive = 'bg-blue-600 text-white hover:bg-blue-700'

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">Departmental Alumni Management</span>
          </div>
          <div className="flex items-center gap-2">
            <NavLink
              to="/projects"
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : 'text-gray-700'}`}
            >
              Projects
            </NavLink>
            <NavLink
              to="/alumni"
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : 'text-gray-700'}`}
            >
              Alumni
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : 'text-gray-700'}`}
            >
              Events
            </NavLink>
            <NavLink
              to="/notifications"
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : 'text-gray-700'}`}
            >
              Notifications
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar