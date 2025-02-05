/* eslint-disable react/prop-types */
import axios from "axios";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const GeneralConfigDeleteModal = ({
  openDeleteConfigModal,
  setOpenDeleteConfigModal,
}) => {
  const token = Cookies.get("token");

  const handleDeleteConfig = async () => {
    await axios
      .delete(
        `${baseUrl}api/admin/client/config-profile/general/delete/${openDeleteConfigModal.value.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setOpenDeleteConfigModal({ state: false, value: {} });
        }
      });
  };
  return (
    <div
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
      className="w-[90%] mx-auto lg:w-[500px] h-fit bg-blue-100 px-5 py-10 rounded-md"
    >
      <h1 className="text-center text-2xl font-bold text-gray-800">
        Are you confirm?
      </h1>
      <div className="mt-10 w-[50%] mx-auto flex items-center justify-between">
        <button
          onClick={handleDeleteConfig}
          className="bg-teal-300 px-5 py-2 rounded-md"
        >
          Yes
        </button>
        <button
          onClick={() => setOpenDeleteConfigModal({ state: false, value: {} })}
          className="bg-rose-300 px-5 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GeneralConfigDeleteModal;
