import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
import baseUrl from "../../../../config";
import Layout from "../../../components/Layout/Layout";

const SendSMSWAAlert = () => {
  const [alertNo, setAlertNo] = useState("");
  const [waAlertNo, setWaAlertNo] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [waConfigList, setWaConfigConfigList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedWaProfileId, setSelectedWaProfileId] = useState("");

  const [adminList, setAdminList] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState("");

  const token = Cookies.get("token");
  // const navigate = useNavigate();

  useEffect(() => {
    // get all sub client
    axios
      .get(`${baseUrl}api/admin/sub-client/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClientList(res?.data?.data));

    // get all wa configs
    axios
      .get(`${baseUrl}api/admin/client/config-profile/wa/list-wa-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setWaConfigConfigList(res?.data?.data));

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

  const handleCreateWAAlert = async () => {
    try {
      const createWAAlertData = {
        wallet_admin_id: selectedAdminId,
        sub_client_id: selectedClientId,
        wa_sender_profile_id: selectedWaProfileId,
        wa_no: waAlertNo.join(","),
      };

      axios
        .post(
          `${baseUrl}api/admin/sub-client/setting/sms/set-wa-subalert`,
          createWAAlertData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.status) {
            toast.success(res?.data?.message);
            // navigate("/dashboard/client-lists");
          } else {
            toast.error(res?.data?.message);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setSelectedAdminId("");
      setSelectedClientId("");
      setSelectedWaProfileId("");
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
            <h1 className="font-bold">Set WA Alert</h1>
          </div>
          <div className="flex flex-col gap-y-2 mt-5">
            <select
              onChange={(e) => setSelectedAdminId(e.target.value)}
              value={selectedAdminId}
              type="text"
              className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
            >
              <option value="">Select admin wallet</option>
              {adminList?.map((admin) => (
                <option key={admin?.id} value={admin?.id}>
                  {admin?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-y-2 mt-5">
            <select
              onChange={(e) => setSelectedClientId(e.target.value)}
              value={selectedClientId}
              type="text"
              className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
            >
              <option value="">Select sub client</option>
              {clientList?.map((client) => (
                <option key={client?.id} value={client?.id}>
                  {client?.domain}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-2 mt-5">
            <select
              onChange={(e) => setSelectedWaProfileId(e.target.value)}
              value={selectedWaProfileId}
              type="text"
              className="w-[300px] py-3 px-3 rounded-md outline-none border-2 border-black"
            >
              <option value="">Select Whatsapp Profile</option>
              {waConfigList?.map((profile) => (
                <option key={profile?.id} value={profile?.id}>
                  {profile?.sender_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-2 w-[300px] mt-5">
            {/* <p>Wa Alert No</p> */}
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
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCreateWAAlert}
              className="bg-blue-200 text-blue-700 px-5 py-2 rounded-md"
            >
              Create WA Alert
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SendSMSWAAlert;
