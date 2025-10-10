import { useEffect, useMemo, useState } from "react";
import { alumniApi } from "../lib/api";
import {RefreshCcw } from "lucide-react";

const placementCategories = [
  "TCS",
  "HCL Tech",
  "Wipro",
  "Infosys",
  "IBM",
  "Microsoft",
  "Amazon",
  "Google",
  "Oracle",
  "Accenture",
  "Capgemini",
  "Cognizant",
  "Zoho",
];

export default function Alumni() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return alumni;
    return alumni.filter((a) => (a.placement || "Unspecified") === filter);
  }, [alumni, filter]);

  async function fetchAlumni() {
    try {
      setLoading(true);
      setError("");
      const data = await alumniApi.list();
      setAlumni(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load alumni");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlumni();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-blue-700">Alumni Placement Details</h1>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option>All</option>
            {["Unspecified", ...placementCategories].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={fetchAlumni}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all disabled:opacity-50"
          >
            <RefreshCcw size={16} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</div>
      )}

   

      
      {!loading && filtered.length === 0 && !error && (
        <div className="text-center text-gray-600 py-10">
          <p className="text-lg">No alumni found.</p>
          <p className="text-sm">Try changing the placement filter or refresh.</p>
        </div>
      )}

      {/* Alumni Cards */}
      {!loading && filtered.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6">
          {filtered.map((a) => (
            <article
              key={a._id}
              className="bg-white shadow rounded-xl p-5 w-72 flex flex-col justify-between hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-1">{a.name}</h3>
                <p className="text-sm text-gray-600">{a.email}</p>
                {a.batch && <p className="text-sm text-gray-600">Batch: {a.batch}</p>}
                <p className="text-sm text-gray-600">Placement: {a.placement || "Unspecified"}</p>
              </div>

        
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
