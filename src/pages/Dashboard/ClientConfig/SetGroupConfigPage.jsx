import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../../config";
import Layout from "../../../components/Layout/Layout";
import SetGroupConfigModal from "../../../components/Modal/SetGroupConfigModal";
import useStore from "../../../zustand/useStore";

const SetGroupConfigPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subClientList, setSubClientList] = useState([]);

  const [openSetConfigModal, setOpenSetConfigModal] = useState({
    state: false,
    value: {},
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
  const [selectedConfig, setSelectedConfig] = useState(null); // Store the selected config
  // const navigate = useNavigate();
  const { mode } = useStore();

  // get cookies value
  const token = Cookies.get("token");

  const fetchSubClientList = async () => {
    try {
      await axios
        .get(
          `${baseUrl}api/sub-client-area/get-my-sub-clients`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSubClientList(res?.data?.data);
          // setDomainList(res?.data?.data?.configDomains);
        });
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubClientList();
  }, []);

  const handleConfirm = () => {
    // If user confirms, proceed with the operation
    setOpenSetConfigModal({
      state: true,
      value: selectedConfig,
    });
    setShowConfirmModal(false); // Close the confirmation modal
  };

  const handleCancel = () => {
    // If user cancels, just close the confirmation modal
    setShowConfirmModal(false);
    setSelectedConfig(null);
  };
  return (
    <Layout>
      <div>
        <h1
          className={`${
            mode === "light" ? "text-black" : "text-white"
          } text-xl font-bold font-serif`}
        >
          Set Group Config
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
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between px-3">
          <div>
            <p className="text-base md:text-xl font-bold text-gray-600">
              Sub Client List
            </p>
          </div>
        </div>

        {/* table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto custom-scrollbar my-5 w-[calc(100vw-32px)] lg:w-[calc(100vw-320px)]">
          <table className="w-full text-sm text-left rtl:text-right text-white  ">
            <thead
              className={`sticky top-0 text-xs  uppercase  ${
                mode === "light"
                  ? "bg-blue-100 text-black"
                  : "bg-gray-900 text-white"
              }   rounded-md`}
            >
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  SL No
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Domain
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
              ) : subClientList?.length <= 0 ? (
                <tr className="text-center text-sm">
                  <td colSpan={12} align="center">
                    <p className="text-red-500 py-2">No data found.</p>
                  </td>
                </tr>
              ) : (
                subClientList.map((config, i) => (
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
                      {config?.domain}
                    </td>

                    <td className="px-6 py-4 text-center text-xs">
                      <button
                        onClick={() => {
                          setSelectedConfig(config); // Store the selected config
                          setShowConfirmModal(true); // Show the confirmation modal
                        }}
                        className="bg-gray-500 px-2 py-0.5 rounded-md text-white"
                      >
                        Set Config
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md shadow-md w-[90%] max-w-md">
            <p className="text-lg font-bold mb-4">
              Are you sure to set new config?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                No
              </button>
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* modal */}
      {openSetConfigModal.state && (
        <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full">
          <SetGroupConfigModal
            openSetConfigModal={openSetConfigModal}
            setOpenSetConfigModal={setOpenSetConfigModal}
          />
        </div>
      )}
    </Layout>
  );
};

export default SetGroupConfigPage;
