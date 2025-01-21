import { useContext } from "react"
import {AppContext} from '../context/AppContext'

const MyAppointments = () => {

  const {doctors} = useContext(AppContext) 
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointment</p>
   <div>
    {
      doctors.slice(0,4).map((item,index) => (
        <div className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
          <div>
            <img className="w-32 bg-indigo-50" src={item.image} alt="" />
          </div>
          <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-semibold">Address</p>
              <p className="text-xs">{item.address.line1}</p>
              {/* <p>{item.Address.line2}</p> */}
              <p className="text-xs"><span className="text-sm text-neutral-700 font-semibold">Date & time :</span>25,jun, 2020</p>  
          </div>
          <div className="flex flex-col gap-2 justify-end">
            <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 ">cancel Appointment</button>
            <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-white transition-all duration-300 ">pay Online</button>
          </div>
        </div>
      ))
    }
   </div>
    </div>
  )
}

export default MyAppointments
