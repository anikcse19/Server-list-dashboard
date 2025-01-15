/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ConfigModal = ({ setOpenConfigModal }) => {
  const [clientList, setClientList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [name, setName] = useState("");
  const [values, setValues] = useState("");

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
  const handleCreateGeneralConfig = async () => {
    const createGeneralConfigData = {
      clientId: selectedClientId,
      name: name,
      values: values,
    };
    try {
      await axios
        .post(
          `${baseUrl}api/admin/client/config-profile/general/create`,
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
            onChange={(e) => setName(e.target.value)}
            // onBlur={fetchSignleDomainData}
            type="text"
            name=""
            id=""
            placeholder="Enter name"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <input
            onChange={(e) => setValues(e.target.value)}
            value={values}
            type="text"
            name=""
            id=""
            placeholder="Enter values"
            className="p-2 outline-none border border-black cursor-pointer rounded"
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleCreateGeneralConfig}
            className="bg-teal-400 text-black px-5 py-2 rounded-md"
          >
            Create General Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
