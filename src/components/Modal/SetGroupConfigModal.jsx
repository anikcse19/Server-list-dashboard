/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SetGroupConfigModal = ({ openSetConfigModal, setOpenSetConfigModal }) => {
  const [configDetails, setConfigDetails] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  const token = Cookies.get("token");

  // get all client list
  useEffect(() => {
    axios
      .get(
        `${baseUrl}api/sub-client-area/set-config/get-tg-group-alert-code/${openSetConfigModal.value.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setConfigDetails(res?.data));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/sub-client-area/set-config/get-tg-group-status/${openSetConfigModal.value.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.status) {
          setIsVerified(true);
          clearInterval(interval); // Stop polling when verified
          toast.success("Verification successful!");
          setOpenSetConfigModal({ state: false, value: {} });
        }
        {
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Error during polling:", error);
      }
    }, 2000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [openSetConfigModal.value.id, token]);

  console.log(isVerified, "isVerified");

  return (
    <div
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
      className="w-[90%] mx-auto lg:w-[500px] h-fit bg-blue-100 px-5 py-10 rounded-md"
    >
      {/* form */}
      <div className="flex flex-col gap-y-5">
        <p>{configDetails.instruction}</p>

        <div className="flex items-center gap-3">
          <p>Code :</p>
          <div className="flex items-center gap-2">
            <p className="text-green-500 inline">
              {configDetails?.data?.group_token}
            </p>
            <FaCopy
              onClick={() => {
                navigator.clipboard.writeText(configDetails?.data?.group_token);
                toast.success("Copied");
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div>
          Link :{" "}
          <Link
            className="text-blue-400"
            to={configDetails?.bot_link}
            target="_blank"
          >
            {configDetails?.bot_link}
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default SetGroupConfigModal;
