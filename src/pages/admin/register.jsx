import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "/register.jpg";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleRegister() {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/", payload)
      .then((response) => {
        console.log("Registration successful", response.data);
        toast.success("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Registration failed", error?.response?.data);
        toast.error(error?.response?.data?.message || "Registration failed");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gradient-to-l from-[#FDEBD0] via-[#F7CAC9] to-[#F75270] p-6">
        <div className="w-full max-w-md py-8 px-6 bg-transparent flex flex-col items-center rounded-2xl shadow-[0_0_20px_rgba(220,20,60,0.4)] 
                        backdrop-blur-lg">
          <h2 className="text-4xl font-bold text-[#DC143C] mb-6">Sign Up</h2>

          {["firstName", "lastName", "email", "phone", "password", "confirmPassword"].map((field, idx) => (
            <input
              key={idx}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
              placeholder={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              className="w-full p-3 mb-4 rounded-xl border border-[#F75270] bg-transparent text-[#333] placeholder-[#86003C] text-center focus:outline-none focus:ring-2 focus:ring-[#DC143C] transition-all"
            />
          ))}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full p-3 mb-3 mt-3 bg-[#DC143C] hover:bg-[#F75270] text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-[#333] text-center mt-2">
            Already have an account?{" "}
            <span className="text-[#F75270] hover:text-[#DC143C]">
              <Link to={"/login"}>Login Now</Link>
            </span>
          </p>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img
          src={registerImage}
          alt="Register"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
