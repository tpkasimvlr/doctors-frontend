import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ReletedDoctors from "../components/ReletedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchDocInfo = () => {
      const doc = doctors.find((doc) => doc._id === docId);
      setDocInfo(doc);
    };
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    const getAvailableSlots = () => {
      setDocSlots([]);
      let today = new Date();
      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0);

        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
          );
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];
        while (currentDate < endTime) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: currentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    };
    getAvailableSlots();
  }, [docInfo]);

  const handleBookingSuccess = () => {
    setShowDialog(true);
  };

  if (!docInfo) return <p>Loading...</p>;

  return (
    <div className="md:flex md:flex-col gap-y-12">
      {isBooked ? (
        <div className="text-center p-10">
          <h2 className="text-3xl font-bold text-green-600">
            Booking Confirmed! 🎉
          </h2>
          <p className="text-gray-600 mt-2">
            Your appointment with {docInfo.name} is booked successfully.
          </p>
          <p className="text-gray-600 mt-1">
            Time: <strong>{slotTime}</strong>
          </p>
          <img
            className="w-40 mx-auto mt-4"
            src={assets.success_icon}
            alt="Success"
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                className="bg-primary w-full sm:max-w-72 rounded-lg"
                src={docInfo.image}
                alt=""
              />
            </div>
            <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
              <p className="text-2xl font-medium text-gray-900">
                {docInfo.name}
              </p>
              <p className="text-gray-600">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <p className="text-gray-500 font-medium mt-4">
                Appointment fee:{" "}
                <span className="text-gray-600">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>

              <p>
                Welcome to Prescripto, your trusted partner in managing your
                healthcare needs conveniently and efficiently. At Prescripto, we
                understand the challenges individuals face when it comes to
                scheduling doctor appointments and managing their health
                records. Prescripto is committed to excellence in healthcare
                technology. We continuously strive to enhance our platform,
                integrating the latest advancements to improve user experience
                and deliver superior service. Whether you're booking your first
                appointment or managing ongoing care, Prescripto is here to
                support you every step of the way. Our Vision Our vision at
                Prescripto is to create a seamless healthcare experience for
                every user. We aim to bridge the gap between patients and
                healthcare providers, making it easier for you to access the
                care you need, when you need it.
              </p>
            </div>
          </div>

          <div className="md:m-auto sm:ml-72 sm:pl-4 mt-4 space-y-6 font-medium text-green-700">
            <p>Booking slots</p>
            <div className="flex gap-3 overflow-x-scroll mt-4">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === index
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>

            <div className="flex items-center gap-3 overflow-x-scroll">
              {docSlots.length > 0 &&
                docSlots[slotIndex].map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light px-10 py-2 rounded-full cursor-pointer ${
                      item.time === slotTime
                        ? "bg-primary text-white"
                        : "text-gray-400 border border-gray-300"
                    }`}
                  >
                    {item.time}
                  </p>
                ))}
            </div>

            <button
              onClick={handleBookingSuccess}
              className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
            >
              Book Appointment
            </button>
          </div>

          <ReletedDoctors docId={docId} speciality={docInfo.speciality} />
        </>
      )}

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-bold text-green-600">
              Booking Confirmed! 🎉
            </h2>
            <p className="text-gray-600 mt-2">
              Your appointment is booked successfully.
            </p>
            <p className="text-gray-600 mt-1">
              Time: <strong>{slotTime}</strong>
            </p>
            <button
              onClick={() => setShowDialog(false)}
              className="mt-4 bg-primary text-white px-6 py-2 rounded-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
