/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useEffect } from "react";

const WhatsappConfigUpdateModal = ({
  setOpenConfigUpdateModal,
  openConfigUpdateModal,
}) => {
  const [senderId, setSenderId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [authKey, setAuthKey] = useState("");
  const [apiLink, setApiLink] = useState("");
  const [qrCode, setQrCode] = useState("");

  const token = Cookies.get("token");

  const fetchSingleConfigData = async () => {
    await axios
      .get(
        `${baseUrl}api/admin/client/config-profile/wa/get-wa-profile/${openConfigUpdateModal.value.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("single data", res?.data?.data);
        setSenderId(res?.data?.data?.sender_id);
        setSenderName(res?.data?.data?.sender_name);
        setApiKey(res?.data?.data?.app_key);
        setAuthKey(res?.data?.data?.auth_key);
        setApiLink(res?.data?.data?.api_link);
      });
  };

  useEffect(() => {
    fetchSingleConfigData();
  }, []);

  // create all sms config
  const handleUpdateWhatsappConfig = async () => {
    console.log(
      "check",
      senderId,
      senderName,
      apiKey,
      authKey,
      apiLink,
      qrCode
    );

    const updateConfigDate = {
      sender_id: senderId,
      app_key: apiKey,
      auth_key: authKey,
      api_link: apiLink,
    };

    try {
      await axios
        .put(
          `${baseUrl}api/admin/client/config-profile/wa/update-wa-profile/${openConfigUpdateModal.value.id}`,
          updateConfigDate,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.status) {
            toast.success("Whatsapp config updated successfully");
            setOpenConfigUpdateModal({
              state: false,
              value: {},
            });
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
      className="w-[90%] mx-auto lg:w-[500px] h-fit bg-blue-100 px-5 py-10 rounded-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font-bold text-xl">
          Update Whatsapp Config
        </p>
        <button
          onClick={() => {
            setOpenConfigUpdateModal({
              state: false,
              value: {},
            });
          }}
          className="bg-rose-600 text-white px-5 py-2 rounded-md"
        >
          Close
        </button>
      </div>
      {/* form */}
      <div className="flex flex-col gap-5 mt-8 px-5">
        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setSenderId(e.target.value)}
            value={senderId}
            // onBlur={fetchSignleDomainData}
            type="text"
            name=""
            id=""
            placeholder="Enter sender id"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>
        {/* <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setSenderName(e.target.value)}
            value={senderName}
            type="text"
            name=""
            id=""
            placeholder="Enter sender name"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div> */}
        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setApiKey(e.target.value)}
            value={apiKey}
            // onBlur={fetchSignleDomainData}
            type="text"
            name=""
            id=""
            placeholder="Enter api key"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setAuthKey(e.target.value)}
            value={authKey}
            // onBlur={fetchSignleDomainData}
            type="text"
            name=""
            id=""
            placeholder="Enter auth key"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setApiLink(e.target.value)}
            value={apiLink}
            // onBlur={fetchSignleDomainData}
            type="text"
            name=""
            id=""
            placeholder="Enter api link"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>
        {/* <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setQrCode(e.target.files[0])}
            // onBlur={fetchSignleDomainData}
            type="file"
            name=""
            id=""
            placeholder="Select Qr Code Image"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div> */}

        <div className="flex justify-center items-center">
          <button
            onClick={handleUpdateWhatsappConfig}
            className="bg-teal-400 text-black px-5 py-2 rounded-md"
          >
            Update WhatsApp Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsappConfigUpdateModal;
