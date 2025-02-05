import Layout from "../../components/Layout/Layout";
import useStore from "../../zustand/useStore";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";

const UsersListPage = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isUpdateStatusLoading, setIsUpdateStatusLoading] = useState({
  //   id: "",
  //   state: false,
  // });

  const navigate = useNavigate();
  const { mode } = useStore();

  // get cookies value
  const token = Cookies.get("token");

  const fetchClientsList = async () => {
    try {
      axios
        .get(`${baseUrl}api/admin/user-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            setUsersList(res?.data?.data);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientsList();
  }, []);

  const formateDate = (marketDate) => {
    const localDate = new Date(marketDate).toLocaleString(undefined, {
      timeZoneName: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return localDate;
  };

  return (
    <Layout>
      <div>
        <h1 className="text-xl font-bold font-serif">All Admin List</h1>

        <div className="my-5">
          <button
            onClick={() => navigate("/dashboard/create-user")}
            style={{
              boxShadow: " rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset",
            }}
            className="flex items-center gap-x-2 bg-orange-200 hover:bg-orange-300 transition-all duration-300 ease-out text-orange-700 py-2 px-5 rounded-md"
          >
            <CiSquarePlus className="text-xl" />
            <p>Create New Admin</p>
          </button>
        </div>
      </div>

      {/* users table */}
      <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 w-full">
        <table className="w-full text-sm text-left rtl:text-right text-white  border-l-2 border-r-2 border-black">
          <thead
            className={`sticky top-0 text-xs  uppercase ${
              mode === "light"
                ? "bg-blue-300 text-black"
                : "bg-black text-white"
            }  border-b-2 border-t-2 border-black rounded-md`}
          >
            <tr>
              <th scope="col" className="px-2 py-2 text-left whitespace-nowrap">
                SL No
              </th>
              <th scope="col" className="px-2 py-2 text-left">
                Name
              </th>
              <th scope="col" className="px-2 py-2 text-left">
                Email
              </th>
              <th scope="col" className="px-2 py-2 text-left whitespace-nowrap">
                User Type
              </th>
              <th scope="col" className="px-2 py-2 text-left">
                Amount
              </th>
              <th scope="col" className="px-2 py-2 text-left whitespace-nowrap">
                Client Ids
              </th>
              <th scope="col" className="px-2 py-2 text-left whitespace-nowrap">
                Sub Client Ids
              </th>
              <th scope="col" className="px-2 py-2 text-left whitespace-nowrap">
                Created Date
              </th>
              <th scope="col" className="px-2 py-2 text-center">
                Action
              </th>
              {/* <th scope="col" className="px-2 py-2 text-left">
                Status
              </th> */}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="text-center text-sm">
                <td colSpan={12} align="center">
                  <div className="my-5 flex flex-col justify-center items-center">
                    <Circles
                      height="50"
                      width="50"
                      color="#4fa94d"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                </td>
              </tr>
            ) : (
              usersList.map((user, i) => (
                <tr
                  key={user.id}
                  className={`${
                    i % 2 == 0
                      ? mode === "light"
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                      : mode === "light"
                      ? "bg-blue-100 text-black"
                      : "bg-black text-white"
                  }  text-sm cursor-pointer transition-all duration-500 ease-in  border-b-2 border-slate-700`}
                >
                  <td className="px-2 py-2 text-left text-xs">{i + 1}</td>
                  <td className="px-2 py-2 text-left text-xs whitespace-nowrap">
                    {user?.name}
                  </td>
                  <td className="px-2 py-2 text-left text-xs whitespace-nowrap">
                    {user?.email}
                  </td>
                  <td className="px-2 py-2 text-left text-xs whitespace-nowrap">
                    {user?.user_type === 1
                      ? "Administrator"
                      : user?.user_type === 2
                      ? "Sub Admin"
                      : user?.user_type === 3
                      ? "Client"
                      : user?.user_type === 4
                      ? "Sub Client"
                      : "Co Sub Client"}
                  </td>
                  <td className="px-2 py-2 text-left text-xs whitespace-nowrap">
                    {user?.wallet_balance}
                  </td>
                  <td className="px-2 py-2 text-left text-xs">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      {user.serverIds !== null
                        ? user.serverIds.map((id) => (
                            <p
                              className="bg-green-200 text-green-700 px-2 py-1 rounded"
                              key={id}
                            >
                              {id}
                            </p>
                          ))
                        : "--"}
                    </div>
                  </td>
                  <td className="px-2 py-2 text-left text-xs whitespace-nowrap">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      {user.subClientIds !== null
                        ? user.subClientIds.map((id) => (
                            <p
                              className="bg-red-200 text-red-700 px-2 py-1 rounded"
                              key={id}
                            >
                              {id}
                            </p>
                          ))
                        : "--"}
                    </div>
                  </td>
                  <td className="px-2 py-2 text-left text-xs whitespace-nowrap">
                    {formateDate(user?.created_at)}
                  </td>

                  <td className="px-2 py-2 text-left text-xs">
                    <div className="flex items-center gap-x-2">
                      <button
                        onClick={() => {
                          navigate(`/dashboard/user/${user?.id}`);
                        }}
                        className="bg-teal-100 text-teal-600 px-3 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/transaction-history/${user?.id}`)
                        }
                        className="bg-rose-100 text-rose-600 px-3 py-1 rounded whitespace-nowrap"
                      >
                        View History
                      </button>
                    </div>
                  </td>
                  {/* <td className="px-2 py-2 text-center text-xl">
                    {user?.status === 1 ? (
                      <div
                        onClick={() => {
                          try {
                            // setIsUpdateStatusLoading({
                            //   id: user.id,
                            //   state: true,
                            // });
                            axios
                              .post(
                                `${baseUrl}api/admin/get-user-data/${user?.id}`,
                                {
                                  status: 0,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    Accept: "application/json",
                                  },
                                }
                              )
                              .then((res) => {
                                if (res?.data?.status) {
                                  fetchClientsList();
                                  toast.success("User Status Updated");
                                }
                              });
                          } catch (error) {
                            toast.error(error?.response?.data?.message);
                          }
                        }}
                        className="w-8 h-4 bg-green-500 rounded-full relative"
                      >
                        <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-[50%] -translate-y-1/2"></div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          axios
                            .post(
                              `${baseUrl}api/admin/get-user-data/${user?.id}`,
                              {
                                status: 1,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  Accept: "application/json",
                                },
                              }
                            )
                            .then((res) => {
                              if (res?.data?.status) {
                                fetchClientsList();
                                toast.success("User Status Updated");
                              }
                            });
                        }}
                        className="w-8 h-4 bg-gray-500 rounded-full relative"
                      >
                        <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-[50%] -translate-y-1/2"></div>
                      </div>
                    )}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UsersListPage;
