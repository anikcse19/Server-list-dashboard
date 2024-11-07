import { AiFillCloseSquare } from "react-icons/ai";
import Layout from "../../components/Layout/Layout";
import useStore from "../../zustand/useStore";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";

const ClientListsPage = () => {
  const [clientsList, setClientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPagNo] = useState(1);
  const [pages, setPages] = useState([]);
  const [lastPage, setLastPage] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    status: false,
    value: {},
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState({
    status: false,
    value: {},
  });
  const [serverName, setServerName] = useState("");
  const [alertNo, setAlertNo] = useState("");
  const [waAlertNo, setWaAlertNo] = useState([]);
  const [showedClientId, setShowedClientId] = useState({
    status: false,
    id: "",
  });
  const [showedClientSecret, setShowedClientSecret] = useState({
    status: false,
    id: "",
  });
  const { mode } = useStore();

  // get cookies value
  const token = Cookies.get("token");
  const role = parseInt(Cookies.get("role"));

  const fetchClientsList = async () => {
    try {
      axios
        .get(`${baseUrl}/wa-client/list?page=${pageNo}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            setClientsList(res?.data?.data?.data);
            setPages(res?.data?.data?.links);
            setLastPage(res?.data?.data?.last_page);
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
  }, [pageNo]);

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
      const updateClientData = {
        server: serverName,
        waAlertNo: waAlertNo.join(","),
      };

      axios
        .put(`${baseUrl}/wa-client/update/${id}`, updateClientData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            toast.success("Successfully Updated Client");
            setIsUpdateModalOpen({ status: false, vlaue: {} });
            fetchClientsList();
          } else {
            toast.error(res?.data?.message);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const maskString = (str) => {
    // Check if the string is shorter than or equal to 4 characters
    if (str.length <= 4) {
      return str; // Return the string as-is if it's too short to mask
    }

    // Extract the first two and last two characters
    const start = str.slice(0, 2);
    const end = str.slice(-2);

    // Calculate the number of asterisks needed
    const middleAsterisks = "*".repeat(str.length - 4);

    // Return the masked string
    return `${start}${middleAsterisks}${end}`;
  };

  const copyText = (text) => {
    // Get the text you want to copy
    // const text = document.getElementById("textToCopy").textContent;

    // Use the Clipboard API to copy the text
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <Layout>
      {/* search box */}
      <div className="mt-5 flex items-center gap-x-2">
        <p className={mode === "light" ? "text-black" : "text-white"}>
          Search:
        </p>
        <div className="flex items-center gap-x-4">
          <input
            // onChange={(e) => setSearchEventName(e.target.value)}
            // value={searchEventName}
            type="text"
            placeholder="Search Client"
            className="w-52 px-3 py-2 text-sm rounded-sm bg-transparent outline-none border-2 border-slate-600 focus:border-teal-500"
          />
        </div>
      </div>

      {/* users table */}
      <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right text-white  border-l-2 border-r-2 border-black">
          <thead
            className={`sticky top-0 text-xs  uppercase ${
              mode === "light"
                ? "bg-blue-300 text-black"
                : "bg-black text-white"
            }  border-b-2 border-t-2 border-black rounded-md`}
          >
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Client Id
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Client Secret
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Server
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Wa Alert No
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
            ) : (
              clientsList.map((client, i) => (
                <tr
                  key={client.id}
                  className={`${
                    i % 2 == 0
                      ? mode === "light"
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                      : mode === "light"
                      ? "bg-blue-100 text-black"
                      : "bg-black text-white"
                  }  text-sm  transition-all duration-500 ease-in  border-b-2 border-slate-700`}
                >
                  <td className="px-6 py-4 text-left text-xs ">
                    <p id="textToCopy" className="inline mr-2">
                      {showedClientId.status && showedClientId.id === client?.id
                        ? client?.clientId
                        : maskString(client?.clientId)}
                    </p>
                    {showedClientId.status &&
                    showedClientId.id === client.id ? (
                      <FaRegEye
                        onClick={() =>
                          setShowedClientId({
                            status: false,
                            id: "",
                          })
                        }
                        className="text-lg cursor-pointer inline mr-3"
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={() =>
                          setShowedClientId({
                            status: true,
                            id: client?.id,
                          })
                        }
                        className="text-lg cursor-pointer inline mr-3"
                      />
                    )}
                    {showedClientId.status &&
                      showedClientId.id === client.id && (
                        <IoCopy
                          onClick={() => {
                            copyText(client?.clientId);
                          }}
                          className="inline text-base cursor-pointer"
                        />
                      )}
                  </td>
                  <td className="px-6 py-4 text-left text-xs ">
                    <p className="inline mr-2">
                      {showedClientSecret.status &&
                      showedClientSecret.id === client?.id
                        ? client?.clientSecret
                        : maskString(client?.clientSecret)}
                    </p>
                    {showedClientSecret.status &&
                    showedClientSecret.id === client.id ? (
                      <FaRegEye
                        onClick={() =>
                          setShowedClientSecret({
                            status: false,
                            id: "",
                          })
                        }
                        className="text-lg cursor-pointer inline mr-3"
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={() =>
                          setShowedClientSecret({
                            status: true,
                            id: client?.id,
                          })
                        }
                        className="text-lg cursor-pointer inline mr-3"
                      />
                    )}
                    {showedClientSecret.status &&
                      showedClientSecret.id === client.id && (
                        <IoCopy
                          onClick={() => {
                            copyText(client?.clientSecret);
                          }}
                          className="inline text-base cursor-pointer"
                        />
                      )}
                  </td>
                  <td className="px-6 py-4 text-left text-xs">
                    {client?.server}
                  </td>
                  <td className="px-6 py-4 text-left text-xs">
                    {client?.waAlertNo ? client?.waAlertNo : "--"}
                  </td>
                  <td className="px-6 py-4 text-left text-xs">
                    {formateDate(client?.created_at)}
                  </td>

                  {role === 1 && (
                    <td className="px-6 py-4 text-left text-xs flex items-center gap-x-3 justify-center">
                      <p
                        onClick={() => {
                          setIsUpdateModalOpen({ status: true, value: client });
                          setServerName(client?.server);
                          setWaAlertNo(client.waAlertNo.split(","));
                        }}
                        className="bg-teal-200 hover:bg-teal-300 transition-all duration-100 ease-in text-green-800 px-5 py-2 rounded-md cursor-pointer"
                      >
                        Update
                      </p>
                      <p
                        onClick={() =>
                          setIsDeleteModalOpen({ status: true, value: client })
                        }
                        className="bg-rose-200 hover:bg-rose-300 transition-all duration-100 ease-in text-red-800 px-5 py-2 rounded-md cursor-pointer"
                      >
                        Delete
                      </p>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="mt-5 flex items-center justify-center gap-x-3">
        {parseInt(pageNo) !== 1 && (
          <p
            onClick={() => {
              if (pages[0]?.url !== null) {
                const pN = parseInt(pages[0]?.url.split("=")[1]);
                setPagNo(pN);
              }
            }}
            className={`border-2  px-2 rounded-md cursor-pointer ${
              mode === "light"
                ? "border-black text-black"
                : "border-white  text-white"
            }`}
          >
            Prev
          </p>
        )}
        <div className="flex items-center gap-3">
          {pages.slice(1, -1).map((page, i) => {
            return (
              <p
                className={`border-2  px-2 rounded-md cursor-pointer ${
                  pageNo == page?.label
                    ? mode === "light"
                      ? "bg-black text-white border-white shadow-2xl scale-105"
                      : "bg-slate-300 text-black border-slate-200 shadow-2xl scale-105"
                    : mode === "light"
                    ? "text-black border-black"
                    : "text-white"
                }`}
                onClick={() => {
                  setPagNo(parseInt(page?.label));
                }}
                key={i}
              >
                {page?.label}
              </p>
            );
          })}
        </div>
        {parseInt(pageNo) !== lastPage && (
          <p
            onClick={() => {
              if (pages[pages.length - 1]?.url !== null) {
                const pN = parseInt(pages[pages.length - 1]?.url.split("=")[1]);
                setPagNo(pN);
              }
            }}
            className={`border-2  px-2 rounded-md cursor-pointer ${
              mode === "light"
                ? "border-black text-black"
                : "border-white  text-white"
            }`}
          >
            Next
          </p>
        )}
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
                      `${baseUrl}/wa-client/delete/${isDeleteModalOpen.value.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((res) => {
                      if (res?.data?.status) {
                        toast.success("Client Deleted Successfully");
                        fetchClientsList();
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
              <h1 className="font-bold">Update Client</h1>
            </div>
            <div className="flex flex-col gap-y-2 mt-5">
              <label htmlFor="server_name">Server Name</label>
              <input
                onChange={(e) => setServerName(e.target.value)}
                value={serverName}
                type="text"
                className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
              />
            </div>

            <div className="flex flex-col gap-y-2 w-[300px]">
              <p>Wa Alert No</p>
              <div className="flex items-center gap-2 flex-wrap">
                {waAlertNo.map((wa, i) => (
                  <p
                    className="bg-green-200 text-green-700 px-2 py-1 rounded"
                    key={i}
                  >
                    {wa}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-y-2">
                <input
                  onChange={(e) => setAlertNo(e.target.value)}
                  value={alertNo}
                  type="text"
                  className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
                  placeholder="Add Alert No"
                />
                <div className="flex justify-end">
                  <p
                    onClick={() => {
                      if (alertNo !== "") {
                        setWaAlertNo((prev) => [...prev, alertNo]);
                        setAlertNo("");
                      }
                    }}
                    className="bg-black opacity-80 text-white px-5 py-1 cursor-pointer rounded-md"
                  >
                    Add
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  handleUpdateClient(isUpdateModalOpen.value.id);
                }}
                className="bg-blue-200 text-blue-700 px-5 py-2 rounded-md"
              >
                Update Client
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ClientListsPage;
