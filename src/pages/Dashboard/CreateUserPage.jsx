import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/useStore";

const CreateUserPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [adminRoleList, setAdminRoleList] = useState([]);

  const token = Cookies.get("token");
  const { mode } = useStore();
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      const createUserData = {
        email,
        password,
        full_name: fullName,
        role_type: parseInt(role),
      };

      axios
        .post(`${baseUrl}api/admin/signup`, createUserData, {
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
      setPassword("");
      setRole("");
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
    fetchAllRoleList();
  }, []);

  return (
    <Layout>
      <div className="w-full h-screen flex justify-center mt-20 ">
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className={`${
            mode === "light" ? "bg-white" : "bg-gray-900"
          } flex flex-col gap-y-5 border-2 border-black h-fit p-4 lg:p-10 rounded-md w-full lg:w-[500px]  `}
        >
          <div className="flex justify-center">
            <h1
              className={` ${
                mode === "light" ? "text-black" : "text-white"
              } font-bold`}
            >
              Create User
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
              className={` ${
                mode === "light" ? "bg-white" : "bg-gray-800 text-white"
              } w-full lg:w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black`}
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
              className={` ${
                mode === "light" ? "bg-white" : "bg-gray-800 text-white"
              } w-full lg:w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              className={mode === "light" ? "text-black" : "text-white"}
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className={` ${
                mode === "light" ? "bg-white" : "bg-gray-800 text-white"
              } w-full lg:w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black`}
            />
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
              className={` ${
                mode === "light" ? "bg-white" : "bg-gray-800 text-white"
              } w-full lg:w-[90%] py-3 px-3 rounded-md outline-none border-2 border-black`}
            >
              <option value="">Select Role---</option>
              {Object.keys(adminRoleList).map((key) => (
                <option key={key} value={key}>
                  {adminRoleList[key]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCreateUser}
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

export default CreateUserPage;
