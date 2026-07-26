import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">
          Find Your Dream Job
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Search thousands of jobs from top companies.
        </p>

        <Link
          to="/jobs"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}