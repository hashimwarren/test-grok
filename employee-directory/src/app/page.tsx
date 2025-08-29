"use client";
import { useEffect, useMemo, useState } from "react";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  department: string;
  phone?: string | null;
  location?: string | null;
  imageUrl?: string | null;
};

export default function Home() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Employee[]>([]);

  const load = async (query?: string) => {
    setLoading(true);
    try {
      const url = query ? `/api/employees?q=${encodeURIComponent(query)}` : "/api/employees";
      const res = await fetch(url);
      const d = await res.json();
      setData(d);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => data, [data]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Employee Directory</h1>
        <a href="/admin" className="text-sm underline">Admin</a>
      </div>
      <div className="flex items-center gap-3">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Search name, email, title, department..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") load(q);
          }}
        />
        <button
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          disabled={loading}
          onClick={() => load(q)}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((e) => (
          <div key={e.id} className="border rounded p-4 space-y-1">
            <div className="font-medium">
              {e.firstName} {e.lastName}
            </div>
            <div className="text-sm text-gray-700">{e.title}</div>
            <div className="text-sm text-gray-700">{e.department}</div>
            <div className="text-sm text-gray-700">{e.email}</div>
            {e.phone && <div className="text-sm text-gray-700">{e.phone}</div>}
            {e.location && <div className="text-sm text-gray-700">{e.location}</div>}
          </div>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <div className="text-sm text-gray-600">No employees found.</div>
      )}
    </div>
  );
}
