import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        alert("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());

      return matchesSearch && matchesLocation;
    });
  }, [jobs, search, location]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-3xl border border-slate-200 bg-white/80 px-8 py-6 text-center shadow-lg backdrop-blur">
          <h2 className="text-2xl font-semibold text-slate-900">Loading premium opportunities...</h2>
          <p className="mt-2 text-slate-600">Please wait while we load the latest roles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-2xl shadow-indigo-100/60 backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Curated roles</p>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Explore the best opportunities</h1>
            </div>
            <p className="max-w-xl text-sm text-slate-600">
              Filter by role, company, or location and discover positions designed for ambitious professionals.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Search by title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none ring-0 transition focus:border-indigo-400 focus:bg-white"
            />

            <input
              type="text"
              placeholder="Filter by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none ring-0 transition focus:border-indigo-400 focus:bg-white"
            />
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-8 py-16 text-center text-xl text-slate-500 shadow-sm">
            No jobs found. Try a broader search.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
                    {job.jobType || "Open"}
                  </span>
                  <span className="text-sm text-slate-500">{job.location}</span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold text-slate-900">{job.title}</h2>
                <p className="mt-2 font-semibold text-indigo-600">{job.company}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{job.description}</p>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <p>💰 {job.salary || "Not Mentioned"}</p>
                  <p>⭐ {job.experience || "Not Specified"}</p>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-center font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2.5 text-center font-medium text-white transition hover:opacity-90"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}