import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function sendEmail() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail", { email })
      .then((response) => {
        console.log(response.data);
        setEmailSent(true);
        toast.success("Email sent successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  }

  function changePassword() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/changePW", {
        email,
        otp,
        password,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Password changed successfully");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
        window.location.reload();
      });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center
                    bg-gradient-to-r from-[#FDEFF4] via-[#FFC0D3] to-[#FF5C8D] p-6">
      <div className="w-full max-w-md py-8 px-6 bg-transparent flex flex-col items-center
                      border-2 border-[#DC143C] rounded-2xl shadow-[0_0_20px_rgba(220,20,60,0.4)]
                      backdrop-blur-lg">
        {!emailSent ? (
          <>
            <h1 className="text-3xl font-bold text-[#DC143C] mb-6">Forget Password</h1>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-[#86003C] mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#F75270] bg-transparent text-[#333] placeholder-[#86003C] focus:outline-none focus:ring-2 focus:ring-[#DC143C] text-center"
              />
            </div>
            <button
              onClick={sendEmail}
              className="w-full p-3 mt-2 bg-[#DC143C] hover:bg-[#F75270] text-white font-semibold rounded-xl transition-all duration-300"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[#DC143C] mb-6">Reset Password</h1>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-[#86003C] mb-1">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#F75270] bg-transparent text-[#333] placeholder-[#86003C] focus:outline-none focus:ring-2 focus:ring-[#DC143C] text-center"
              />
            </div>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-[#86003C] mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#F75270] bg-transparent text-[#333] placeholder-[#86003C] focus:outline-none focus:ring-2 focus:ring-[#DC143C] text-center"
              />
            </div>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-[#86003C] mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#F75270] bg-transparent text-[#333] placeholder-[#86003C] focus:outline-none focus:ring-2 focus:ring-[#DC143C] text-center"
              />
            </div>
            <button
              onClick={changePassword}
              className="w-full p-3 mt-2 bg-[#DC143C] hover:bg-[#F75270] text-white font-semibold rounded-xl transition-all duration-300"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
