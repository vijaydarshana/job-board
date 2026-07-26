import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data.job);
    } catch (error) {
      console.error(error);
      alert("Failed to load job details.");
    } finally {
      setLoading(false);
    }
  };
    fetchJob();
  }, [id]);



  const applyJob = async () => {
    try {
      const res = await api.post(`/applications/${job.id}/apply`);

      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Application failed.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-3xl font-bold text-red-600">
          Job Not Found
        </h2>

        <button
          onClick={() => navigate("/jobs")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <button
          onClick={() => navigate("/jobs")}
          className="mb-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          ← Back to Jobs
        </button>

        <h1 className="text-4xl font-bold">
          {job.title}
        </h1>

        <p className="text-2xl text-blue-600 mt-2">
          {job.company}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">📍 Location</h3>
            <p className="mt-2">{job.location}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">💰 Salary</h3>
            <p className="mt-2">
              {job.salary || "Not Mentioned"}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">💼 Job Type</h3>
            <p className="mt-2">
              {job.jobType || "Not Specified"}
            </p>
          </div>

        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">⭐ Experience</h3>
          <p className="mt-2">
            {job.experience || "Not Specified"}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">
            Job Description
          </h2>

          <p className="leading-7 text-gray-700 whitespace-pre-line">
            {job.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">

          <button
            onClick={applyJob}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
          >
            Apply Now
          </button>

          <button
            onClick={() => navigate("/jobs")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-lg"
          >
            Browse More Jobs
          </button>

        </div>

      </div>
    </div>
  );
}