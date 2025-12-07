import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import loginImg from "../assets/login.jpg"; 

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
		<div className="w-full h-screen flex bg-[#FDEBD0]">
			<div
				className="hidden md:block w-[50%] h-full bg-cover shadow-xl"
				style={{ backgroundImage: `url(${loginImg})` }}
			></div>

			<div className="w-full md:w-[50%] h-full flex justify-center items-center p-5">
				<div className="w-full max-w-[450px] bg-white shadow-2xl rounded-2xl p-8 border border-[#F7CAC9]">

					<h1 className="text-3xl font-bold text-center mb-6 text-[#DC143C]">
						Welcome Back
					</h1>

					<input
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
						className="w-full h-[50px] border border-[#F7CAC9] rounded-xl px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-[#F75270]"
					/>

					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
						className="w-full h-[50px] border border-[#F7CAC9] rounded-xl px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-[#F75270]"
					/>

					<button
						onClick={handleLogin}
						disabled={loadingLogin}
						className={`w-full h-[50px] text-white rounded-xl font-semibold transition-all ${
							loadingLogin
								? "bg-gray-400 cursor-not-allowed"
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
								? "bg-gray-400 cursor-not-allowed"
								: "bg-[#F75270] hover:bg-[#DC143C]"
						}`}
					>
						<GrGoogle /> {loadingGoogle ? "Loading..." : "Login with Google"}
					</button>
					
					<p className="text-center mt-6 text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="text-[#DC143C] hover:underline"
						>
							Register Now
						</Link>
					</p>

					<p className="text-center text-gray-600 mt-2">
						Forgot password?{" "}
						<Link
							to="/forget"
							className="text-[#DC143C] hover:underline"
						>
							Reset Password
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
