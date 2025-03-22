import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import baseUrl from "../../config";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPageSubClient = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const loginData = {
        email,
        password,
      };

      await axios
        .post(`${baseUrl}api/sub-client-area/login`, loginData)
        .then((res) => {
          if (res.data.status) {
            Cookies.set("token", res?.data?.data?.token);
            Cookies.set("role", res?.data?.data?.user_type);
            toast.success("Successfully Login");
            navigate("/dashboard/client/configs");
          } else {
            toast.error(res?.data?.message);
          }
        });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div
      // style={{
      //   backgroundImage: `url('/images/loginBg.jpg')`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      // }}
      className="w-full min-h-screen bg-[#C4DAD2] flex items-center justify-center"
    >
      <div className="bg-[#9bddc5] bg-opacity-50 border-4 border-white rounded-md w-[500px] h-[500px] py-10 px-5">
        <div className="flex justify-center ">
          <h1 className="text-black text-2xl font-bold">Log in</h1>
        </div>

        <div className="w-full my-12 flex flex-col items-center gap-y-12 ">
          {/* email */}
          <div className="w-full relative">
            <label
              className="absolute top-[50%] -translate-y-1/2 left-3 text-gray-500"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="text"
              className="w-full mx-auto py-3 px-24 rounded-lg"
            />
          </div>
          {/* password */}
          <div className="w-full relative">
            <label
              className="absolute top-[50%] -translate-y-1/2 left-3 text-gray-500"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="pasword"
              type={isShowPassword ? "text" : "password"}
              className="w-full mx-auto py-3 px-24 rounded-lg"
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

          {/* button */}
          <div
            onClick={handleLogin}
            className="flex justify-center w-full bg-slate-200 hover:bg-white transition-all duration-300 ease-in py-3 rounded-xl cursor-pointer"
          >
            <button className="font-bold">
              {isLoading ? "Loading...." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageSubClient;
