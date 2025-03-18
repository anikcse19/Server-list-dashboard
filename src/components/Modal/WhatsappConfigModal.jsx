/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const WhatsappConfigModal = ({ setOpenConfigModal }) => {
  const [senderId, setSenderId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [authKey, setAuthKey] = useState("");
  const [apiLink, setApiLink] = useState("");
  const [qrCode, setQrCode] = useState("");

  const token = Cookies.get("token");

  // create all sms config
  const handleCreateWhatsappConfig = async () => {
    console.log(
      "check",
      senderId,
      senderName,
      apiKey,
      authKey,
      apiLink,
      qrCode
    );

    const formData = new FormData();
    formData.append("sender_id", senderId);
    formData.append("sender_name", senderName);
    formData.append("app_key", apiKey);
    formData.append("auth_key", authKey);
    formData.append("api_link", apiLink);
    if (qrCode) {
      formData.append("qr_code", qrCode);
    }

    console.log("check", formData);

    try {
      await axios
        .post(
          `${baseUrl}api/admin/client/config-profile/wa/create-wa-profile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.status) {
            toast.success("Whatsapp Config Created Successfully");
            setOpenConfigModal(false);
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
          Create New Whatsapp Config
        </p>
        <button
          onClick={() => {
            setOpenConfigModal(false);
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
            // onBlur={fetchSignleDomainData}
            type="text"
            name=""
            id=""
            placeholder="Enter sender id"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setSenderName(e.target.value)}
            value={senderName}
            type="text"
            name=""
            id=""
            placeholder="Enter sender name"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setApiKey(e.target.value)}
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
            // onBlur={fetchSignleDomainData}
            type="text"
            name=""
            id=""
            placeholder="Enter api link"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setQrCode(e.target.files[0])}
            // onBlur={fetchSignleDomainData}
            type="file"
            name=""
            id=""
            placeholder="Select Qr Code Image"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleCreateWhatsappConfig}
            className="bg-teal-400 text-black px-5 py-2 rounded-md"
          >
            Create WhatsApp Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsappConfigModal;
