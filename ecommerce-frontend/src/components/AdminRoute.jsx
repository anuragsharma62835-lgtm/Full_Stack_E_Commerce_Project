import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const user = useSelector((state) => state.app.user);

  if (!user?.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  } else {
    return children;
  }
}
