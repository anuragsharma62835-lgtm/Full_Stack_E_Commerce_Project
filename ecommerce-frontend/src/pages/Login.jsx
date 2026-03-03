import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, startLoading, stopLoading } from "../features/appSlice";
import API from "../api/axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.app.user);
  const loading = useSelector((state) => state.app.loading);

  const location = useLocation();

  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from?.pathname || "/profile";
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(startLoading());

    try {
      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      const token = data.details.token;

      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(data.details));

      dispatch(login(data.details));

      toast.success("Login successful");

      navigate("/profile");
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid email or password";

      toast.error(message);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg hover:scale-105 transition disabled:opacity-50"
          >
            {loading && <span className="animate-spin">⏳</span>}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div>
          {/* <GoogleLogin /> */}
          <button
            type="button"
            onClick={() =>
              (window.location.href =
                // window.location.hostname === "localhost"
                // ? "http://localhost:5000/api/users/google"
                // :
                "https://full-stack-e-commerce-project-w8nn.onrender.com/api/users/google")
            }
            className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
          >
            <img
              className="h-4 w-4"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
              alt="google"
            />
            Log in with Google
          </button>
        </div>

        {/* Signup Option */}
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
