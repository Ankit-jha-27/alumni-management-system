import { useEffect, useMemo, useState } from 'react'
import { alumniApi } from '../lib/api'

const placementCategories = ['Higher Studies', 'Industry', 'Entrepreneurship', 'Government', 'Other']

export default function Alumni() {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return alumni
    return alumni.filter((a) => (a.placement || 'Unspecified') === filter)
  }, [alumni, filter])

  async function fetchAlumni() {
    try {
      setLoading(true)
      setError('')
      const data = await alumniApi.list()
      setAlumni(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message || 'Failed to load alumni')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = {
      name: form.get('name')?.toString().trim(),
      email: form.get('email')?.toString().trim(),
      batch: form.get('batch')?.toString().trim(),
      placement: form.get('placement')?.toString() || undefined,
    }
    if (!payload.name || !payload.email) return

    try {
      setLoading(true)
      await alumniApi.create(payload)
      event.currentTarget.reset()
      setFilter('All')
      await fetchAlumni()
    } catch (e) {
      alert(e.message || 'Failed to add alumni')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this alumni?')) return
    try {
      await alumniApi.remove(id)
      setAlumni((prev) => prev.filter((a) => a._id !== id))
    } catch (e) {
      alert(e.message || 'Failed to delete alumni')
    }
  }

  useEffect(() => {
    fetchAlumni()
  }, [])

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Alumni Placement Details</h1>
      </header>

      <section className="bg-white shadow rounded p-4">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" placeholder="Full name" className="border rounded px-3 py-2" required />
          <input name="email" type="email" placeholder="Email" className="border rounded px-3 py-2" required />
          <input name="batch" placeholder="Batch (e.g., 2020)" className="border rounded px-3 py-2" />
          <select name="placement" className="border rounded px-3 py-2">
            <option value="">Placement Category</option>
            {placementCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
              disabled={loading}
            >
              Add Alumni
            </button>
            <button type="button" onClick={fetchAlumni} className="border px-4 py-2 rounded">
              Refresh
            </button>
          </div>
        </form>
      </section>

      <section className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Filter by placement:</span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded px-3 py-2">
          <option>All</option>
          {['Unspecified', ...placementCategories].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </section>

      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>Loading...</div>}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a) => (
          <article key={a._id} className="bg-white shadow rounded p-4 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{a.name}</h3>
              <button onClick={() => handleDelete(a._id)} className="text-red-600 text-sm">
                Delete
              </button>
            </div>
            <div className="text-sm text-gray-600">{a.email}</div>
            {a.batch && <div className="text-sm">Batch: {a.batch}</div>}
            <div className="text-sm">Placement: {a.placement || 'Unspecified'}</div>
          </article>
        ))}
      </section>
    </div>
  )
}
