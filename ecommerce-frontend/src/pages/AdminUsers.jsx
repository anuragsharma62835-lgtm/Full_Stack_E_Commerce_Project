import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await API.get("/users/admin");
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      toast.success("User deleted", { id: "toast" });
      fetchUsers();
    } catch (error) {
      toast.error(error?.message || "Error deleting user", { id: "toast" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">All Users</h1>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full">

            <thead className="bg-gray-50 text-sm uppercase text-gray-600">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">

                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">{user.email}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isAdmin
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}