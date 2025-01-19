/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ConfigModal = ({ openConfigModal, setOpenConfigModal }) => {
  const [clientList, setClientList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [smsToken, setSmsToken] = useState("");
  const [smsUser, setSmsUser] = useState("");
  const [smsSender, setSmsSender] = useState("");
  const [isChargable, setIsChargeable] = useState("");
  const [chargeAmount, setChargeAmount] = useState("");

  const token = Cookies.get("token");

  // get all client list
  useEffect(() => {
    axios
      .get(`${baseUrl}api/admin/client/list?drop_downlist=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClientList(res?.data?.data));
  }, []);

  // create all sms config
  const handleCreateConfig = async () => {
    // create mim sms
    if (openConfigModal.type === "mim") {
      const createConfigData = {
        clientId: selectedClientId,
        sender_id: senderId,
        values: {
          MIM_SMS_TOKEN: smsToken,
          MIM_SMS_USER: smsUser,
          MIM_SMS_SENDER_ID: senderId,
          is_chargeable: isChargable,
          charge_amount: chargeAmount,
        },
      };
      try {
        await axios
          .post(
            `${baseUrl}api/admin/client/config-profile/sms/set-mim-config`,
            createConfigData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res?.data?.status) {
              toast.success(res?.data?.message);
              setOpenConfigModal({ stata: false, type: "" });
            }
          });
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }

    // create greenweb sms
    if (openConfigModal.type === "greenweb") {
      const createConfigData = {
        clientId: selectedClientId,
        sender_id: senderId,
        values: {
          GREENWEB_SMS_TOKEN: smsToken,
          is_chargeable: isChargable,
          charge_amount: chargeAmount,
        },
      };
      try {
        await axios
          .post(
            `${baseUrl}api/admin/client/config-profile/sms/set-greenweb-config`,
            createConfigData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res?.data?.status) {
              toast.success(res?.data?.message);
              setOpenConfigModal({ stata: false, type: "" });
            } else {
              toast.error(res?.data?.message);
            }
          });
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }

    // create ssl sms
    if (openConfigModal.type === "ssl") {
      const createConfigData = {
        clientId: selectedClientId,
        sender_id: senderId,
        values: {
          SSL_SMS_TOKEN: smsToken,
          SSL_SMS_SID: senderId,
          is_chargeable: isChargable,
          charge_amount: chargeAmount,
        },
      };
      try {
        await axios
          .post(
            `${baseUrl}api/admin/client/config-profile/sms/set-sslsms-config`,
            createConfigData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res?.data?.status) {
              toast.success(res?.data?.message);
              setOpenConfigModal({ stata: false, type: "" });
            } else {
              toast.error(res?.data?.message);
            }
          });
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  // const fetchSignleDomainData = async () => {
  //   if (openConfigModal.type === "mim") {
  //     await axios
  //       .post(
  //         `${baseUrl}api/admin/client/get-mim-config`,
  //         {
  //           clientId: selectedClientId,
  //           domain: domainName,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res?.data?.status) {
  //           setSmsToken(res?.data?.data?.MIM_SMS_TOKEN);
  //           setSmsUser(res?.data?.data?.MIM_SMS_USER);
  //           setSmsSender(res?.data?.data?.MIM_SMS_SENDER_ID);
  //         } else {
  //           toast.error(res?.data?.message);
  //         }
  //       });
  //   }

  //   if (openConfigModal.type === "greenweb") {
  //     await axios
  //       .post(
  //         `${baseUrl}api/admin/client/get-greenweb-config`,
  //         {
  //           clientId: selectedClientId,
  //           domain: domainName,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res?.data?.status) {
  //           setSmsToken(res?.data?.data?.GREENWEB_SMS_TOKEN);
  //         } else {
  //           toast.error(res?.data?.message);
  //         }
  //       });
  //   }

  //   if (openConfigModal.type === "ssl") {
  //     await axios
  //       .post(
  //         `${baseUrl}api/admin/client/get-sslsms-config`,
  //         {
  //           clientId: selectedClientId,
  //           domain: domainName,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res?.data?.status) {
  //           setSmsToken(res?.data?.data?.SSL_SMS_TOKEN);
  //           setSmsSender(res?.data?.data?.SSL_SMS_SID);
  //         } else {
  //           toast.error(res?.data?.message);
  //         }
  //       });
  //   }
  // };

  return (
    <div
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
      className="w-[500px] h-fit bg-blue-100 px-5 py-10 rounded-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font-bold text-xl">Create New Config</p>
        <button
          onClick={() => {
            setOpenConfigModal({ state: false, type: "" });
          }}
          className="bg-rose-600 text-white px-5 py-2 rounded-md"
        >
          Close
        </button>
      </div>
      {/* form */}
      <div className="flex flex-col gap-5 mt-8 px-5">
        <div className="flex flex-col gap-y-1">
          <select
            name=""
            id=""
            onChange={(e) => {
              setSelectedClientId(e.target.value);
            }}
            className="p-2 outline-none border border-black cursor-pointer rounded"
          >
            <option value="">Select Client Id</option>
            {Object.keys(clientList)?.map((key) => (
              <option value={clientList[key]} key={clientList[key]}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setSenderId(e.target.value)}
            // onBlur={fetchSignleDomainData}
            type="text"
            name=""
            id=""
            placeholder="Type sender id"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setSmsToken(e.target.value)}
            value={smsToken}
            type="text"
            name=""
            id=""
            placeholder="Type SMS Token"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>

        {openConfigModal.type === "mim" && (
          <div className="flex flex-col gap-y-1">
            <input
              onChange={(e) => setSmsUser(e.target.value)}
              value={smsUser}
              type="text"
              name=""
              id=""
              placeholder="Type SMS User"
              className="p-2 outline-none border border-black cursor-pointer rounded"
            />
          </div>
        )}
        {/* {(openConfigModal.type === "mim" || openConfigModal.type === "ssl") && (
          <div className="flex flex-col gap-y-1">
            <input
              onChange={(e) => setSenderId(e.target.value)}
              value={senderId}
              type="text"
              name=""
              id=""
              placeholder="Type SMS Sender ID"
              className="p-2 outline-none border border-black cursor-pointer rounded"
            />
          </div>
        )} */}

        <div className="flex flex-col gap-y-1">
          <select
            onChange={(e) => setIsChargeable(e.target.value)}
            value={isChargable}
            className="p-2 outline-none border border-black cursor-pointer rounded"
          >
            <option value="">Select Is It Chargable</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setChargeAmount(e.target.value)}
            value={chargeAmount}
            type="text"
            name=""
            id=""
            placeholder="Enter Charge Amount"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleCreateConfig}
            className="bg-teal-400 text-black px-5 py-2 rounded-md"
          >
            Create{" "}
            {openConfigModal.type === "mim"
              ? "MIM"
              : openConfigModal.type === "greenweb"
              ? "GREENWEB"
              : "SSL"}{" "}
            SMS Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
