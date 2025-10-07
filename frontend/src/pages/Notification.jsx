import { useEffect, useState } from 'react'
import { notificationsApi } from '../lib/api'

export default function Notification() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchNotifications() {
    try {
      setLoading(true)
      setError('')
      const data = await notificationsApi.list()
      setNotifications(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message || 'Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = {
      title: form.get('title')?.toString().trim(),
      message: form.get('message')?.toString().trim(),
    }
    if (!payload.title || !payload.message) return

    try {
      setLoading(true)
      await notificationsApi.create(payload)
      event.currentTarget.reset()
      await fetchNotifications()
    } catch (e) {
      alert(e.message || 'Failed to send notification')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this notification?')) return
    try {
      await notificationsApi.remove(id)
      setNotifications((prev) => prev.filter((n) => n._id !== id))
    } catch (e) {
      alert(e.message || 'Failed to delete notification')
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notifications</h1>
      </header>

      <section className="bg-white shadow rounded p-4">
        <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4">
          <input name="title" placeholder="Title" className="border rounded px-3 py-2" required />
          <textarea name="message" placeholder="Message" className="border rounded px-3 py-2 h-28" required />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
              disabled={loading}
            >
              Send Notification
            </button>
            <button type="button" onClick={fetchNotifications} className="border px-4 py-2 rounded">
              Refresh
            </button>
          </div>
        </form>
      </section>

      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>Loading...</div>}

      <section className="space-y-3">
        {notifications.map((n) => (
          <article key={n._id} className="bg-white shadow rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{n.title}</h3>
                <div className="text-sm text-gray-600">
                  {n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}
                </div>
              </div>
              <button onClick={() => handleDelete(n._id)} className="text-red-600 text-sm">
                Delete
              </button>
            </div>
            <p className="text-gray-800 mt-2 whitespace-pre-wrap">{n.message}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
