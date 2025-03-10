import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios";


const Login = () => {

  const [state, setState] = useState('sign-up')
  const navigate = useNavigate()


const handleSubmit = async (e) =>  {

  e.preventDefault();
  


  const formData = new FormData(e.target);

  console.log(formData);

  const email = formData.get("email");
  const password = formData.get("password");
  const name = state ? formData.get("name")  : null;


  if (state === 'sign-up' ) {
    console.log("Name:", name);


   // Call signup API
    const resp = await singnupApi({  name, email, password });
    
    if (resp) {
      alert("Signup successful  you can now log in.")
      setState("log-in");
      e.target.reset();
      focus();
      return
    } else {
      alert("Signup failed... Please try again.");
      return
    }
  } else {
    const loginres = await loginApi ({email, password});

    if (loginres) {
      alert("login successfully")
      navigate("/")
    } else { 
      alert("email & password must")
    }
  }
};

//signup  api
const singnupApi = async (data) => {
  try {
    const res = await axios.post("http://localhost:4000/api/user/create", data, {
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log("API Response:", res.data);
    return true;
  } catch (error) {
    console.error("create API Error:", error.response?.data || error.message);
    return false;
  }
};
 //login api
 const loginApi = async (data) =>{
  try {const res = await axios.post("http://localhost:4000/api/user/login", data, {
    headers: {
      "Content-type" : "application/json",

    },
  });
  console.log("API Response :", res.data);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token)
  }


  return true;
 } catch (error) {
  console.error("login API Error:", error.response?.data || error.message);
  return false;
 }
}

  return (
   
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
           <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg ">
               <p className="text-2xl font-semibold">{state === 'sign-up' ? "create Account" : "Login"}</p>
               <p>please {state === 'sign-up' ? "sign Up" : "Log in"} to book appointment </p>
                      {
                    state === "sign-up" &&  <div className="w-full ">
                    <p>Full Name</p>
                    <input className="border border-zinc-300 rounded w-full p-2 mt-3" type="text"  id="name"  name="name"
                    //  onChange={(e)=> setName(e.target.value)}
                       required />
                   </div>
                  }
           

               <div  className="w-full">
                <p>Email</p>
                <input className="border border-zinc-300 rounded w-full p-2 mt-3" type="email" id="email" name="email"
                   required />
               </div>

               <div  className="w-full">
                <p>Password</p>
                <input className="border border-zinc-300 rounded w-full p-2 mt-3" type="password" id="password" name="password"
                 
                  required />
               </div>

               <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
                {state === 'sign-up' ? "Create Account" : "Login"}</button>

               {
                state === "sign-up" 
                ? <p>Already have an account? 
                  <span
                   onClick={()=> setState('Log-in')} 
                  className="text-primary cursor-pointer" >
                    Login here</span></p> 
                : <p>create an  new account ?  <span
                 onClick={()=> setState('sign-up')}
                  className="text-primary cursor-pointer"  > click here </span></p>
               }
           </div>
    </form>
  ) 
}


export default Login
