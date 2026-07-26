import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import api from "../services/api";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
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
        setJob(res.data.job);
      } catch (error) {
        console.error(error);
        setModal({
          isOpen: true,
          title: "Unable to load job",
          message: "We could not load this listing right now. Please try again shortly.",
          type: "error",
          actionLabel: "Go back",
          onAction: () => navigate("/jobs"),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  const openModal = (modalData) => setModal({ isOpen: true, ...modalData });
  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));



  const applyJob = async () => {
    if (!localStorage.getItem("token")) {
      openModal({
        title: "Login required",
        message: "Please sign in to apply for this position.",
        type: "info",
        actionLabel: "Go to login",
        onAction: () => {
          closeModal();
          navigate("/login");
        },
      });
      return;
    }

    try {
      setIsApplying(true);
      const res = await api.post(`/applications/${job.id}/apply`);
      openModal({
        title: "Application sent",
        message: res.data.message || "Your application was submitted successfully.",
        type: "success",
        actionLabel: "Continue",
        onAction: () => {
          closeModal();
          navigate("/jobs");
        },
      });
    } catch (err) {
      console.error(err);
      openModal({
        title: "Application failed",
        message: err.response?.data?.message || "We could not submit your application right now.",
        type: "error",
        actionLabel: "Try again",
        onAction: () => closeModal(),
      });
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-4xl border border-slate-200 bg-white/80 px-8 py-6 text-center shadow-lg backdrop-blur">
          <h2 className="text-2xl font-semibold text-slate-900">Loading opportunity details...</h2>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="rounded-4xl border border-rose-200 bg-white/80 px-8 py-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-rose-600">Job Not Found</h2>
          <button
            onClick={() => navigate("/jobs")}
            className="mt-6 rounded-full bg-linear-to-r from-indigo-600 to-fuchsia-600 px-6 py-3 font-semibold text-white"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-4xl border border-white/70 bg-white/80 p-8 shadow-2xl shadow-indigo-100/70 backdrop-blur-xl sm:p-10">
        <button
          onClick={() => navigate("/jobs")}
          className="mb-6 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Back to Jobs
        </button>

        <div className="rounded-3xl bg-linear-to-r from-indigo-600 to-fuchsia-600 p-6 text-white">
          <h1 className="text-3xl font-semibold sm:text-4xl">{job.title}</h1>
          <p className="mt-3 text-xl text-indigo-100">{job.company}</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">📍 Location</h3>
            <p className="mt-2 text-slate-600">{job.location}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">💰 Salary</h3>
            <p className="mt-2 text-slate-600">{job.salary || "Not Mentioned"}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">💼 Job Type</h3>
            <p className="mt-2 text-slate-600">{job.jobType || "Not Specified"}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900">⭐ Experience</h3>
          <p className="mt-2 text-slate-600">{job.experience || "Not Specified"}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-900">Job Description</h2>
          <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">{job.description}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={applyJob}
            disabled={isApplying}
            className="rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isApplying ? "Submitting..." : "Apply Now"}
          </button>

          <button
            onClick={() => navigate("/jobs")}
            className="rounded-full border border-slate-200 bg-white px-8 py-3 font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            Browse More Jobs
          </button>
        </div>
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