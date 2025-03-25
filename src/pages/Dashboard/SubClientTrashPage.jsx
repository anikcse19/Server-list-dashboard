import { AiFillCloseSquare } from "react-icons/ai";
import Layout from "../../components/Layout/Layout";
import useStore from "../../zustand/useStore";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";

import { useNavigate } from "react-router-dom";

const SubClientTrashListsPage = () => {
  const [subClientsList, setSubClientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    status: false,
    value: {},
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState({
    status: false,
    value: {},
  });
  const [clientId, setClientId] = useState("");
  const [domainName, setDomainName] = useState("");

  const [clientList, setClientList] = useState([]);

  const { mode } = useStore();

  const navigate = useNavigate();

  // get cookies value
  const token = Cookies.get("token");
  const role = parseInt(Cookies.get("role"));

  useEffect(() => {
    axios
      .get(`${baseUrl}api/admin/wa-client/list?drop_downlist=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClientList(res?.data?.data));
  }, []);

  const fetchSubClientsList = async () => {
    try {
      axios
        .get(`${baseUrl}api/admin/sub-client/trashed-clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            setSubClientsList(res?.data?.data);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubClientsList();
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

  const handleUpdateClient = async (id) => {
    try {
      const updateSubClientData = {
        client_id: clientId,
        domain: domainName,
      };

      axios
        .put(
          `${baseUrl}api/admin/sub-client/update/${id}`,
          updateSubClientData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.status) {
            toast.success("Successfully Updated Client");
            setIsUpdateModalOpen({ status: false, vlaue: {} });
            fetchSubClientsList();
          } else {
            toast.error(res?.data?.message);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Layout>
      <div>
        <h1
          className={`${
            mode === "light" ? "text-black" : "text-white"
          } text-xl font-bold font-serif`}
        >
          Trash List - Sub Client
        </h1>
      </div>
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
        className={` w-full h-fit mt-10 py-3 rounded-md ${
          mode === "light" ? "bg-white" : "bg-gray-800"
        } `}
      >
        <div className="flex justify-between items-center px-3">
          {/* search box */}
          <div className="mt-5 flex items-center gap-x-2">
            <div className="flex items-center gap-x-4">
              <input
                // onChange={(e) => setSearchEventName(e.target.value)}
                // value={searchEventName}
                type="text"
                placeholder="Search Sub Client"
                className={` ${
                  mode === "light" ? "bg-blue-50" : "bg-gray-600"
                } "w-28 sm:w-52 px-3 py-2 text-sm rounded bg-blue-50 outline-none italic border-b-2 border-slate-600 focus:border-teal-500" `}
              />
            </div>
          </div>

          {/* create and trash button */}
          <div className="flex items-center gap-4 my-5">
            <button
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              }}
              onClick={() => {
                navigate("/dashboard/sub-client-lists");
              }}
              className="bg-rose-100 text-rose-700 px-2 lg:px-5 py-1 rounded-md text-xs lg:text-sm"
            >
              See Sub Client List
            </button>{" "}
          </div>
        </div>

        {/* users table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 w-[calc(100vw-32px)] lg:w-[calc(100vw-320px)]">
          <table className="w-full text-sm text-left rtl:text-right text-white  ">
            <thead
              className={`sticky top-0 text-xs  uppercase ${
                mode === "light"
                  ? "bg-blue-300 text-black"
                  : "bg-gray-900 text-white"
              }   rounded-md`}
            >
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Client Id
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Domain
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Server
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Created Date
                </th>
                {role === 1 && (
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                )}
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
              ) : subClientsList?.length <= 0 ? (
                <tr className="text-center text-sm">
                  <td colSpan={12} align="center">
                    <p className="py-2 text-red-700">No data found.</p>
                  </td>
                </tr>
              ) : (
                subClientsList.map((client) => (
                  <tr
                    key={client.id}
                    className={`${
                      mode === "light"
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                    }  text-sm cursor-pointer transition-all duration-500 ease-in  border-b-2 border-blue-100`}
                  >
                    <td className="px-6 py-4 text-left text-xs ">
                      {client?.client_id}
                    </td>
                    <td className="px-6 py-4 text-left text-xs ">
                      {client?.domain}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {client?.client?.server}
                    </td>

                    <td className="px-6 py-4 text-left text-xs">
                      {formateDate(client?.created_at)}
                    </td>

                    {role === 1 && (
                      <td className="px-6 py-4 text-left text-xs flex items-center gap-x-3 justify-center">
                        <p
                          onClick={() => {
                            axios
                              .get(
                                `${baseUrl}api/admin/sub-client/restore-client/${client?.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then((res) => {
                                if (res?.data?.status) {
                                  toast.success("Successfully Restored");
                                  fetchSubClientsList();
                                }
                              });
                          }}
                          className="bg-orange-200 hover:bg-orange-300 transition-all duration-100 ease-in text-orange-800 px-5 py-2 rounded-md cursor-pointer"
                        >
                          Restore
                        </p>
                        <p
                          onClick={() =>
                            setIsDeleteModalOpen({
                              status: true,
                              value: client,
                            })
                          }
                          className="bg-rose-200 hover:bg-rose-300 transition-all duration-100 ease-in text-red-800 px-5 py-2 rounded-md cursor-pointer"
                        >
                          Delete Forever
                        </p>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* delete modal */}
      {isDeleteModalOpen.status && (
        <div className=" bg-blue-100 shadow-2xl absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] p-10 rounded border-2 border-black flex flex-col justify-between">
          <div className="flex justify-center">
            <p className="text-2xl font-bold">Are you Sure?</p>
          </div>
          <div className="mt-10 flex items-center justify-center">
            <div className="flex items-center gap-x-8">
              <p
                onClick={() => {
                  axios
                    .delete(
                      `${baseUrl}api/admin/sub-client/delete/${isDeleteModalOpen.value.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((res) => {
                      if (res?.data?.status) {
                        toast.success("Sub Client Deleted Successfully");
                        fetchSubClientsList();
                        setIsDeleteModalOpen({ status: false, value: {} });
                      }
                    });
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md cursor-pointer"
              >
                Delete
              </p>
              <p
                onClick={() =>
                  setIsDeleteModalOpen({ status: false, value: {} })
                }
                className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-md cursor-pointer"
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
      )}

      {/* update modal */}
      {isUpdateModalOpen.status && (
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] border-2 border-black h-fit p-1 rounded-md bg-white"
        >
          <div className="flex justify-end">
            <AiFillCloseSquare
              className="text-2xl font-bold cursor-pointer"
              onClick={() => {
                setIsUpdateModalOpen({ status: false, value: {} });
              }}
            />
          </div>
          <div className=" flex flex-col gap-y-5  p-10">
            <div className="flex justify-center">
              <h1 className="font-bold">Update Sub Client</h1>
            </div>
            <div className="flex flex-col gap-y-1">
              <p>Client Id</p>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setClientId(e.target.value);
                }}
                value={clientId}
                className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
              >
                <option value="">Select --</option>
                {Object.keys(clientList)?.map((key) => (
                  <option value={clientList[key]} key={clientList[key]}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-y-1 w-[300px]">
              <p>Domain</p>
              <div className="flex flex-col gap-y-2">
                <input
                  onChange={(e) => setDomainName(e.target.value)}
                  value={domainName}
                  type="text"
                  className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
                  placeholder="Enter Domain Name"
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  handleUpdateClient(isUpdateModalOpen.value.id);
                }}
                className="bg-blue-200 text-blue-700 px-5 py-2 rounded-md"
              >
                Update Sub Client
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SubClientTrashListsPage;
