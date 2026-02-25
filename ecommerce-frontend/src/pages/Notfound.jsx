import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        404
      </h1>

      <p className="text-lg text-gray-600 mt-4 mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}