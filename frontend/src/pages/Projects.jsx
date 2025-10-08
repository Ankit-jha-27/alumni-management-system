import { useEffect, useMemo, useState } from "react";
import { projectsApi } from "../lib/api";

const categories = [
  "AI",
  "Web",
  "Mobile",
  "Data Science",
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch projects from backend
  async function fetchProjects() {
    try {
      setLoading(true);
      setError("");
      const data = await projectsApi.list();
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects by category
  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter(
      (p) => (p.category || "Miscellaneous") === filter
    );
  }, [projects, filter]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Alumni Projects</h1>
        <button
          type="button"
          onClick={fetchProjects}
          className="border px-4 py-2 rounded"
          disabled={loading}
        >
          Refresh
        </button>
      </header>

      <section className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Filter by category:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>All</option>
          {["Miscellaneous", ...categories].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </section>

      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>Loading...</div>}

      {!loading && filtered.length === 0 && (
        <div className="text-gray-600">No projects found.</div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <article key={p._id} className="bg-white shadow rounded p-4 space-y-2">
            <h3 className="font-semibold">{p.title}</h3>
            <div className="text-sm text-gray-600">Year: {p.year}</div>
            {p.mentor && <div className="text-sm">Mentor: {p.mentor}</div>}
            {Array.isArray(p.teamMembers) && p.teamMembers.length > 0 && (
              <div className="text-sm">Team: {p.teamMembers.join(", ")}</div>
            )}
            <div className="text-sm">Category: {p.category || "Uncategorized"}</div>
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
  );
}
