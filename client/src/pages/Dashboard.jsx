import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchMyJobs = async () => {
    try {
      const res = await api.get("/jobs");

      const token = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

      const myJobs = res.data.jobs.filter(
        (job) => job.userId === token.id
      );

      setJobs(myJobs);
    } catch (err) {
      console.error(err);
    }
  };
    fetchMyJobs();
  }, []);

  

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await api.delete(`/jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job.id !== id));

      alert("Job deleted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Jobs</h1>

          <Link
            to="/create-job"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            + Post Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <h2>No jobs posted yet.</h2>
        ) : (
          <div className="grid gap-5">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>

                <p>{job.company}</p>

                <p>{job.location}</p>

                <div className="flex gap-3 mt-5">

                  <Link
                    to={`/jobs/${job.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit-job/${job.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteJob(job.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}