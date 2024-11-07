/* eslint-disable react/prop-types */

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Sidebar from "./Sidebar";
import useStore from "../../zustand/useStore";

const Layout = ({ children }) => {
  const { isOpenSidebar, setIsOpenSidebar } = useStore();
  return (
    <div className="w-full flex">
      {/* sidebar */}
      <div
        className={`${
          isOpenSidebar ? "w-[250px]" : "w-[100px]"
        } bg-white min-h-screen fixed transition-all duration-300 ease-in z-50`}
      >
        {isOpenSidebar ? (
          <FaAngleLeft
            onClick={() => setIsOpenSidebar(false)}
            className="w-5 h-5 rounded-full bg-black text-white text-xl text-center absolute -right-3 top-3 cursor-pointer"
          />
        ) : (
          <FaAngleRight
            onClick={() => setIsOpenSidebar(true)}
            className="w-5 h-5 rounded-full bg-black text-white text-xl text-center absolute -right-3 top-3 cursor-pointer"
          />
        )}

        <div className="min-h-screen">
          <Sidebar />
        </div>
      </div>
      {/* children */}
      <div
        className={`flex-grow bg-blue-50 min-h-screen p-10 relative ${
          isOpenSidebar ? "ml-[250px]" : "ml-[100px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
