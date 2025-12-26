import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/all", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          setUsers(res.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Fetch users error:", error.response || error);
          toast.error("Failed to load users");
          setLoaded(true);
        });
    }
  }, [loaded]);

  const toggleStatus = (id) => {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/user/toggle/" + id,
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(() => {
        setUsers(
          users.map((u) =>
            u._id === id ? { ...u, isDisabled: !u.isDisabled } : u
          )
        );
        toast.success("User status updated");
      })
      .catch((error) => {
        console.error("Toggle status error:", error.response || error);
        toast.error("Error toggling user status");
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/user/" + id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        setUsers(users.filter((u) => u._id !== id));
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        console.error("Delete user error:", error.response || error);
        toast.error("Error deleting user");
      });
  };

  const filteredUsers = users.filter((user) =>
    (user.firstName + " " + user.lastName + " " + user.email)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full rounded-lg relative p-6" style={{ backgroundColor: "#FDEFF4" }}>
      <h1 className="text-3xl font-bold mb-6 text-[#524A4E]">
        👤 Manage Users
      </h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search users..."
          className="border border-[#FFC0D3] px-4 py-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-[#FF5C8D]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <span className="text-[#524A4E] font-medium">
            Total: {filteredUsers.length}
          </span>
          <button
            onClick={() => navigate("/admin/addAdmin")}
            className="bg-[#FF5C8D] text-white px-4 py-2 rounded hover:bg-[#FFC0D3] hover:text-[#524A4E] transition inline-block"
          >
            Add Admin
          </button>
        </div>
      </div>

      {loaded ? (
        <div className="rounded-lg bg-white shadow-lg border border-[#FFC0D3] pb-4">
          <div className="max-h-[65vh] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead
              className="sticky top-0 z-10"
              style={{ backgroundColor: "#FFC0D3" }}
            >
              <tr
                className="text-gray-800"
                style={{ backgroundColor: "#FFC0D3" }}
              >
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Verified</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <tr
                  key={user._id}
                  className="text-center border-b cursor-pointer"
                  style={{ borderColor: "#FFC0D3" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#FFF7FA")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td className="p-3">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    {user.isEmailVerified ? (
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-semibold">
                        ✔ Verified
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-600">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {user.isDisabled ? (
                      <span className="px-2 py-1 rounded bg-red-100 text-[#FF5C8D] font-semibold">
                        Disabled
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="w-full h-full flex justify-center">
                      <FaRegTrashAlt
                        onClick={() => deleteUser(user._id)}
                        className="text-[22px] m-[10px] cursor-pointer"
                        style={{ color: "#C0392B" }}
                      />
                      
                      <MdOutlineModeEdit
                        onClick={() => toggleStatus(user._id)}
                        className="text-[22px] m-[10px] cursor-pointer"
                        style={{ color: "#6D214F" }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
