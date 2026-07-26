import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    jobType: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/jobs", formData);

      alert(response.data.message);

      navigate("/jobs");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Post a New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="w-full border rounded-lg p-3"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            className="w-full border rounded-lg p-3"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full border rounded-lg p-3"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            className="w-full border rounded-lg p-3"
            value={formData.salary}
            onChange={handleChange}
          />

          <select
            name="jobType"
            className="w-full border rounded-lg p-3"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="">Select Job Type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            className="w-full border rounded-lg p-3"
            value={formData.experience}
            onChange={handleChange}
          />

          <textarea
            name="description"
            rows="5"
            placeholder="Job Description"
            className="w-full border rounded-lg p-3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>

        </form>
      </div>
    </div>
  );
}