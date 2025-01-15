import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateSubClientPage = () => {
  const [clientId, setClientId] = useState("");
  const [domainName, setDomainName] = useState("");
  const [clientList, setClientList] = useState([]);

  const navigate = useNavigate();

  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(`${baseUrl}api/admin/client/list?drop_downlist=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClientList(res?.data?.data));
  }, []);

  const handleCreateSubClient = async () => {
    try {
      const createSubClientData = {
        client_id: clientId,
        domain: domainName,
      };

      axios
        .post(`${baseUrl}api/admin/sub-client/create`, createSubClientData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            toast.success(res?.data?.message);
            navigate("/dashboard/sub-client-lists");
          } else {
            toast.error(res?.data?.message);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setClientId("");
      setDomainName("");
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
            <h1 className="font-bold">Create Sub Client</h1>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Client Id</p>
            <select
              name=""
              id=""
              onChange={(e) => {
                setClientId(e.target.value);
              }}
              value={clientId}
              className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
            >
              <option value="">Select --</option>
              {Object.keys(clientList)?.map((key) => (
                <option value={clientList[key]} key={clientList[key]}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-1 w-[300px]">
            <p>Domain</p>
            <div className="flex flex-col gap-y-2">
              <input
                onChange={(e) => setDomainName(e.target.value)}
                value={domainName}
                type="text"
                className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
                placeholder="Enter Domain Name"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCreateSubClient}
              className="bg-blue-200 text-blue-700 px-5 py-2 rounded-md"
            >
              Create New Sub Client
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSubClientPage;
