import { useEffect, useMemo, useState } from "react";
import { alumniApi } from "../lib/api";

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
  "Zoho"

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
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Alumni Placement Details</h1>
        <button
          type="button"
          onClick={fetchAlumni}
          className="border px-4 py-2 rounded"
          disabled={loading}
        >
          Refresh
        </button>
      </header>

      <section className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Filter by placement:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>All</option>
          {["Unspecified", ...placementCategories].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </section>

      {error && <div className="text-red-600">{error}</div>}
      {loading && <div>Loading...</div>}

      {!loading && filtered.length === 0 && (
        <div className="text-gray-600">No alumni found.</div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a) => (
          <article key={a._id} className="bg-white shadow rounded p-4 space-y-1">
            <h3 className="font-semibold">{a.name}</h3>
            <div className="text-sm text-gray-600">{a.email}</div>
            {a.batch && <div className="text-sm">Batch: {a.batch}</div>}
            <div className="text-sm">Placement: {a.placement || "Unspecified"}</div>
          </article>
        ))}
      </section>
    </div>
  );
}
