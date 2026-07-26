import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-2xl shadow-indigo-100/70 backdrop-blur-xl sm:p-12 lg:p-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              🚀 Premium hiring experience
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Discover your next career move with confidence.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              Explore handpicked roles, apply seamlessly, and grow your professional journey in one elegant workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/jobs"
                className="rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-7 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-90"
              >
                Browse Jobs
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-slate-200 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-900 p-6 text-white shadow-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-indigo-100">Active Opportunities</p>
                <p className="mt-2 text-3xl font-semibold">250+</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-indigo-100">Fast Applications</p>
                <p className="mt-2 text-3xl font-semibold">1 click</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur sm:col-span-2">
                <p className="text-sm text-indigo-100">Trusted by ambitious talent</p>
                <p className="mt-2 text-xl font-semibold">Launch your next chapter today.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}