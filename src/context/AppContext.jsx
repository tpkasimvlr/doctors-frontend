/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  //const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  console.log("profile data",userData);
  

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
        console.log("Fetched Doctors Data:", data); 

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/get-profile",
        { headers: { token } }
      );

      

      if (data.success) {
        setUserData(data.userData);

        //console.log(data.useState);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const value = {
    doctors,getDoctorsData,
    currencySymbol,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
