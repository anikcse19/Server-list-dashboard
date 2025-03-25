import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import baseUrl from "../../../../config";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useStore from "../../../zustand/useStore";

const TransactionHistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactionHistories, setTransactionHistories] = useState([]);
  const [isOpenCreditAmount, setIsOpenCreditAmount] = useState(false);
  const [isOpenDebitAmount, setIsOpenDebitAmount] = useState(false);
  const [creditedAmount, setCreditedAmount] = useState(0);
  const [debitedAmount, setDebitedAmount] = useState(0);
  const [debitedPurpose, setDebitedPurpose] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  // const mode = "light";
  const { mode } = useStore();

  // get cookies value
  const token = Cookies.get("token");

  const fetchAdminTransactionHistory = async () => {
    try {
      await axios
        .get(
          `${baseUrl}api/admin/wallet/trx-history/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTransactionHistories(res?.data?.history);
          // setDomainList(res?.data?.data?.configDomains);
        });
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminTransactionHistory();
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

  const handleAddMoney = async () => {
    try {
      const addMoneyData = {
        admin_user_id: id,
        credit_amount: creditedAmount,
      };

      await axios
        .post(`${baseUrl}api/admin/wallet/add-balance`, addMoneyData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            toast.success("Successfully Credited Amount");
            fetchAdminTransactionHistory();
            setIsOpenCreditAmount(false);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDeductMoney = async () => {
    try {
      const deductMoneyData = {
        admin_user_id: id,
        debit_amount: debitedAmount,
        purpose: debitedPurpose,
      };

      await axios
        .post(`${baseUrl}api/admin/wallet/deduct-balance`, deductMoneyData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            toast.success("Successfully Debited Amount");
            fetchAdminTransactionHistory();
            setIsOpenDebitAmount(false);
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
          Admin Transaction History
        </h1>
      </div>

      <div className="mt-6">
        <button
          className="bg-red-100 border-2 border-red-600 text-red-600 hover:bg-rose-200  px-6 py-1 rounded-md"
          onClick={() => navigate(-1)}
        >
          {" "}
          Back
        </button>
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
              Transaction History : {transactionHistories[0]?.admin?.name}
            </p>
          </div>
          <div className="flex items-center gap-4 my-5">
            {/* credit money */}
            <div className="flex items-center gap-4">
              {!isOpenCreditAmount && !isOpenDebitAmount && (
                <button
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                  }}
                  onClick={() => {
                    setIsOpenCreditAmount(true);
                  }}
                  className="bg-teal-100 text-teal-700 px-5 py-1 rounded-md"
                >
                  Add Money
                </button>
              )}
              {isOpenCreditAmount && (
                <div className="flex items-center gap-x-3">
                  <input
                    onChange={(e) => setCreditedAmount(e.target.value)}
                    placeholder="Enter credit amount"
                    className="outline-none px-5 py-1 rounded border-2 border-green-600"
                    type="text"
                  />
                  <div className="flex items-center gap-x-2">
                    <button
                      onClick={handleAddMoney}
                      style={{
                        boxShadow:
                          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                      }}
                      className="bg-green-600 text-white px-5 py-1 rounded"
                    >
                      Done
                    </button>
                    <button
                      style={{
                        boxShadow:
                          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                      }}
                      onClick={() => setIsOpenCreditAmount(false)}
                      className="bg-red-600 text-white px-5 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* debit money */}
            <div className="flex items-center gap-4">
              {!isOpenCreditAmount && !isOpenDebitAmount && (
                <button
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                  }}
                  onClick={() => {
                    setIsOpenDebitAmount(true);
                  }}
                  className="bg-rose-100 text-rose-700 px-5 py-1 rounded-md"
                >
                  Deduct Money
                </button>
              )}
              {isOpenDebitAmount && (
                <div className="flex items-center gap-x-3">
                  <input
                    onChange={(e) => setDebitedAmount(e.target.value)}
                    placeholder="Enter debit amount"
                    className="outline-none px-5 py-1 rounded border-2 border-red-600"
                    type="text"
                  />
                  <input
                    onChange={(e) => setDebitedPurpose(e.target.value)}
                    placeholder="Type deduct purpose"
                    className="outline-none px-5 py-1 rounded border-2 border-red-600"
                    type="text"
                  />
                  <div className="flex items-center gap-x-2">
                    <button
                      onClick={handleDeductMoney}
                      style={{
                        boxShadow:
                          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                      }}
                      className="bg-green-600 text-white px-5 py-1 rounded"
                    >
                      Done
                    </button>
                    <button
                      style={{
                        boxShadow:
                          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                      }}
                      onClick={() => setIsOpenDebitAmount(false)}
                      className="bg-red-600 text-white px-5 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5">
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
                  Balnce
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Credited
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Debited
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Trx Id
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Trx Type
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Purpose
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Date
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
              ) : transactionHistories?.length <= 0 ? (
                <tr className="text-center text-sm">
                  <td colSpan={12} align="center">
                    <p className="text-red-500 py-2">No data found.</p>
                  </td>
                </tr>
              ) : (
                transactionHistories.map((trx, i) => (
                  <tr
                    key={trx.id}
                    className={`${
                      mode === "light"
                        ? "bg-white text-black"
                        : "bg-transparent text-white"
                    }  text-sm cursor-pointer transition-all duration-500 ease-in  border-b-2 border-blue-100`}
                  >
                    <td className="px-6 py-4 text-left text-xs">{i + 1}</td>
                    <td className="px-6 py-4 text-left text-xs">
                      {trx?.balance}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {trx?.credit_amount}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {trx?.debit_amount}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {trx?.trx_id}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {trx?.trx_type}
                    </td>{" "}
                    <td className="px-6 py-4 text-left text-xs">
                      {trx?.trx_status}
                    </td>{" "}
                    <td className="px-6 py-4 text-left text-xs">
                      {trx?.purpose}
                    </td>
                    <td className="px-6 py-4 text-left text-xs">
                      {formateDate(trx?.created_at)}
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

export default TransactionHistoryPage;
