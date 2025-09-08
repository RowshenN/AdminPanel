import React, { useState } from "react";
import Switch from "@mui/joy/Switch";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { useCreateAdminMutation } from "../../services/admin";

const AdminsCreate = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    phone: "",
    password: "",
    active: true,
  });

  const [createAdmin] = useCreateAdminMutation();

  const createUser = async () => {
    try {
      await createAdmin(user).unwrap();
      message.success("Üstünlikli döredildi!");
      history.goBack();
    } catch (err) {
      console.log(err);
      message.warning("Gaýtadan barlaň!");
    }
  };

  return (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Admin </h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Hasap maglumaty</h1>
        </div>

        <div className="flex items-center justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Admin ady</h1>
            <input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Admin password</h1>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Admin familýasy</h1>
            <input
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Telefon belgisi</h1>
            <input
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Status</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Admin ulanyjy hasaby üçin status düzüň
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <Switch
              checked={user.active}
              onChange={(event) =>
                setUser({ ...user, active: event.target.checked })
              }
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 py-2 bg-[#F7F8FA] w-full">
        <div className="w-full mt-5 flex justify-end items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
          <div className="w-fit flex gap-6 items-center ">
            <button
              onClick={() => history.goBack()}
              className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
            >
              Goýbolsun et
            </button>
            <button
              onClick={() => createUser()}
              className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
            >
              Ýatda sakla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminsCreate);
