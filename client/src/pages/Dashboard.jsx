import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import api from "../services/api";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    actionLabel: "Close",
    onAction: null,
  });

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await api.get("/jobs");
        const token = localStorage.getItem("token");

        if (!token) return;

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const myJobs = res.data.jobs.filter((job) => job.userId === decodedToken.id);

        setJobs(myJobs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyJobs();
  }, []);

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  const deleteJob = async (id) => {
    setModal({
      isOpen: true,
      title: "Delete this job?",
      message: "This action cannot be undone.",
      type: "info",
      actionLabel: "Delete",
      onAction: async () => {
        closeModal();
        try {
          await api.delete(`/jobs/${id}`);
          setJobs((prev) => prev.filter((job) => job.id !== id));
          setModal({
            isOpen: true,
            title: "Job deleted",
            message: "The listing was removed successfully.",
            type: "success",
            actionLabel: "Close",
            onAction: () => closeModal(),
          });
        } catch (err) {
          setModal({
            isOpen: true,
            title: "Delete failed",
            message: err.response?.data?.message || "Delete failed.",
            type: "error",
            actionLabel: "Try again",
            onAction: () => closeModal(),
          });
        }
      },
    });
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-4xl border border-white/70 bg-white/80 p-8 shadow-2xl shadow-indigo-100/70 backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Dashboard</p>
            <h1 className="text-3xl font-bold text-slate-900">My posted jobs</h1>
          </div>

          <Link
            to="/create-job"
            className="rounded-full bg-linear-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20"
          >
            + Post Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-12 text-center text-slate-500">
            No jobs posted yet. Start by creating your first listing.
          </div>
        ) : (
          <div className="grid gap-5">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{job.title}</h2>
                    <p className="mt-1 text-slate-600">{job.company} • {job.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/jobs/${job.id}`} className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-200">View</Link>
                    <Link to={`/edit-job/${job.id}`} className="rounded-full bg-amber-500 px-4 py-2 font-medium text-white transition hover:bg-amber-600">Edit</Link>
                    <button onClick={() => deleteJob(job.id)} className="rounded-full bg-rose-600 px-4 py-2 font-medium text-white transition hover:bg-rose-700">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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