import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <b className="text-gary-700">US</b>
        </p>
      </div>

      <div className="my-10   flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm ">
        <img className=" md:max-w-[360px]" src={assets.contact_image} alt="" />
        <div className="flex flex-col justify-center items-start gap-6 ">
          <b className=" text-lg text-gray-600 font-semibold">OUR OFFICE</b>
          <p className="text-gray-500  ">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>

          <p className="text-gray-500 ">
            Tel: (415) 555‑0132 <br /> Email: greatstackdev@gmail.com
          </p>

          <b className=" font-semibold text-gray-600 text-lg">
            CAREER AT PRESCRIPTO
          </b>

          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          <button className="border border-black py-4 px-8 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
