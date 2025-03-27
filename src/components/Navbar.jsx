

import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
//import { useEffect, useState } from "react";

import { useContext, useState } from "react";


const Navbar = () => {
  const navigate = useNavigate();


   const {token,setToken,userData } = useContext(AppContext)
  const [shoMenu, setShoMenu] = useState(false)


  const logout = () => {
    setToken('false')
    localStorage.removeItem('token')
    
  }

  // const token = localStorage.getItem("token");





  // // State for token and profile image
  // const [tokenData, setTokenData] = useState(null);
  // const [profileImage, setProfileImage] = useState(uploadarea);

  // useEffect(() => {
  //   if (token) {
  //     setTokenData(token);

  //     // Retrieve user profile from localStorage
  //     try {
  //       const userProfile = JSON.parse(localStorage.getItem("userprofile"));
  //       if (userProfile && userProfile.image) {
  //         setProfileImage(userProfile.image);
  //       }
  //     } catch (error) {
  //       console.error("Error parsing user profile from localStorage", error);
  //     }
  //   }
  // }, [token]);
  

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userprofile"); // Optional, if you want to clear profile on logout
  //   setTokenData(null);
  //   setProfileImage(uploadarea); // Reset to default on logout
  //   navigate("/login");
  // };

  return (
    <div className="flex items-center justify-between text-sm my-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {
        token && userData
         ? 

          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 h-8 rounded-full" src={userData.image} alt="Profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">My Appointment</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        : 
          
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        }
      </div>
    </div>
  );
};

export default Navbar;
