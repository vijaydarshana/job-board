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
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">Loading jobs...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Available Jobs
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Filter by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-lg p-3"
          />
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">
            No jobs found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-bold">{job.title}</h2>

                <p className="text-blue-600 font-semibold mt-2">
                  {job.company}
                </p>

                <p className="mt-3">📍 {job.location}</p>

                <p className="mt-2">
                  💰 {job.salary || "Not Mentioned"}
                </p>

                <p className="mt-2">
                  💼 {job.jobType || "Not Specified"}
                </p>

                <p className="mt-2">
                  ⭐ {job.experience || "Not Specified"}
                </p>

                <p className="mt-4 text-gray-600 line-clamp-3">
                  {job.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg"
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