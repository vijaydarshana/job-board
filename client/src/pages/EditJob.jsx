import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    description: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
     const {
  title,
  company,
  location,
  description,
  salary,
  jobType,
  experience,
} = res.data.job;

setForm({
  title,
  company,
  location,
  description,
  salary: salary || "",
  jobType: jobType || "",
  experience: experience || "",
}); 
    } catch (err) {
      console.error(err);
      alert("Failed to load job.");
    }
  };
    fetchJob();
  }, []);

  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/jobs/${id}`, form);

      alert("Job updated successfully.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold mb-6">Edit Job</h1>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          name="salary"
          value={form.salary || ""}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          name="jobType"
          value={form.jobType || ""}
          onChange={handleChange}
          placeholder="Job Type"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          name="experience"
          value={form.experience || ""}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full border p-3 rounded mb-4"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows="6"
          className="w-full border p-3 rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}