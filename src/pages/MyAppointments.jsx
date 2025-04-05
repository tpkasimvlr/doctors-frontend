import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  // const months = [ "","Jan", "Feb","Mar" , "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov" ,"Dec"]

  // const SlotDateFormat = (slotDate)  => {
  //   const dateArray = slotDate.split('_')
  //   return dateArray[0] + "" + months[Number(dateArray[1])] + "" + dateArray[2]
  // }

  const Navigate = useNavigate();
  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/appointment",
        { headers: { token } }
      );

      if (data.success) {
        console.log("data appointment", data.appointments); 

        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/cencel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const option = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "appointment Payment",
      description: "appontment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handle: async (Response) => {
        console.log(Response);

        try {
          const { data } = await axios.post(
            "http://localhost:4000/api/user/verifyRazorpay",
            Response,
            { headers: { token } }
          );

          if (data.success) {
            getUserAppointment();
            Navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.RazorPay(option);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointment
      </p>
      <div>
        {appointments.slice(0, 4).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item?.docData?.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData?.name}
              </p>
              <p>{item.docData?.speciality}</p>
              <p className="text-zinc-700 font-semibold">Address</p>
              <p className="text-xs"> {item?.docData?.address?.line1}</p>
              <p className="text-xs"> {item?.docData?.address?.line2}</p>
              <p className="text-xs">
                <span className="text-sm text-neutral-700 font-semibold">
                  Date & time : <br/>
                </span>
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                || {item.slotTime}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                  Paid
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-white transition-all duration-300 "
                >
                  pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 "
                >
                  cancel Appointment
                </button>
              )}
              {item.cancelled &&  !item.isCompleted && (
                <button className="sm:min-w-48  py-2 border-red-500 rounded text-red-500">
                  Appointment cancelled
                </button>
              )}

              {item.isCompleted && <button className="sm:min-w-48  py-2 border border-green-500 text-green-500">Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
