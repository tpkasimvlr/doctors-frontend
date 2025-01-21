import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ReletedDoctors from "../components/ReletedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "THU", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    //console.log(docInfo);
  };
  const getAvailableSlots = async () => {
    setDocSlots([]);

    //getting current data
    let today = new Date();

    console.log(today);

    for (let i = 0; i < 7; i++) {
      console.log("loop count:", i);

      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      console.log("current date:", currentDate);
      console.log("current date houre:", currentDate.getHours());

      //setting end time of the date with index
      let endTime = new Date();
      console.log(endTime);

      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
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
        let formattedTime = currentDate.toLocaleDateString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        console.log(
          "formatted: ",
          currentDate.toLocaleDateString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );

        // add slot to arrey
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        //increment currentDate time by 30 mintues
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  console.log(docSlots);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-row gap-5">
          {/* --------------- doctor detiails----------- */}
          <div className="flex flex-col sm:flex-row gap-4">
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0  ms:mt-0">
            {/* ------------ doc infp name , degree */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-centergap-2 text-smvmt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* ---------- doctor about ------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />{" "}
              </p>
              <p className="text-sm text-gary-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointement fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* ----------------   booking slots-----------*/}
        <div className="sm:ml-72 sm:pl-4 mt-4  space-y-6 font-medium text-green-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-p0inter ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => {
                // Assuming item.time is a Date object or a string parsable by Date
                const timeOnly = new Date(item.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <p
                    onClick={() => setSlotTime(timeOnly)}
                    className={`text-sm font-light flex-shrink-0 px-0 py-2 rounded-full cursor-pointer ${
                      timeOnly === slotTime
                        ? "bg-primary px-10  text-white "
                        : "text-gray-400  px-10  border border-gray-300"
                    }`}
                    key={index}
                  >
                    {timeOnly.toLowerCase()}
                  </p>
                );
              })}
          </div>

          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
            Book appoinment
          </button>
        </div>
        {/* ----------- listing releted doctors */}
        <ReletedDoctors  docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
};

export default Appointment;
