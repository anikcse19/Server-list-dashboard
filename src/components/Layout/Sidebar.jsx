// import { useState } from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { TbMessage2Code } from "react-icons/tb";
import { MdAddModerator } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa6";
import { FaUsersRectangle } from "react-icons/fa6";
import Cookies from "js-cookie";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../config";
import useStore from "../../zustand/useStore";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GrDocumentConfig } from "react-icons/gr";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const { isOpenSidebar } = useStore();

  const navs = [
    {
      id: 1,
      title: "Clients List",
      icon: FaUsers,
      link: "/dashboard/client-lists",
    },
    ...(parseInt(role) === 1
      ? [
          {
            id: 2,
            title: "Clients Message",
            icon: TbMessage2Code,
            link: "/dashboard/client-list-message",
          },
          {
            id: 3,
            title: "Create Client",
            icon: MdAddModerator,
            link: "/dashboard/create-client",
          },
          {
            id: 4,
            title: "Create User",
            icon: FaHospitalUser,
            link: "/dashboard/create-user",
          },
          {
            id: 5,
            title: "User List",
            icon: FaUsersRectangle,
            link: "/dashboard/user-lists",
          },
          {
            id: 6,
            title: "All Config",
            icon: GrDocumentConfig,
            link: "/dashboard/all-configs",
          },
          {
            id: 7,
            title: "Trash List",
            icon: FaTrashAlt,
            link: "/dashboard/trashlist",
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen px-3 py-10 flex flex-col justify-between">
      <div>
        {" "}
        <p className="text-gray-600">Menu</p>
        <div className="my-3 flex flex-col gap-y-3">
          {navs.map((nav) => (
            <div
              onClick={() => {
                navigate(nav.link);
              }}
              key={nav.id}
              className={` py-3 px-2 rounded-md cursor-pointer flex items-center gap-x-2   ${
                pathname.includes(nav.link) &&
                "bg-blue-100 border-l-4 border-blue-700 text-blue-700"
              }`}
            >
              <nav.icon className="text-xl" />
              {isOpenSidebar && <p>{nav.title}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* bottom */}
      <div>
        <div className="bg-blue-200 text-blue-700 font-bold py-3 rounded-md flex justify-center">
          <Link
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("role");
              axios.post(
                `${baseUrl}api/admin/logout`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }}
            className="flex items-center gap-x-2"
            to="/login"
          >
            <RiLogoutBoxRLine />
            {isOpenSidebar && <p>Logout</p>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
