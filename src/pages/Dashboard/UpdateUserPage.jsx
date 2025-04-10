import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
import useStore from "../../zustand/useStore";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const UpdateUserPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [serverIds, setServerIds] = useState([]);
  const [subClientIds, setSubClientIds] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [subClientsList, setSubClientsList] = useState([]);
  const [adminRoleList, setAdminRoleList] = useState([]);
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const token = Cookies.get("token");
  const { mode } = useStore();

  const fetchClientsList = async () => {
    try {
      axios
        .get(`${baseUrl}api/admin/client/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            setClientsList(res?.data?.data?.data);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchSubClientsList = async () => {
    try {
      axios
        .get(`${baseUrl}api/admin/sub-client/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            setSubClientsList(res?.data?.data);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchAllRoleList = async () => {
    await axios
      .get(`${baseUrl}api/admin/role-list`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setAdminRoleList(res?.data?.data);
        }
      });
  };

  useEffect(() => {
    fetchClientsList();
    fetchSubClientsList();
    fetchAllRoleList();
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl}api/admin/get-user-data/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setFullName(res?.data?.data?.name);
          setEmail(res?.data?.data?.email);
          setRole(res?.data?.data?.user_type);
          setServerIds(res?.data?.data?.serverIds);
          setSubClientIds(res?.data?.data?.subClientIds);
        }
      });
  }, []);

  const handleUpdateUser = async () => {
    try {
      const createUserData = {
        email,
        full_name: fullName,
        role_type: parseInt(role),
        serverIds: serverIds,
        subClientIds: subClientIds,
        password: password,
      };

      axios
        .post(`${baseUrl}api/admin/get-user-data/${id}`, createUserData, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          if (res?.data?.status) {
            toast.success(res?.data?.message);
            navigate("/dashboard/user-lists");
          } else {
            toast.error(res?.data?.message);
          }
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setFullName("");
      setEmail("");
      // setPassword("");
      setRole("");
    }
  };

  return (
    <Layout>
      <div className="w-full h-screen flex justify-center mt-20 ">
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className={`${
            mode === "light" ? "bg-white" : "bg-gray-900"
          } flex flex-col gap-y-5 border-2 border-black h-fit p-10 rounded-md w-[500px]`}
        >
          <div className="flex justify-center">
            <h1
              className={` ${
                mode === "light" ? "text-black" : "text-white"
              } font-bold`}
            >
              Update User
            </h1>
          </div>
          <div className="flex flex-col gap-y-2 mt-5">
            <label
              className={mode === "light" ? "text-black" : "text-white"}
              htmlFor="fullname"
            >
              Fullname
            </label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              className={`${
                mode === "light" ? "bg-white" : "bg-gray-700 text-white"
              } w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black`}
            />
          </div>

          <div className="flex flex-col gap-y-2 ">
            <label
              className={mode === "light" ? "text-black" : "text-white"}
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className={`${
                mode === "light" ? "bg-white" : "bg-gray-700 text-white"
              } w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black`}
            />
          </div>

          {/* <div className="flex flex-col gap-y-2">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black"
            />
          </div> */}

          {(role === 1 || role === 2 || role === 3) && (
            <div className="flex flex-col gap-y-2">
              <label
                className={mode === "light" ? "text-black" : "text-white"}
                htmlFor="server_ids"
              >
                Client Ids
              </label>
              <div className="flex items-center flex-wrap gap-2">
                {serverIds &&
                  serverIds.length > 0 &&
                  serverIds.map((id) => (
                    <div
                      className="bg-teal-200 text-teal-700 px-3 py-1 rounded flex items-center gap-x-2"
                      key={id}
                    >
                      <p>{id}</p>
                      <RiDeleteBinFill
                        onClick={() => {
                          const updatedArray = serverIds.filter(
                            (serverId) => serverId !== id
                          );
                          setServerIds(updatedArray);
                        }}
                        className="text-red-600 cursor-pointer"
                      />
                    </div>
                  ))}
              </div>
              <select
                onChange={(e) => {
                  if (!serverIds || serverIds.length <= 0) {
                    setServerIds([e.target.value]);
                  } else {
                    if (
                      serverIds &&
                      serverIds.length > 0 &&
                      !serverIds.includes(parseInt(e.target.value))
                    ) {
                      setServerIds((prev) => [
                        ...prev,
                        parseInt(e.target.value),
                      ]);
                    } else {
                      toast.error("Already Exists");
                    }
                  }
                }}
                name=""
                id="server_ids"
                className={`${
                  mode === "light" ? "bg-white" : "bg-gray-700 text-white"
                } w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black`}
              >
                <option value="">Select---</option>
                {clientsList.map((client) => (
                  <option key={client?.id} value={client?.id}>
                    {client?.server}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col gap-y-2">
            <label
              className={mode === "light" ? "text-black" : "text-white"}
              htmlFor="server_ids"
            >
              Sub Client Ids
            </label>
            <div className="flex items-center flex-wrap gap-2">
              {subClientIds &&
                subClientIds.length > 0 &&
                subClientIds.map((id) => (
                  <div
                    className="bg-teal-200 text-teal-700 px-3 py-1 rounded flex items-center gap-x-2"
                    key={id}
                  >
                    <p>{id}</p>
                    <RiDeleteBinFill
                      onClick={() => {
                        const updatedArray = subClientIds.filter(
                          (subclientId) => subclientId !== id
                        );
                        setSubClientIds(updatedArray);
                      }}
                      className="text-red-600 cursor-pointer"
                    />
                  </div>
                ))}
            </div>
            <select
              onChange={(e) => {
                if (!subClientIds || subClientIds.length <= 0) {
                  setSubClientIds([e.target.value]);
                } else {
                  if (
                    subClientIds &&
                    subClientIds.length > 0 &&
                    !subClientIds.includes(parseInt(e.target.value))
                  ) {
                    setSubClientIds((prev) => [
                      ...prev,
                      parseInt(e.target.value),
                    ]);
                  } else {
                    toast.error("Already Exists");
                  }
                }
              }}
              name=""
              id="sub_client_ids"
              className={`${
                mode === "light" ? "bg-white" : "bg-gray-700 text-white"
              } w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black`}
            >
              <option value="">Select---</option>
              {subClientsList.map((subClient) => (
                <option key={subClient?.id} value={subClient?.id}>
                  {subClient?.domain}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              className={mode === "light" ? "text-black" : "text-white"}
              htmlFor="role"
            >
              Role
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              name=""
              id="role"
              className={`${
                mode === "light" ? "bg-white" : "bg-gray-700 text-white"
              } w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black`}
            >
              <option value="">Select Role---</option>
              {Object.keys(adminRoleList).map((key) => (
                <option key={key} value={key}>
                  {adminRoleList[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full relative flex flex-col gap-y-2">
            <label
              className={mode === "light" ? "text-black" : "text-white"}
              htmlFor="password"
            >
              Password:
            </label>
            <div className="w-[90%] relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="pasword"
                type={isShowPassword ? "text" : "password"}
                className={`${
                  mode === "light" ? "bg-white" : "bg-gray-700 text-white"
                } w-full py-3 px-3 rounded-md outline-none border-2 border-black`}
              />
              {isShowPassword ? (
                <FaRegEye
                  onClick={() => setIsShowPassword(false)}
                  className="absolute top-[50%] -translate-y-1/2 right-3 scale-110 cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setIsShowPassword(true)}
                  className="absolute top-[50%] -translate-y-1/2 right-3 scale-110 cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleUpdateUser}
              className="bg-blue-200 text-blue-700 px-5 py-2 rounded-md"
            >
              Update User
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUserPage;
