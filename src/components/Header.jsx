import {assets} from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary mt-28  pt-36 pb-14 rounded-lg px-6 md:px-10 '>
      
      {/* ---------------- LEFT SIDE------------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vm] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:md:leading-tight' >Book Appointment <br />
        With Trusted Doctors</p>
       <div className='flex flex-col md:flex-row items-centergap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt=""/>
          <p>Simply browse through our extensive list of trusted doctors, <br  className='hidden sm:block'/>
          schedule your appointment hassle-free.</p>
       </div>
       <a href='#speciality' className='flex items-centergap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
        Book Appointment <img className='w-8' src={assets.arrow_icon} alt=''/>
       </a>

      </div>
      {/* ---------------- RIGHT SIDE------------- */}
      <div className='md:w-1/2 relative '> 
        <img className='w-full  md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt=''/>
      </div>
    </div>
  )
}

export default Header
