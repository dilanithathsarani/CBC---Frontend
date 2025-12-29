import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import loginImg from "/login.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (res) => {
      setLoadingGoogle(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
          accessToken: res.access_token,
        })
        .then((response) => {
          toast.success("Login successful");
          localStorage.setItem("token", response.data.token);

          const user = response.data.user;
          user.role === "admin" ? navigate("/admin") : navigate("/");
        })
        .catch(() => {
          toast.error("Google login failed");
        })
        .finally(() => setLoadingGoogle(false));
    },
    onError: () => {
      toast.error("Google login failed");
      setLoadingGoogle(false);
    },
  });

  function handleLogin() {
    setLoadingLogin(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email,
        password,
      })
      .then((response) => {
        toast.success("Login successful");
        localStorage.setItem("token", response.data.token);

        const user = response.data.user;
        user.role === "admin" ? navigate("/admin") : navigate("/");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Login failed");
      })
      .finally(() => setLoadingLogin(false));
  }

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img
          src={loginImg}
          alt="Login"
          className="w-full h-full object-cover shadow-inner"
        />
      </div>

      <div
        className="w-full md:w-1/2 flex justify-center items-center
                      bg-gradient-to-r from-[#FDEFF4] via-[#FFC0D3] to-[#FF5C8D] p-6"
      >
        <div
          className="w-full max-w-md py-8 px-6 bg-transparent flex flex-col items-center
                         rounded-2xl shadow-[0_0_20px_rgba(220,20,60,0.4)]
                        backdrop-blur-lg"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-[#DC143C]">
            Welcome Back
          </h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-[50px] border border-[#F75270] rounded-xl px-4 mb-4 bg-transparent text-[#333] placeholder-[#86003C] text-center focus:outline-none focus:ring-2 focus:ring-[#DC143C] transition-all"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full h-[50px] border border-[#F75270] rounded-xl px-4 mb-4 bg-transparent text-[#333] placeholder-[#86003C] text-center focus:outline-none focus:ring-2 focus:ring-[#DC143C] transition-all"
          />

          <button
            onClick={handleLogin}
            disabled={loadingLogin}
            className={`w-full h-[50px] text-white rounded-xl font-semibold transition-all ${
              loadingLogin
                ? "bg-[#FDEFF4] cursor-not-allowed"
                : "bg-[#DC143C] hover:bg-[#F75270]"
            }`}
          >
            {loadingLogin ? "Loading..." : "Login"}
          </button>

          <button
            onClick={loginWithGoogle}
            disabled={loadingGoogle}
            className={`w-full h-[50px] text-white rounded-xl mt-4 flex items-center justify-center gap-2 transition-all ${
              loadingGoogle
                ? "bg-[#FDEFF4] cursor-not-allowed"
                : "bg-[#F75270] hover:bg-[#DC143C]"
            }`}
          >
            <GrGoogle /> {loadingGoogle ? "Loading..." : "Login with Google"}
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#F75270] hover:text-[#DC143C]"
            >
              Register Now
            </Link>
          </p>

          <p className="text-center text-gray-600 mt-2">
            Forgot password?{" "}
            <Link to="/forget" className="text-[#F75270] hover:text-[#DC143C]">
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
