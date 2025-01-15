import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateClientPage = () => {
  const [serverName, setServerName] = useState("");
  const [alertNo, setAlertNo] = useState("");
  const [waAlertNo, setWaAlertNo] = useState([]);

  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleCreateClient = async () => {
    try {
      const createClientData = {
        server: serverName,
        waAlertNo: waAlertNo.join(","),
      };

      axios
        .post(`${baseUrl}api/admin/client/create`, createClientData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            toast.success(res?.data?.message);
            navigate("/dashboard/client-lists");
          } else {
            toast.error(res?.data?.message);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setServerName("");
      setAlertNo("");
      setWaAlertNo([]);
    }
  };
  return (
    <Layout>
      <div className="w-full h-screen flex justify-center mt-20 ">
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className=" flex flex-col gap-y-5 border-2 border-black h-fit p-10 rounded-md bg-white"
        >
          <div className="flex justify-center">
            <h1 className="font-bold">Create Client</h1>
          </div>
          <div className="flex flex-col gap-y-2 mt-5">
            <label htmlFor="server_name">Server Name</label>
            <input
              onChange={(e) => setServerName(e.target.value)}
              value={serverName}
              type="text"
              className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
            />
          </div>

          <div className="flex flex-col gap-y-2 w-[300px]">
            <p>Wa Alert No</p>
            <div className="flex items-center gap-2 flex-wrap">
              {waAlertNo.map((wa, i) => (
                <p
                  className="bg-green-200 text-green-700 px-2 py-1 rounded"
                  key={i}
                >
                  {wa}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-y-2">
              <input
                onChange={(e) => setAlertNo(e.target.value)}
                value={alertNo}
                type="text"
                className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
                placeholder="Add Alert No"
              />
              <div className="flex justify-end">
                <p
                  onClick={() => {
                    if (alertNo !== "") {
                      setWaAlertNo((prev) => [...prev, alertNo]);
                      setAlertNo("");
                    }
                  }}
                  className="bg-black opacity-80 text-white px-5 py-1 cursor-pointer rounded-md"
                >
                  Add
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCreateClient}
              className="bg-blue-200 text-blue-700 px-5 py-2 rounded-md"
            >
              Create New Client
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateClientPage;
