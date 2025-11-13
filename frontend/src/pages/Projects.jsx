
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsApi } from "../lib/api";
import { RefreshCcw } from "lucide-react";
const categories = ["AI", "Web", "Mobile", "Data Science", "ML", "Cyber Security"];

export default function Projects(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const domainFilter = props.domainFilter || null;

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

  const filtered = useMemo(() => {
    if (domainFilter) {
      return projects.filter((p) => (p.category || "Miscellaneous") === domainFilter);
    }
    if (filter === "All") return projects;
    return projects.filter((p) => (p.category || "Miscellaneous") === filter);
  }, [projects, filter, domainFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-3xl font-bold text-blue-700">
          Alumni Projects
        </h1>

        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 bg-white text-gray-800 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option>All</option>
            {["Miscellaneous", ...categories].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={fetchProjects}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all disabled:opacity-50"
          >
            <RefreshCcw size={16} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>

          {/* Domain pages navigation */}
          {categories.map((domain) => (
            <button
              key={domain}
              onClick={() => navigate(`/projects/${domain.toLowerCase().replace(/\s+/g, "-")}`)}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow hover:scale-105 transition-all"
            >
              {domain}
            </button>
          ))}
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="text-red-600 bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

     

      {/* Empty State */}
      {!loading && filtered.length === 0 && !error && (
        <div className="text-center text-gray-600 py-10">
          <p className="text-lg">No projects found.</p>
          <p className="text-sm">Try changing the category filter or refresh.</p>
        </div>
      )}

      {/* Project List*/}
      {!loading && filtered.length > 0 && (
        <section className="flex flex-wrap justify-center gap-8">
          {filtered.map((p) => (
            <article
              key={p._id}
              className="bg-gradient-to-br from-blue-50 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl hover:shadow-cyan-400/40 transition-transform transform hover:-translate-y-2 p-6 border border-blue-200 dark:border-gray-700 w-80 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-xl text-blue-700 dark:text-cyan-300 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-semibold">Category:</span> {p.category || "Uncategorized"}
                </p>
                {p.year && (
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Year:</span> <span className="font-medium">{p.year}</span>
                  </p>
                )}
                {p.mentor && (
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Mentor:</span> {p.mentor}
                  </p>
                )}
                {Array.isArray(p.teamMembers) && p.teamMembers.length > 0 && (
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Team:</span> {p.teamMembers.join(", ")}
                  </p>
                )}
              </div>

              {p.link && (
                <a
                  href={p.link}
                  className="mt-4 inline-block text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-bold px-5 py-2 rounded-xl shadow-lg transition-all"
                  target="_blank" rel="noopener noreferrer"
                >
                  View Project
                </a>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
