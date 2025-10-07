const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-4 text-sm text-gray-600 flex justify-between">
        <span>© {new Date().getFullYear()} Departmental Alumni Management</span>
        <span>Built with React + Vite</span>
      </div>
    </footer>
  )
}

export default Footer