import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../../config";
import Layout from "../../../components/Layout/Layout";
import SetGroupConfigModal from "../../../components/Modal/SetGroupConfigModal";

const SetGroupConfigPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subClientList, setSubClientList] = useState([]);

  const [openSetConfigModal, setOpenSetConfigModal] = useState({
    state: false,
    value: {},
  });
  // const navigate = useNavigate();
  // const { mode } = useStore();
  const mode = "light";

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

  return (
    <Layout>
      <div>
        <h1 className="text-xl font-bold">Set Group Config</h1>
      </div>
      {/* body */}
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
        className="w-full min-h-96 h-fit bg-white mt-10 py-3 rounded-md"
      >
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between px-3">
          <div>
            <p className="text-base md:text-xl font-bold text-gray-600">
              Sub Client List
            </p>
          </div>
        </div>

        {/* table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 w-[calc(100vw-32px)] lg:w-[calc(100vw-320px)]">
          <table className="w-full text-sm text-left rtl:text-right text-white  ">
            <thead
              className={`sticky top-0 text-xs  uppercase ${"bg-blue-100 text-black"}   rounded-md`}
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
                        onClick={() =>
                          setOpenSetConfigModal({
                            state: true,
                            value: config,
                          })
                        }
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
