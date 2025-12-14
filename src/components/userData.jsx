import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((e) => {
          console.log(e);
          setUser(null);
        });
    }
  }, []);

  const buttonStyle =
    "px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md";

  return (
    <>
      {user == null ? (
        <div className="h-full flex justify-center items-center flex-row gap-3">
          <Link
            to="/login"
            className={`${buttonStyle} bg-[#FDEFF4] text-[#524A4E] border border-[#FFC0D3] hover:bg-[#FFC0D3] hover:text-white`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`${buttonStyle} bg-[#FDEFF4] text-[#524A4E] border border-[#FFC0D3] hover:bg-[#FFC0D3] hover:text-white`}
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center flex-row">
          <button
            className={`${buttonStyle} bg-[#FDEFF4] text-[#524A4E] border border-[#FFC0D3] hover:bg-[#FFC0D3] hover:text-white`}
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              window.location = "/login";
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
