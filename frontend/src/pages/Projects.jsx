import { useEffect, useMemo, useState } from 'react'
import { projectsApi } from '../lib/api'

const categories = [
  'AI/ML',
  'Web Development',
  'Data Science',
  'IoT',
  'Security',
  'Networking',
  'Systems',
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')

  const currentYear = new Date().getFullYear()
  const minYear = currentYear - 4 // last 5 years including current

  const filtered = useMemo(() => {
    const withinFiveYears = projects.filter((p) => Number(p.year) >= minYear)
    if (filter === 'All') return withinFiveYears
    return withinFiveYears.filter((p) => (p.category || 'Uncategorized') === filter)
  }, [projects, filter, minYear])

  async function fetchProjects() {
    try {
      setLoading(true)
      setError('')
      const data = await projectsApi.list()
      setProjects(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message || 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = {
      title: form.get('title')?.toString().trim(),
      year: Number(form.get('year')),
      teamMembers: form
        .get('teamMembers')
        ?.toString()
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean) || [],
      mentor: form.get('mentor')?.toString().trim(),
      category: form.get('category')?.toString() || undefined,
      link: form.get('link')?.toString().trim() || undefined,
    }
    if (!payload.title || !payload.year) return

    try {
      setLoading(true)
      await projectsApi.create(payload)
      event.currentTarget.reset()
      setFilter('All')
      await fetchProjects()
    } catch (e) {
      alert(e.message || 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return
    try {
      await projectsApi.remove(id)
      setProjects((prev) => prev.filter((p) => p._id !== id))
    } catch (e) {
      alert(e.message || 'Failed to delete project')
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Alumni Projects (Last 5 Years)</h1>
      </header>

      <section className="bg-white shadow rounded p-4">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" placeholder="Project title" className="border rounded px-3 py-2" required />
          <input name="year" type="number" placeholder="Year" className="border rounded px-3 py-2" required />
          <input name="teamMembers" placeholder="Team members (comma separated)" className="border rounded px-3 py-2 md:col-span-2" />
          <input name="mentor" placeholder="Mentor" className="border rounded px-3 py-2" />
          <select name="category" className="border rounded px-3 py-2">
            <option value="">Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input name="link" placeholder="Link (optional)" className="border rounded px-3 py-2" />
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
              disabled={loading}
            >
              Add Project
            </button>
            <button type="button" onClick={fetchProjects} className="border px-4 py-2 rounded">
              Refresh
            </button>
          </div>
        </form>
      </section>

      <section className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Filter by category:</span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded px-3 py-2">
          <option>All</option>
          {['Uncategorized', ...categories].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </section>

      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>Loading...</div>}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <article key={p._id} className="bg-white shadow rounded p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{p.title}</h3>
              <button onClick={() => handleDelete(p._id)} className="text-red-600 text-sm">
                Delete
              </button>
            </div>
            <div className="text-sm text-gray-600">Year: {p.year}</div>
            {p.mentor && <div className="text-sm">Mentor: {p.mentor}</div>}
            {Array.isArray(p.teamMembers) && p.teamMembers.length > 0 && (
              <div className="text-sm">Team: {p.teamMembers.join(', ')}</div>
            )}
            <div className="text-sm">Category: {p.category || 'Uncategorized'}</div>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View Project
              </a>
            )}
          </article>
        ))}
      </section>
    </div>
  )
}
