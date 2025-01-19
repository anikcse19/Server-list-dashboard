import Layout from "../../components/Layout/Layout";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../config";
import ConfigModal from "../../components/Modal/ConfigModal";
import ConfigDetails from "../../components/Modal/ConfigDetails";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfigDeleteModal from "../../components/Modal/ConfigDeleteModal";

const ConfigsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [configList, setConfigList] = useState([]);
  // const [domainList, setDomainList] = useState([]);
  const [openConfigModal, setOpenConfigModal] = useState({
    state: false,
    type: "",
  });
  const [openConfigDetailsModal, setOpenConfigDetailsModal] = useState({
    state: false,
    value: {},
    type: "",
  });
  const [openDeleteConfigModal, setOpenDeleteConfigModal] = useState({
    state: false,
    value: {},
  });
  // const navigate = useNavigate();
  // const { mode } = useStore();
  const mode = "light";

  // get cookies value
  const token = Cookies.get("token");

  const fetchConfigList = async () => {
    try {
      await axios
        .get(
          `${baseUrl}api/admin/client/config-profile/sms/get-allsms-configs`,

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
  }, [openConfigModal.type, openDeleteConfigModal]);

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
        <h1 className="text-xl font-bold">Config Profile</h1>
      </div>
      {/* body */}
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
        className="w-full min-h-96 h-fit bg-white mt-10 py-3 rounded-md"
      >
        <div className="flex items-center justify-between px-3">
          <div>
            <p className="text-xl font-bold text-gray-600">SMS Config List</p>
          </div>
          <div className="flex items-center gap-4 my-5">
            <button
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              }}
              onClick={() => {
                setOpenConfigModal({ state: true, type: "mim" });
              }}
              className="bg-teal-100 text-teal-700 px-5 py-1 rounded-md"
            >
              Create MIM SMS Config
            </button>
            <button
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              }}
              onClick={() => {
                setOpenConfigModal({ state: true, type: "greenweb" });
              }}
              className="bg-rose-100 text-rose-700 px-5 py-1 rounded-md"
            >
              Create GREENWEB SMS Config
            </button>{" "}
            <button
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              }}
              onClick={() => {
                setOpenConfigModal({ state: true, type: "ssl" });
              }}
              className="bg-purple-100 text-purple-700 px-5 py-1 rounded-md"
            >
              Create SSL SMS Config
            </button>
          </div>
        </div>

        {/* table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5">
          <table className="w-full text-sm text-left rtl:text-right text-white  ">
            <thead
              className={`sticky top-0 text-xs  uppercase ${"bg-blue-100 text-black"}   rounded-md`}
            >
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  SL No
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Sender Id
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Info
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
                configList.map((config, i) => (
                  <tr
                    key={config.id}
                    className={`${
                      mode === "light"
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                    }  text-sm cursor-pointer transition-all duration-500 ease-in  border-b-2 border-blue-100`}
                  >
                    <td className="px-6 py-4 text-left text-xs">{i + 1}</td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.client?.server}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.sender_id}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.name}
                    </td>

                    <td className="px-6 py-4 text-left text-xs">
                      {formateDate(config?.created_at)}
                    </td>
                    <td className="px-6 py-4 text-center text-xs">
                      <button
                        onClick={() =>
                          setOpenConfigDetailsModal({
                            state: true,
                            value: config,
                            type: config?.name.toLowerCase()?.includes("mim")
                              ? "mim"
                              : config?.name.toLowerCase()?.includes("greenweb")
                              ? "greenweb"
                              : "ssl",
                          })
                        }
                        className="bg-gray-500 px-2 py-0.5 rounded-md text-white"
                      >
                        See Details
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center text-xs">
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}
      {openConfigModal.state && (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 ">
          <ConfigModal
            openConfigModal={openConfigModal}
            setOpenConfigModal={setOpenConfigModal}
          />
        </div>
      )}

      {openConfigDetailsModal.state && (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 ">
          <ConfigDetails
            openConfigDetailsModal={openConfigDetailsModal}
            setOpenConfigDetailsModal={setOpenConfigDetailsModal}
          />
        </div>
      )}

      {openDeleteConfigModal.state && (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <ConfigDeleteModal
            setOpenDeleteConfigModal={setOpenDeleteConfigModal}
            openDeleteConfigModal={openDeleteConfigModal}
          />
        </div>
      )}
    </Layout>
  );
};

export default ConfigsList;
