import { useEffect, useMemo, useState } from "react";
import { projectsApi } from "../lib/api";
import { RefreshCcw } from "lucide-react";

const categories = ["AI", "Web", "Mobile", "Data Science"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

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
    if (filter === "All") return projects;
    return projects.filter((p) => (p.category || "Miscellaneous") === filter);
  }, [projects, filter]);

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
            className="border border-gray-300 bg-white text-gray-800 rounded-lg px-3 py-2 focus:ring-2 
                       focus:ring-blue-500 transition-all"
          >
            <option>All</option>
            {["Miscellaneous", ...categories].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={fetchProjects}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 
                       rounded-lg shadow-md transition-all disabled:opacity-50"
          >
            <RefreshCcw size={16} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
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
        <section className="flex flex-wrap justify-center gap-6">
          {filtered.map((p) => (
            <article
              key={p._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 
                         p-5 border border-gray-300 w-72 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Category: {p.category || "Uncategorized"}
                </p>
                {p.year && (
                  <p className="text-sm text-gray-700">
                    Year: <span className="font-medium">{p.year}</span>
                  </p>
                )}
                {p.mentor && (
                  <p className="text-sm text-gray-700">
                    Mentor: {p.mentor}
                  </p>
                )}
                {Array.isArray(p.teamMembers) && p.teamMembers.length > 0 && (
                  <p className="text-sm text-gray-700">
                    Team: {p.teamMembers.join(", ")}
                  </p>
                )}
              </div>

              {p.link && (
                <a
                  href={p.link}
                  className="mt-4 inline-block text-center bg-blue-600 hover:bg-blue-700 
                             text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition-all"
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
