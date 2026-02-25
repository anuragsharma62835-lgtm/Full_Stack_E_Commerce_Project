import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/appSlice";
import toast from "react-hot-toast";

export default function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      localStorage.setItem("token", token);

      dispatch(login({ name, email, token }));

      toast.success("Google login successful!");

      navigate("/", { replace: true });
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <div>Logging you in...</div>;
}