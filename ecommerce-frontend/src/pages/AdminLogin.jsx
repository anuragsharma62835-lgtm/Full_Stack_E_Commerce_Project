import { useState } from "react";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { login } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/admin/login", formData);

      const adminData = data.data;

      localStorage.setItem("userInfo", JSON.stringify(adminData));

      dispatch(login(adminData));

      toast.success("Admin login successful 🎉");

      navigate("/admin/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Admin login failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800">
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h2>
          <p className="text-gray-500 text-sm">
            Access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading && <span className="animate-spin">⏳</span>}
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}