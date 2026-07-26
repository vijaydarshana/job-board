import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
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
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    actionLabel: "Close",
    onAction: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/jobs", formData);
      setModal({
        isOpen: true,
        title: "Job created",
        message: response.data.message || "Your job posting was created successfully.",
        type: "success",
        actionLabel: "View jobs",
        onAction: () => {
          closeModal();
          navigate("/jobs");
        },
      });
    } catch (error) {
      console.error(error);
      setModal({
        isOpen: true,
        title: "Creation failed",
        message: error.response?.data?.message || "Failed to create job",
        type: "error",
        actionLabel: "Try again",
        onAction: () => closeModal(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-2xl shadow-indigo-100/70 backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Recruitment suite</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Post a new job opening</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="salary"
              placeholder="Salary"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white"
              value={formData.salary}
              onChange={handleChange}
            />

            <select
              name="jobType"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="">Select Job Type</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white"
            value={formData.experience}
            onChange={handleChange}
          />

          <textarea
            name="description"
            rows="5"
            placeholder="Job Description"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        actionLabel={modal.actionLabel}
        onAction={modal.onAction}
        onClose={closeModal}
      />
    </div>
  );
}