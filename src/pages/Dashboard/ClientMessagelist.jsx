import Layout from "../../components/Layout/Layout";
import useStore from "../../zustand/useStore";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";

const ClientMessageListPage = () => {
  const [clientsList, setClientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPagNo] = useState(1);
  const [pages, setPages] = useState([]);
  const [lastPage, setLastPage] = useState();
  const { mode } = useStore();

  // get cookies value
  const token = Cookies.get("token");

  const fetchClientsList = async () => {
    try {
      axios
        .get(`${baseUrl}api/admin/wa-client/list-with-msg?page=${pageNo}`, {
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

  return (
    <Layout>
      {/* search box */}
      {/* <div className="mt-5 flex items-center gap-x-2">
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
      </div> */}

      {/* users table */}
      <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right text-white  ">
          <thead
            className={`sticky top-0 text-xs   ${
              mode === "light"
                ? "bg-blue-300 text-black"
                : "bg-black text-white"
            } border-2 border-black rounded-md`}
          >
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs">
                Sl No
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs">
                Server
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs">
                Message
              </th>

              <th scope="col" className="px-6 py-3 text-left text-xs">
                Created Date
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="text-center text-sm">
                <td colSpan={4} align="center">
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
            ) : clientsList.length <= 0 ? (
              <tr className="text-center text-sm">
                <td colSpan={4} align="center">
                  <p className="py-2 text-black">No data to show</p>
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
                  }  text-sm cursor-pointer transition-all duration-500 ease-in border-l-2 border-r-2   border-b-2 border-slate-700`}
                >
                  <td className="px-6 py-4 text-left text-xs">{i + 1}</td>
                  <td className="px-6 py-4 text-left text-xs">
                    {client?.wa_client?.server}
                  </td>
                  <td className="px-6 py-4 text-left text-xs">{client?.msg}</td>

                  <td className="px-6 py-4 text-left text-xs">
                    {formateDate(client?.created_at)}
                  </td>
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
    </Layout>
  );
};

export default ClientMessageListPage;
