import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.app.user);
  const savedUser = localStorage.getItem("userInfo");

  useEffect(() => {
    if (!user && !savedUser) {
      toast.error("Please login first");
    }
  }, []);

  if (!user && !savedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
