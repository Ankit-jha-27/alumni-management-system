import { useEffect, useMemo, useState } from 'react'
import { eventsApi } from '../lib/api'

const eventCategories = ['Technical Talk', 'Workshop', 'Meetup', 'Seminar', 'Other']

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return events
    return events.filter((e) => (e.category || 'Uncategorized') === filter)
  }, [events, filter])

  async function fetchEvents() {
    try {
      setLoading(true)
      setError('')
      const data = await eventsApi.list()
      setEvents(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message || 'Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = {
      title: form.get('title')?.toString().trim(),
      description: form.get('description')?.toString().trim() || undefined,
      date: new Date(form.get('date')?.toString()),
      category: form.get('category')?.toString() || undefined,
      speakers: form
        .get('speakers')
        ?.toString()
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean) || [],
      venue: form.get('venue')?.toString().trim() || undefined,
    }
    if (!payload.title || !payload.date) return

    try {
      setLoading(true)
      await eventsApi.create(payload)
      event.currentTarget.reset()
      setFilter('All')
      await fetchEvents()
    } catch (e) {
      alert(e.message || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this event?')) return
    try {
      await eventsApi.remove(id)
      setEvents((prev) => prev.filter((e) => e._id !== id))
    } catch (e) {
      alert(e.message || 'Failed to delete event')
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Alumni Events Scheduling</h1>
      </header>

      <section className="bg-white shadow rounded p-4">
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" placeholder="Event title" className="border rounded px-3 py-2" required />
          <input name="date" type="datetime-local" className="border rounded px-3 py-2" required />
          <input name="description" placeholder="Description" className="border rounded px-3 py-2 md:col-span-2" />
          <input name="speakers" placeholder="Speakers (comma separated)" className="border rounded px-3 py-2 md:col-span-2" />
          <input name="venue" placeholder="Venue" className="border rounded px-3 py-2" />
          <select name="category" className="border rounded px-3 py-2">
            <option value="">Category</option>
            {eventCategories.map((c) => (
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
              Add Event
            </button>
            <button type="button" onClick={fetchEvents} className="border px-4 py-2 rounded">
              Refresh
            </button>
          </div>
        </form>
      </section>

      <section className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Filter by category:</span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded px-3 py-2">
          <option>All</option>
          {['Uncategorized', ...eventCategories].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </section>

      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>Loading...</div>}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((e) => (
          <article key={e._id} className="bg-white shadow rounded p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{e.title}</h3>
              <button onClick={() => handleDelete(e._id)} className="text-red-600 text-sm">
                Delete
              </button>
            </div>
            <div className="text-sm text-gray-600">{new Date(e.date).toLocaleString()}</div>
            {e.venue && <div className="text-sm">Venue: {e.venue}</div>}
            {Array.isArray(e.speakers) && e.speakers.length > 0 && (
              <div className="text-sm">Speakers: {e.speakers.join(', ')}</div>
            )}
            <div className="text-sm">Category: {e.category || 'Uncategorized'}</div>
            {e.description && <p className="text-sm text-gray-700">{e.description}</p>}
          </article>
        ))}
      </section>
    </div>
  )
}
