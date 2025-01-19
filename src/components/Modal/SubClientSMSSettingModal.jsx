/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const SubClientSMSSettingModal = ({ setOpenConfigModal }) => {
  const [clientList, setClientList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [configList, setConfigList] = useState([]);
  const [selectedConfigId, setSelectedConfigId] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState("");

  const token = Cookies.get("token");

  // get all client list
  useEffect(() => {
    // get all sub client
    axios
      .get(`${baseUrl}api/admin/sub-client/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClientList(res?.data?.data));

    // get all config
    axios
      .get(`${baseUrl}api/admin/client/config-profile/sms/get-allsms-configs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setConfigList(res?.data?.data));

    // get all admin with user type 3,4,5
    axios
      .get(`${baseUrl}api/admin/user-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          const filteredAdmin = res?.data?.data.filter(
            (user) =>
              user?.user_type === 3 ||
              user?.user_type === 4 ||
              user?.user_type === 5
          );
          setAdminList(filteredAdmin);
        }
      });
  }, []);

  // create all sms config
  const handleCreateSubclientSMS = async () => {
    const createGeneralConfigData = {
      sub_client_id: selectedClientId,
      config_id: selectedConfigId,
      wallet_admin_id: selectedAdminId,
    };
    try {
      await axios
        .post(
          `${baseUrl}api/admin/sub-client/setting/sms/create`,
          createGeneralConfigData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.status) {
            toast.success(res?.data?.message);
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
      className="w-[500px] h-fit bg-blue-100 px-5 py-10 rounded-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font-bold text-xl">
          Create New General Config
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
          <select
            name=""
            id=""
            onChange={(e) => {
              setSelectedClientId(e.target.value);
            }}
            className="p-2 outline-none border border-black cursor-pointer rounded"
          >
            <option value="">Select Sub Client</option>
            {clientList?.map((key) => (
              <option value={key?.id} key={key.id}>
                {key?.domain}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-y-1">
          <select
            name=""
            id=""
            onChange={(e) => {
              setSelectedConfigId(e.target.value);
            }}
            className="p-2 outline-none border border-black cursor-pointer rounded"
          >
            <option value="">Select Config</option>
            {configList?.map((key) => (
              <option value={key?.id} key={key.id}>
                {key?.name}---{key?.sender_id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-y-1">
          <select
            name=""
            id=""
            onChange={(e) => {
              setSelectedAdminId(e.target.value);
            }}
            className="p-2 outline-none border border-black cursor-pointer rounded"
          >
            <option value="">Select Wallet Admin</option>
            {adminList?.map((admin) => (
              <option value={admin?.id} key={admin.id}>
                {admin?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleCreateSubclientSMS}
            className="bg-teal-400 text-black px-5 py-2 rounded-md"
          >
            Create Sub-Client SMS
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubClientSMSSettingModal;
