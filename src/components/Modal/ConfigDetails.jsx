/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../../../config";
import Cookies from "js-cookie";

const ConfigDetails = ({
  openConfigDetailsModal,
  setOpenConfigDetailsModal,
}) => {
  const [details, setDetails] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    if (openConfigDetailsModal?.type === "mim") {
      axios
        .post(
          `${baseUrl}api/admin/client/config-profile/sms/get-mim-config`,
          {
            clientId: openConfigDetailsModal?.value?.clientId.toString(),
            sender_id: openConfigDetailsModal?.value?.sender_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res?.data?.status) {
            setDetails(res?.data?.data);
          }
        });
    }

    if (openConfigDetailsModal?.type === "greenweb") {
      axios
        .post(
          `${baseUrl}api/admin/client/config-profile/sms/get-greenweb-config`,
          {
            clientId: openConfigDetailsModal?.value?.clientId.toString(),
            sender_id: openConfigDetailsModal?.value?.sender_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res?.data?.status) {
            setDetails(res?.data?.data);
          }
        });
    }

    if (openConfigDetailsModal?.type === "ssl") {
      axios
        .post(
          `${baseUrl}api/admin/client/config-profile/sms/get-sslsms-config`,
          {
            clientId: openConfigDetailsModal?.value?.clientId.toString(),
            sender_id: openConfigDetailsModal?.value?.sender_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res?.data?.status) {
            setDetails(res?.data?.data);
          }
        });
    }
  }, []);

  console.log(details, "det");

  return (
    <div
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
      className="w-[500px] h-fit bg-blue-100 px-5 py-10 rounded-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font-bold text-base">Config Details</p>
        <button
          onClick={() => {
            setOpenConfigDetailsModal({ state: false, value: "" });
          }}
          className="bg-rose-600 text-white px-2 py-0.5 rounded-md"
        >
          Close
        </button>
      </div>
      {/* body */}
      <div className="flex flex-col gap-y-4 mt-10">
        {Object.keys(details).map((key) => (
          <div className="flex items-center justify-between" key={key}>
            <p>{key}</p>
            <p className="text-xs text-gray-700">{details[key]}</p>
          </div>
        ))}

        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ConfigDetails;
