import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Layout from "../../../components/Layout/Layout";
import baseUrl from "../../../../config";
import useStore from "../../../zustand/useStore";

const ClientConfigPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [configList, setConfigList] = useState([]);

  const { mode } = useStore();
  // get cookies value
  const token = Cookies.get("token");

  const fetchConfigList = async () => {
    try {
      await axios
        .get(
          `${baseUrl}api/sub-client-area/get-my-all-configs`,

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
  }, []);

  return (
    <Layout>
      <div>
        <h1
          className={`${
            mode === "light" ? "text-black" : "text-white"
          } text-xl font-bold font-serif`}
        >
          Client Config Profile
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
              Config List
            </p>
          </div>
        </div>

        {/* table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto custom-scrollbar my-5 w-[calc(100vw-32px)] lg:w-[calc(100vw-320px)]">
          <table className="w-full text-sm text-left rtl:text-right text-white  ">
            <thead
              className={`sticky top-0 text-xs  uppercase ${
                mode === "light"
                  ? "bg-blue-100 text-black"
                  : "bg-gray-900 text-white"
              }    rounded-md`}
            >
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  SL No
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Domain
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Value
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
                      {config?.domain}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.name}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.value}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ClientConfigPage;
