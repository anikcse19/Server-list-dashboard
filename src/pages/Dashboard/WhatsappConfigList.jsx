import Layout from "../../components/Layout/Layout";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../config";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import WhatsappConfigModal from "../../components/Modal/WhatsappConfigModal";
import WhatsAppConfigDeleteModal from "../../components/Modal/WhatsAppConfigDeleteModal";
import WhatsappConfigUpdateModal from "../../components/Modal/WhatsappConfigUpdateModal";
import useStore from "../../zustand/useStore";

const WhatsappConfigList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [configList, setConfigList] = useState([]);
  // const [domainList, setDomainList] = useState([]);
  const [openConfigModal, setOpenConfigModal] = useState(false);
  const [openConfigUpdateModal, setOpenConfigUpdateModal] = useState({
    state: false,
    value: {},
  });
  const [openDeleteConfigModal, setOpenDeleteConfigModal] = useState({
    state: false,
    value: {},
  });
  // const navigate = useNavigate();
  const { mode } = useStore();
  // const mode = "light";

  // get cookies value
  const token = Cookies.get("token");

  const fetchConfigList = async () => {
    try {
      await axios
        .get(
          `${baseUrl}api/admin/client/config-profile/wa/list-wa-profile`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setConfigList(res?.data?.data);
          // setDomainList(res?.data?.data?.configDomains);
        });
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigList();
  }, [openConfigModal, openDeleteConfigModal, openConfigUpdateModal]);

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
        <h1
          className={`${
            mode === "light" ? "text-black" : "text-white"
          } text-xl font-bold font-serif`}
        >
          Config Profile
        </h1>
      </div>
      {/* body */}
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
        className={` "w-full min-h-96 h-fit mt-10 py-3 rounded-md" ${
          mode === "light" ? "bg-white" : "bg-gray-800"
        } `}
      >
        <div className="flex items-center justify-between px-3">
          <div>
            <p className="text-xl font-bold text-gray-600">
              Whatsapp Config List
            </p>
          </div>
          <div className="flex items-center gap-4 my-5">
            <button
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              }}
              onClick={() => {
                setOpenConfigModal(true);
              }}
              className="bg-teal-100 text-teal-700 px-2 md:px-5 py-1 rounded-md text-xs md:text-sm"
            >
              Create WhatsApp Config
            </button>
          </div>
        </div>

        {/* table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto custom-scrollbar my-5 w-[calc(100vw-32px)] lg:w-[calc(100vw-320px)]">
          <table className="w-full text-sm text-left rtl:text-right text-white  ">
            <thead
              className={`sticky top-0 text-xs  uppercase ${
                mode === "light"
                  ? "bg-red-100 text-black"
                  : "bg-gray-900 text-white"
              }   rounded-md`}
            >
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Sender Id
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Sender Name
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  App key
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Auth Key
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Api Link
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
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
              ) : configList?.length <= 0 ? (
                <tr className="text-center text-sm">
                  <td colSpan={12} align="center">
                    <p className="text-red-500 py-2">No data found.</p>
                  </td>
                </tr>
              ) : (
                configList.map((config) => (
                  <tr
                    key={config.id}
                    className={`${
                      mode === "light"
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                    }  text-sm cursor-pointer transition-all duration-500 ease-in  border-b-2 border-blue-100`}
                  >
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.sender_id}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.sender_name}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.app_key}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.auth_key}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.api_link}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {formateDate(config?.created_at)}
                    </td>
                    <td className="px-6 py-4 text-center text-xs">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setOpenConfigUpdateModal({
                              state: true,
                              value: config,
                            });
                          }}
                          className=""
                        >
                          <FaRegEdit className="text-xl text-teal-400" />
                        </button>
                        <button
                          onClick={() => {
                            setOpenDeleteConfigModal({
                              state: true,
                              value: config,
                            });
                          }}
                          className=""
                        >
                          <RiDeleteBin6Line className="text-xl text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}
      {openConfigModal && (
        <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full ">
          <WhatsappConfigModal
            openConfigModal={openConfigModal}
            setOpenConfigModal={setOpenConfigModal}
          />
        </div>
      )}

      {openDeleteConfigModal.state && (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full">
          <WhatsAppConfigDeleteModal
            setOpenDeleteConfigModal={setOpenDeleteConfigModal}
            openDeleteConfigModal={openDeleteConfigModal}
          />
        </div>
      )}

      {openConfigUpdateModal.state && (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full">
          <WhatsappConfigUpdateModal
            setOpenConfigUpdateModal={setOpenConfigUpdateModal}
            openConfigUpdateModal={openConfigUpdateModal}
          />
        </div>
      )}
    </Layout>
  );
};

export default WhatsappConfigList;
