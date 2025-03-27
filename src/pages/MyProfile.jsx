import { useState } from "react";
import uploadarea from "../assets/upload_area.png";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";



const MyProfile = () => {

    
 const {userData, setUserData, token, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {

    try {
       const fromData = new FormData()

       fromData.append('name',userData.name)
       fromData.append('phone',userData.phone)
       fromData.append('address',JSON.stringify(userData.address))
       fromData.append('gender',userData.gender)
       fromData.append('dob',userData.dob)

      image && fromData.append('image',image)  


      const {data} = await axios.post('http://localhost:4000/api/user/update-profile ', fromData,   
         {headers:{token}})

         
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
        
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  }
  // let storeData = {};
  // try {
  //   storeData = JSON.parse(localStorage.getItem("userprofile")) || {};
  // } catch (error) {
  //   console.error("Error parsing user profile from localStorage", error);
  // }

  // State for user data
  // const [userData, setUserData] = useState(() => ({
  //   name: storeData.name || "",
  //   email: storeData.email || "",
  //   image: storeData.image || assets.profile_pic, // Fixed: lowercase "image"
  //   Phone: storeData.phone || "+910000000",
  //   address: storeData.address || {
  //     line1: "Address 1",
  //     line2: "Address 2",
  //   },
  //   gender: storeData.gender || "select",
  //   dob: storeData.dob || "2000-01-20",
  // }));

  // const [isEdit, setIsEdit] = useState(false);

  // // Fetch profile from API on mount

  // const fetchProfile = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       console.error("No token found, skipping profile fetch");
  //       return;
  //     }

  //     const response = await fetch("http://localhost:4000/api/user/find/profile", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user data");
  //     }

  //     const data = await response.json();

  //        if (!data || typeof data !== "object") {
  //   throw new Error("Invalid user data format");
  // }

  //     setUserData((prev) => ({
  //       ...prev,
  //       name: data.name || prev.name,
  //       email: data.email || prev.email,
  //       image: data.image || prev.image,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
  //   }
  // };

  // useEffect(() => {
  
  //   fetchProfile();
  // }, []);

  // // Save user data to localStorage when it changes
  // useEffect(() => {
  //   localStorage.setItem("userprofile", JSON.stringify(userData));
  // }, [userData]);

  // Image Upload Handler
  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("photo", file);

  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         console.error("No token found. User might not be logged in.");
  //         return;
  //       }
        
  //       const response = await fetch("http://localhost:4000/api/user/profile-image/update", {
  //         method: "PUT",
  //         headers: { Authorization: `Bearer ${token}` },
  //         body: formData,
  //       });

  //       const result = await response.json();
  //       console.log("Upload result:", result); 
  //       // Debugging
  //      // (result.success && result.image_url)
  //       if (response.ok && result.success)  {

  //         fetchProfile()
        
  //       } else {
  //         console.error("Error updating profile picture:", result.message);
  //       }
  //     } catch (error) {
  //       console.error("Error uploading image:", error.message);
  //     }
  //   }
  // };

  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {/* ------Profile Photo Upload------ */}
     
    
    {isEdit ?
         <label htmlFor="image"> 
        <div className="inline-block relative cursor-pointer">
          <img className="w-36 rounded " src={image ? URL.createObjectURL(image) : userData.image} alt="" />
          <img className="w-36 absolute top-[14px] -right-[147px]  " src={image ? '' : uploadarea} alt="" />
        </div>

        <input onChange={(e)=> setImage(e.target.files[0])}  type="file"  id="image" hidden />~

       </label>
         :<img  className="w-36 " src={userData.image  } alt="Profile"  />
      }
     
    
    
      {/* ------User Info------ */}
      {isEdit ?  
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
        />
       : 
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
    }

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* ------Contact Info------ */}
      <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="font-medium">Email id:</p>
        <p className="text-blue-500">{userData.email}</p>

        <p className="font-medium">Phone :</p>
        {isEdit ? 
          <input
            className="bg-gray-100 max-w-52"
            type="text"
            value={userData.phone} 
            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
          />
         : 
          <p className="text-blue-400">{userData.phone}</p>
        }

        <p className="font-medium">Address :</p>
        {isEdit ? 
          <p>
            <input
              className="bg-gray-50"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address,  line1: e.target.value },
                }))
              }
              value={userData.address.line1} 
            />
            <br />
            <input
              className="bg-gray-50"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address : { ...prev.address, line2: e.target.value },
                }))
              }
              //value={userData.address.line2} 
            />
          </p>
        : 
          <p className="text-gray-500">
           {userData.address?.line1}  
            <br />
            {userData.address?.line2}
          </p>
        }
      </div>

      {/* ------Basic Info------ */}
      <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="font-medium">Gender:</p>
        {isEdit ? (
          <select
            className="max-w-20 bg-gray-100"
            onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            value={userData.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        ) : (
          <p className="text-gray-400">{userData.gender}</p>
        )}

<p className="font-medium">Birthday:</p>
        {isEdit ? (
          <input
            className="max-w-28 bg-gray-100"
            type="date"
            onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
            value={userData.dob}
          />
        ) : (
          <p className="text-gray-400">{userData.dob}</p>
        )}
        
      </div>

      {/* ------Edit Button------ */}
      <div className="mt-10">
      {isEdit
        ? <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={updateUserProfileData}> save Information </button>
         : <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={() => setIsEdit(true)}> Edit </button>

      }
      
      </div>
    </div>
  );
};

export default MyProfile;
