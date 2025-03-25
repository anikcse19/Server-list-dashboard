import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { RiDeleteBin6Line } from "react-icons/ri";
import Layout from "../../../components/Layout/Layout";
import baseUrl from "../../../../config";
import SubClientSMSSettingModal from "../../../components/Modal/SubClientSMSSettingModal";
import SubClientSMSDeleteModal from "../../../components/Modal/SubClientSMSDeleteModal";
import useStore from "../../../zustand/useStore";

const SMSSetting = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [configList, setConfigList] = useState([]);
  const [filteredConfigList, setFilteredConfigList] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  // const [domainList, setDomainList] = useState([]);
  const [openConfigModal, setOpenConfigModal] = useState(false);

  const [openDeleteConfigModal, setOpenDeleteConfigModal] = useState({
    state: false,
    value: {},
  });
  // Items per page
  const ITEMS_PER_PAGE = 10;

  // const navigate = useNavigate();
  const { mode } = useStore();
  // const mode = "light";

  // get cookies value
  const token = Cookies.get("token");

  const fetchSMSSettingList = async () => {
    try {
      await axios
        .get(
          `${baseUrl}api/admin/sub-client/setting/sms/list`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setConfigList(res?.data?.data);
          setFilteredConfigList(res?.data?.data);
          // setDomainList(res?.data?.data?.configDomains);
        });
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSMSSettingList();
  }, [openConfigModal, openDeleteConfigModal]);

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

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredBets = configList.filter(
      (config) =>
        config?.name.toLowerCase().includes(searchValue) ||
        config?.domain.toLowerCase().includes(searchValue) ||
        config?.client.server.toLowerCase().includes(searchValue) ||
        config?.admin.name.toLowerCase().includes(searchValue)
    );
    setFilteredConfigList(filteredBets);
    setPageNo(1); // Reset to the first page on new search
  };

  const totalPages = useMemo(
    () => Math.ceil(filteredConfigList.length / ITEMS_PER_PAGE),
    [filteredConfigList]
  );

  const paginatedResults = useMemo(
    () =>
      filteredConfigList.length > 0
        ? filteredConfigList.slice(
            (pageNo - 1) * ITEMS_PER_PAGE,
            pageNo * ITEMS_PER_PAGE
          )
        : [],
    [filteredConfigList, pageNo]
  );
  return (
    <Layout>
      <div>
        <h1
          className={`${
            mode === "light" ? "text-black" : "text-white"
          } text-xl font-bold font-serif`}
        >
          Sub Client Settings
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
            <p className="text-base md:text-xl font-bold text-gray-600">
              Sub Client SMS List
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
              className="bg-teal-100 text-teal-700 px-5 py-1 rounded-md"
            >
              Create New
            </button>
          </div>
        </div>
        {/* search box */}
        <div className="px-3 my-2">
          <input
            onChange={handleSearch}
            className={` "outline-none border-b-2 border-slate-600  rounded px-5 py-1 italic" ${
              mode === "light" ? "bg-slate-100" : "bg-gray-600"
            } `}
            type="text"
            name=""
            id=""
            placeholder="Search"
          />
        </div>

        {/* table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 w-[calc(100vw-32px)] lg:w-[calc(100vw-320px)]">
          <table className="w-full text-sm text-left rtl:text-right text-white  ">
            <thead
              className={`sticky top-0 text-xs  uppercase ${
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
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Sub Client
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Responsible Admin
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
              ) : paginatedResults?.length <= 0 ? (
                <tr className="text-center text-sm">
                  <td colSpan={12} align="center">
                    <p className="text-red-500 py-2">No data found.</p>
                  </td>
                </tr>
              ) : (
                paginatedResults.map((config, i) => (
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
                      {config?.subclient?.domain}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.name}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {config?.admin?.name}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {formateDate(config?.created_at)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-5 flex flex-wrap items-center gap-3 justify-center self-center">
            {/* Previous button */}
            {pageNo > 1 && (
              <p
                onClick={() => setPageNo(pageNo - 1)}
                className={`border-2 px-2 rounded-md cursor-pointer ${
                  mode === "light"
                    ? "border-black text-black"
                    : "border-white text-white"
                }`}
              >
                Prev
              </p>
            )}

            {/* Page numbers */}
            {(() => {
              // Determine the range of page numbers to display
              let startPage = Math.max(1, pageNo - 5);
              let endPage = Math.min(totalPages, pageNo + 4);

              // Adjust start and end pages to always show 10 pages when possible
              if (endPage - startPage < 9) {
                if (startPage === 1) {
                  endPage = Math.min(totalPages, startPage + 9);
                } else if (endPage === totalPages) {
                  startPage = Math.max(1, endPage - 9);
                }
              }

              return Array.from(
                { length: endPage - startPage + 1 },
                (_, index) => {
                  const page = startPage + index;
                  return (
                    <p
                      key={page}
                      onClick={() => setPageNo(page)}
                      className={`border-2 px-2 rounded-md cursor-pointer ${
                        pageNo === page
                          ? mode === "light"
                            ? "bg-black text-white"
                            : "bg-slate-300 text-black"
                          : mode === "light"
                          ? "text-black border-black"
                          : "text-white"
                      }`}
                    >
                      {page}
                    </p>
                  );
                }
              );
            })()}

            {/* Next button */}
            {pageNo < totalPages && (
              <p
                onClick={() => setPageNo(pageNo + 1)}
                className={`border-2 px-2 rounded-md cursor-pointer ${
                  mode === "light"
                    ? "border-black text-black"
                    : "border-white text-white"
                }`}
              >
                Next
              </p>
            )}
          </div>
        )}
      </div>

      {/* modal */}
      {openConfigModal && (
        <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full">
          <SubClientSMSSettingModal
            openConfigModal={openConfigModal}
            setOpenConfigModal={setOpenConfigModal}
          />
        </div>
      )}

      {openDeleteConfigModal.state && (
        <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full">
          <SubClientSMSDeleteModal
            setOpenDeleteConfigModal={setOpenDeleteConfigModal}
            openDeleteConfigModal={openDeleteConfigModal}
          />
        </div>
      )}
    </Layout>
  );
};

export default SMSSetting;
