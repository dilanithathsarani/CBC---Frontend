import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import UserData from "./userData.jsx";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-[70px] w-full flex justify-start items-center bg-gradient-to-r from-[#FDEFF4] via-[#FFC0D3] to-[#FF5C8D] relative shadow-md">
      <GiHamburgerMenu
        className="lg:hidden text-3xl text-[#524A4E] mx-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />

      <div className="hidden lg:flex w-[500px] h-full items-center justify-evenly text-[#524A4E] text-xl font-semibold">
        <Link to="/" className="hover:text-[#FF5C8D] transition-colors">
          Home
        </Link>
        <Link to="/products" className="hover:text-[#FF5C8D] transition-colors">
          Products
        </Link>
        <Link to="/contact" className="hover:text-[#FF5C8D] transition-colors">
          Contact us
        </Link>
        <Link to="/reviews" className="hover:text-[#FF5C8D] transition-colors">
          Reviews
        </Link>

        <div className="absolute right-[70px] h-full">
          <UserData />
        </div>

        <Link
          to="/cart"
          className="absolute right-[40px] text-2xl text-[#524A4E] hover:text-[#FDEFF4] transition-colors"
        >
          <BsCart4 />
        </Link>
      </div>

      {isOpen && (
        <div className="fixed lg:hidden z-[9999] top-0 left-0 w-full h-screen bg-[#524A4E80] flex">
          <div className="w-[300px] h-full bg-[#FDEFF4] flex flex-col justify-start items-start p-4 shadow-lg relative">
            <AiOutlineClose
              className="text-3xl text-[#524A4E] mb-6 cursor-pointer absolute top-4 right-4"
              onClick={() => setIsOpen(false)}
            />

            <Link
              to="/"
              className="text-xl text-[#524A4E] my-4 hover:text-[#FF5C8D] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-xl text-[#524A4E] my-4 hover:text-[#FF5C8D] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-xl text-[#524A4E] my-4 hover:text-[#FF5C8D] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact us
            </Link>
            <Link
              to="/reviews"
              className="text-xl text-[#524A4E] my-4 hover:text-[#FF5C8D] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Reviews
            </Link>
            <Link
              to="/cart"
              className="text-xl text-[#524A4E] my-4 hover:text-[#FF5C8D] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>

            {/* Sign In / Sign Up Buttons for Mobile */}
            <div className="flex flex-col w-full mt-6 gap-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#FF5C8D] text-white py-2 rounded-full font-semibold hover:bg-[#FFC0D3] transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-white border border-[#FF5C8D] text-[#FF5C8D] py-2 rounded-full font-semibold hover:bg-[#FF5C8D] hover:text-white transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
