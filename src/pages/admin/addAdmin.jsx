import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AddAdminPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  async function handleCreateAdmin() {
    if (
      !newAdmin.firstName ||
      !newAdmin.lastName ||
      !newAdmin.email ||
      !newAdmin.password
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/user",
        { ...newAdmin, role: "admin" },
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success(res.data.message);
      navigate("/admin/users");
    } catch (error) {
      console.error("Create admin error:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to create admin");
    }
  }

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "#FDEFF4" }}
    >
      <div
        className="w-[520px] h-[520px] rounded-2xl shadow-xl flex flex-col items-center transition-all duration-300"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h1
          className="text-3xl font-bold m-[15px] tracking-wide mt-8"
          style={{ color: "#C85A87" }}
        >
          Create Admin
        </h1>

        {[
          {
            value: newAdmin.firstName,
            placeholder: "First Name",
            onChange: (e) =>
              setNewAdmin({ ...newAdmin, firstName: e.target.value }),
          },
          {
            value: newAdmin.lastName,
            placeholder: "Last Name",
            onChange: (e) =>
              setNewAdmin({ ...newAdmin, lastName: e.target.value }),
          },
          {
            value: newAdmin.email,
            placeholder: "Email",
            onChange: (e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value }),
          },
          {
            value: newAdmin.password,
            placeholder: "Password",
            type: "password",
            onChange: (e) =>
              setNewAdmin({ ...newAdmin, password: e.target.value }),
          },
        ].map((field) => (
          <input
            key={field.placeholder}
            {...field}
            className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
            style={{ borderColor: "#FFC0D3" }}
          />
        ))}

        <div className="w-[400px] h-[100px] flex justify-between items-center mt-6 mb-8">
          <Link
  to={"/admin/users"}
  className="p-[12px] w-[180px] text-center rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]"
  style={{ backgroundColor: "#FDEFF4", color: "#C85A87" }}
>
  Cancel
</Link>

<button
  onClick={handleCreateAdmin}
  className="p-[12px] w-[180px] text-center rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]"
  style={{ backgroundColor: "#FFC0D3", color: "#7A1F3D" }}
>
  Create Admin
</button>

        </div>
      </div>
    </div>
  );
}
