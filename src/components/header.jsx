import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import UserData from "./userData.jsx";

export default function Header() {
  const[isOpen, setIsOpen] = useState(false);
  return (
    <header className="h-[70px] w-full flex justify-start items-center bg-gray-100 relative">
      <GiHamburgerMenu className="lg:hidden text-3xl text-accent mx-4" onClick={
        ()=>{
          setIsOpen(true)
        }
      }/>
        <div className="hidden lg:flex w-[500px] h-full items-center justify-evenly text-pink-400 text-xl">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/contact">Contact us</Link>
      <Link to="/reviews">Reviews</Link>
      <div className="absolute right-[70px] h-full">
        <UserData/>
      </div>
      <Link to="/cart" className="absolute right-[40px] text-2xl"><BsCart4 /></Link>
        </div>
      
       {
                isOpen&&(
                    <div className="fixed lg:hidden z-[9999] top-0 left-0 bg-[#00000060] w-full h-screen flex">
                        <div className="w-[300px] h-full bg-white  flex flex-col justify-start items-start p-4">
                            <GiHamburgerMenu className="text-3xl text-accent" onClick={()=>setIsOpen(false)} />
                            <Link to="/" className="text-xl text-accent my-4">Home</Link>
                            <Link to="/products" className="text-xl text-accent my-4">Products</Link>
                            <Link to="/contact" className="text-xl text-accent my-4">Contact us</Link>
                            <Link to="/reviews" className="text-xl text-accent my-4">Reviews</Link>
                            <Link to="/cart" className="text-xl text-accent my-4">Cart</Link>
                        </div>

                    </div>
                )
            }
        
    </header>
     
  );
}