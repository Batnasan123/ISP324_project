import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  GiHamburgerMenu,
  FaTwitterSquare,
} from "react-icons/fa";
import React, { useState } from "react";

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  const closeBar = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full h-[90px] border-solid  .rounded-b-2xl shadow-lg bg-white flex flex-wrap mr-2 justify-between items-center px-6 py-8">
      <div className="flex">
        <a href="/" className="pr-4">
          <img
            // src="https://res.cloudinary.com/dfhvxswh6/image/upload/v1691979048/326238817_843833970046776_3151643487262701768_n_wbwl14.png"
            src="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618e53842413b5c2c6d7cb8e_doctorate.svg"
            className=".mt-[-34px]"
            width="100"
          ></img>
        </a>
        {/* <div className="mr-4">
          <div className="font-bold">G DELUXE</div>

          <div className="text-xs">Hotel&Resort</div>
        </div> */}
        <div className="text-3xl flex w-[110px] justify-evenly">
          <div className=" hover:text-cyan-600">
            <a href="https://www.facebook.com/GDeluxeHotelandResort/ ">
              <FaFacebookSquare />
            </a>
          </div>
          <a
            className=" hover:text-cyan-600"
            href="https://www.instagram.com/gdeluxe_resort/"
          >
            <FaInstagramSquare />
          </a>
          <a className=" hover:text-cyan-600" href="#">
            <FaYoutubeSquare />
          </a>
          <a className=" hover:text-cyan-600" href="#">
            <FaTwitterSquare />
          </a>
        </div>
      </div>
      <div className="flex max-[964px]:hidden  font-semibold ">
        <a href="/" className="mr-3 hover:text-cyan-600  ">
          Home{" "}
        </a>
        <a href="/aboutus" className="mr-3 hover:text-cyan-600  ">
          About{" "}
        </a>
        <a href="/pages" className="mr-3 hover:text-cyan-600  ">
          Pages{" "}
        </a>
        <a href="/contactUs" className="mr-3 hover:text-cyan-600 ">
          Contact Us{" "}
        </a>
        <a href="/auth/sign-in">
          <button className="border-slate-500 rounded-xl border w-[150px] h-[35px] relative bottom-1 ml-2 hover:text-cyan-600">
            RESERVATION{" "}
          </button>
        </a>
      </div>
      <button
        onClick={toggleBar}
        className="rounded min-[800px]:hidden  text-2xl z-10"
      >
        ☰
      </button>

      {isOpen && (
        <>
          <div
            onClick={closeBar}
            className="fixed top-0 left-0 bg-black opacity-30 h-full w-full z-20"
          />
          <div
            className={`absolute top-0 left-0 bg-white p-4 h-full min-[964px]:hidden z-30 ${
              isOpen ? "w-60" : "w-0"
            } transition-all duration-300 ease-in-out`}
          >
            <div className="pt-10 font-semibold">
              <a href="/" className="mr-3 hover:text-cyan-600  ">
                HOME{" "}
              </a>
              <a
                href="/aboutus"
                className="mr-2 block pt-4 hover:text-cyan-600 "
              >
                ABOUT{" "}
              </a>
              <a href="/pages" className="mr-2 pt-4 block hover:text-cyan-600 ">
                PAGES{" "}
              </a>
              <a
                href="/contactUs"
                className="mr-2 pt-4 pb-4 block hover:text-cyan-600 "
              >
                CONTACT US{" "}
              </a>
              <a
                href="/auth/sign-in"
                className=" pt-4 pb-4 block hover:text-cyan-600 relative right-1 "
              >
                <button className="border-slate-500  rounded-xl border w-[100px] h-[35px]  hover:text-cyan-600">
                  Reservation{" "}
                </button>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TopBar;
// import Image from "next/image";

// export default function TopBar() {
//   return (
//     <div className="flex flex-wrap .justify-around .justify-between px-8 py-5">
//       {/* <div className="flex justify-between"> */}
//       <div className="flex">
//         <a>
//           <img src="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618e53842413b5c2c6d7cb8e_doctorate.svg" />
//         </a>
//       </div>
//       <div className="grid grid-flow-col align-middle ml-5">
//         <img
//           className=""
//           src="https://uploads-ssl.webflow.com/6135e5f06048e4e83fb2c8ab/618e545e7614841ef20f526c_header-phone-call.svg"
//           loading="lazy"
//           alt=""
//         />
//         <a href="tel:+221234567890" className="pt-1">
//           Call Us - (+22) 123 456 7890
//         </a>
//       </div>
//       {/* </div> */}
//     </div>
//   );
// }
