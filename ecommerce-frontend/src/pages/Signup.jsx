import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, startLoading, stopLoading } from "../features/appSlice";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.app.user);
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    if (user) navigate("/profile");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(startLoading());

    try {
      const { data } = await API.post("/users/register", {
        name,
        email,
        password,
      });

      dispatch(login(data));

      toast.success("Signup successful 🎉");

      navigate("/profile");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error registering user"
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <button
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>
        <div>
          {/* <GoogleLogin /> */}
          <button
          type="button"
          onClick={() =>
            (window.location.href = "http://localhost:5000/api/users/google")
          }
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="google"
          />
          Signup with Google
        </button>
        </div>

        {/* Login Option */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}