import demoimage from "../assets/upload_area.png"

const Popup = () => {
  return (
    <div  >
      <img className="w-36 rounded" src={demoimage}  alt="Profile" />
      <input type="file" />
    </div>
  )
}

export default Popup
