import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    dispatch(logout());
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold mt-3">My Profile</h1>
          <p className="text-gray-500 text-sm">Account Information</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 border rounded-xl p-4">
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-semibold">{user?.name}</p>
          </div>

          <div className="bg-gray-50 border rounded-xl p-4">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
