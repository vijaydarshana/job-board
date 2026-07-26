import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
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
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    actionLabel: "Close",
    onAction: null,
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        const { title, company, location, description, salary, jobType, experience } = res.data.job;

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
  }, [id]);

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

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
      setModal({
        isOpen: true,
        title: "Job updated",
        message: "Your changes were saved successfully.",
        type: "success",
        actionLabel: "Go to dashboard",
        onAction: () => {
          closeModal();
          navigate("/dashboard");
        },
      });
    } catch (err) {
      console.error(err);
      setModal({
        isOpen: true,
        title: "Update failed",
        message: err.response?.data?.message || "Update failed.",
        type: "error",
        actionLabel: "Try again",
        onAction: () => closeModal(),
      });
    }
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-2xl shadow-indigo-100/70 backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Update listing</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Edit job details</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white" />
          <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white" />
          <input name="salary" value={form.salary || ""} onChange={handleChange} placeholder="Salary" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input name="jobType" value={form.jobType || ""} onChange={handleChange} placeholder="Job Type" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white" />
          <input name="experience" value={form.experience || ""} onChange={handleChange} placeholder="Experience" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white" />
        </div>

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows="6" className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:bg-white" />

        <button type="submit" className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-3 font-semibold text-white transition hover:opacity-90">
          Update Job
        </button>
      </form>

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