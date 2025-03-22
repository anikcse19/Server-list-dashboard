// import { useState } from "react";
import { FaAngleDown, FaUsers } from "react-icons/fa";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../config";
import useStore from "../../zustand/useStore";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useState } from "react";

const Sidebar2 = () => {
  const [isOpenFirstSubmenu, setIsOpenFirstSubmenu] = useState({
    state: true,
    id: "",
  });
  const [isOpenSecondSubmenu, setIsOpenSecondSubmenu] = useState({
    state: true,
    id: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const { isOpenSidebar } = useStore();

  const navs = [
    ...(parseInt(role) === 3
      ? [
          {
            id: 101,
            title: "Profile",
            icon: FaUsers,
            link: "/dashboard/client/configs",
          },
          {
            id: 102,
            title: "Config",
            icon: FaUsers,
            label: [
              "/dashboard/client/private-config",
              "/dashboard/client/group-config",
            ],
            subMenu: [
              {
                id: 1,
                title: "Private Config",
                icon: FaUsers,
                link: "/dashboard/client/private-config",
              },
              {
                id: 2,
                title: "Group Config",
                icon: FaUsers,
                link: "/dashboard/client/group-config",
              },
            ],
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
            <div key={nav.id}>
              <div
                onClick={() => {
                  navigate(nav?.link);
                }}
                className={` py-3 px-2 rounded-md cursor-pointer flex items-center justify-between  ${
                  nav?.label?.includes(pathname) &&
                  "bg-blue-100 border-l-4 border-blue-700 text-blue-700"
                }`}
              >
                <div className="flex items-center gap-x-2">
                  {" "}
                  <nav.icon className="text-xl" />
                  {isOpenSidebar && <p>{nav.title}</p>}
                </div>
                {nav.subMenu && (
                  <div>
                    {isOpenFirstSubmenu.state &&
                    isOpenFirstSubmenu.id === nav.id ? (
                      <FaAngleDown
                        className="rotate-180"
                        onClick={() =>
                          setIsOpenFirstSubmenu({ state: false, id: "" })
                        }
                      />
                    ) : (
                      <FaAngleDown
                        onClick={() =>
                          setIsOpenFirstSubmenu({ state: true, id: nav.id })
                        }
                      />
                    )}
                  </div>
                )}
              </div>
              {/* first submenu */}
              {nav?.subMenu && isOpenFirstSubmenu.state && (
                <div className="ml-4 mt-2 px-2 flex flex-col gap-y-2 border-l-2 border-gray-400">
                  {nav.subMenu.map((menu1) => (
                    <div key={menu1.id}>
                      <div
                        onClick={() => {
                          navigate(menu1.link);
                        }}
                        className={`flex justify-between items-center py-2 cursor-pointer ${
                          menu1?.label?.includes(pathname) && "text-blue-500"
                        } `}
                      >
                        <div className="flex items-center gap-x-2">
                          <menu1.icon className="text-xl" />
                          {isOpenSidebar && <p>{menu1.title}</p>}
                        </div>
                        {menu1.subMenu && (
                          <div>
                            {isOpenSecondSubmenu.state &&
                            isOpenSecondSubmenu.id === menu1.id ? (
                              <FaAngleDown
                                className="rotate-180 cursor-pointer"
                                onClick={() =>
                                  setIsOpenSecondSubmenu({
                                    state: false,
                                    id: "",
                                  })
                                }
                              />
                            ) : (
                              <FaAngleDown
                                className="cursor-pointer"
                                onClick={() =>
                                  setIsOpenSecondSubmenu({
                                    state: true,
                                    id: menu1.id,
                                  })
                                }
                              />
                            )}
                          </div>
                        )}
                      </div>
                      {/* second submenu */}
                      {menu1?.subMenu && isOpenSecondSubmenu.state && (
                        <div className="ml-4 mt-2 px-2 flex flex-col gap-y-2 border-l-2 border-gray-400">
                          {menu1.subMenu.map((menu2) => (
                            <div
                              key={menu2.id}
                              onClick={() => {
                                navigate(menu2.link);
                              }}
                              className={`flex justify-between items-center py-2 cursor-pointer ${
                                menu2?.label?.includes(pathname) &&
                                "text-blue-700"
                              }`}
                            >
                              <div className="flex items-center gap-x-2">
                                <menu2.icon className="text-xl" />
                                {isOpenSidebar && <p>{menu2.title}</p>}
                              </div>
                              {menu2.subMenu && (
                                <div>
                                  {isOpenSecondSubmenu.state &&
                                  isOpenSecondSubmenu.id === menu2.id ? (
                                    <FaAngleDown
                                      className="rotate-180 cursor-pointer"
                                      onClick={() =>
                                        setIsOpenSecondSubmenu({
                                          state: false,
                                          id: "",
                                        })
                                      }
                                    />
                                  ) : (
                                    <FaAngleDown
                                      className="cursor-pointer"
                                      onClick={() =>
                                        setIsOpenSecondSubmenu({
                                          state: true,
                                          id: menu2.id,
                                        })
                                      }
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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

export default Sidebar2;
