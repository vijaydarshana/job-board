import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <span className="rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
            JB
          </span>
          <span>JobBoard Premium</span>
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link to="/" className="transition hover:text-indigo-600">Home</Link>
          <Link to="/jobs" className="transition hover:text-indigo-600">Jobs</Link>

          {token ? (
            <>
              <Link to="/create-job" className="transition hover:text-indigo-600">Post Job</Link>
              <Link to="/dashboard" className="transition hover:text-indigo-600">Dashboard</Link>
              <button
                onClick={logout}
                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-rose-600 transition hover:bg-rose-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="transition hover:text-indigo-600">Login</Link>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}