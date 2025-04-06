/* eslint-disable react/prop-types */

import { FaWindowClose } from "react-icons/fa";
import Sidebar from "./Sidebar";
import useStore from "../../zustand/useStore";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

const Layout = ({ children }) => {
  const { isOpenSidebar, mode } = useStore();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="w-full flex overflow-hidden">
      {/* sidebar */}
      <div
        className={`${
          isOpenSidebar ? "w-[250px]" : "w-[100px]"
        } hidden lg:block bg-white min-h-screen fixed transition-all duration-300 ease-in z-50`}
      >
        {/* {isOpenSidebar ? (
          <FaAngleLeft
            onClick={() => setIsOpenSidebar(false)}
            className="w-5 h-5 rounded-full bg-black text-white text-xl text-center absolute -right-3 top-3 cursor-pointer"
          />
        ) : (
          <FaAngleRight
            onClick={() => setIsOpenSidebar(true)}
            className="w-5 h-5 rounded-full bg-black text-white text-xl text-center absolute -right-3 top-3 cursor-pointer"
          />
        )} */}

        <div className="min-h-screen">
          <Sidebar />
        </div>
      </div>
      {/* children */}
      <div
        className={`flex-grow  min-h-screen relative w-full ${
          isOpenSidebar ? "lg:ml-[250px]" : "lg:ml-[100px]"
        } ${mode === "light" ? "bg-blue-50" : "bg-gray-700"}`}
      >
        <button>
          {" "}
          <RiMenuUnfold2Fill
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className={`${
              mode === "light" ? "text-black" : "text-white"
            } text-2xl font-bold m-3 lg:hidden z-20`}
          />
        </button>

        <div className="p-4 lg:p-10 w-full custom-scrollbar">{children}</div>
      </div>

      {/* mobile nav */}
      <div
        className={`absolute z-[1000] h-full w-64  transition-all duration-300 ease-in block lg:hidden ${
          mode === "light" ? "bg-white" : "bg-gray-800"
        } ${isMobileNavOpen ? "left-0" : "-left-full"}`}
      >
        <div className="flex fixed justify-end w-60 z-[2000] py-2 cursor-pointer">
          <FaWindowClose
            className={mode === "light" ? "text-black" : "text-white"}
            onClick={() => setIsMobileNavOpen(false)}
          />
        </div>
        <div className="block lg:hidden w-64 h-full py-3 fixed">
          <MobileSidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
