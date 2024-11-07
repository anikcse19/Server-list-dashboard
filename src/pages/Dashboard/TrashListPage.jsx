import { useEffect, useState } from "react";
import useStore from "../../zustand/useStore";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import baseUrl from "../../../config";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import Layout from "../../components/Layout/Layout";

const TrashListPage = () => {
  const [trashClientsList, setTrashClientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchTrashedClientsList = async () => {
    try {
      axios
        .get(`${baseUrl}api/admin/wa-client/trashed-clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            setTrashClientsList(res?.data?.data ? res?.data?.data : []);
          } else {
            setTrashClientsList([]);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashedClientsList();
  }, []);

  const handleRestore = async (id) => {
    axios
      .get(`${baseUrl}api/admin/wa-client/restore-client/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          toast.success("Client Restored");
          fetchTrashedClientsList();
        } else {
          toast.error(res?.data?.message);
        }
      });
  };

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
      {/* users table */}
      <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right text-white  ">
          <thead
            className={`sticky top-0 text-xs  uppercase ${
              mode === "light"
                ? "bg-blue-300 text-black"
                : "bg-black text-white"
            } border-l-2 border-r-2  border-b-2 border-t-2 border-black rounded-md`}
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
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="text-center text-sm">
                <td colSpan={6} align="center">
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
            ) : trashClientsList.length <= 0 ? (
              <tr className="text-center text-sm">
                <td colSpan={6} align="center">
                  <p className="text-black text-lg py-2">No data to show</p>
                </td>
              </tr>
            ) : (
              trashClientsList.map((client, i) => (
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
                  }  text-sm  transition-all duration-500 ease-in border-l-2 border-r-2   border-b-2 border-slate-700`}
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

                  <td className="px-6 py-4 text-left text-xs flex items-center gap-x-3 justify-center">
                    <p
                      onClick={() => handleRestore(client.id)}
                      className="bg-rose-200 hover:bg-rose-300 transition-all duration-100 ease-in text-red-800 px-5 py-2 rounded-md cursor-pointer"
                    >
                      Restore
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default TrashListPage;
