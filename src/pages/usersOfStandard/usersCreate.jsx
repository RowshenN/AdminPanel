import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import Alert from "@mui/joy/Alert";
import { IconButton, Input } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { useHistory, useParams } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import PageLoading from "../../components/PageLoading";
import { useCreateCustomerMutation } from "../../services/custumers";
import { useGetAllGroupsQuery } from "../../services/group";
import { useGetAllStreetsQuery } from "../../services/street";
import { message } from "antd";

const UserCreate = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    balance: 0,
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    address: "",
    cashback: 0,
    birth_date: "",
    street: "",
    group: "",
  });

  const { data: streets } = useGetAllStreetsQuery("");
  const { data: groups } = useGetAllGroupsQuery("");
  const [createCustomer] = useCreateCustomerMutation();

  const createUser = async () => {
    try {
      await createCustomer(user);
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
        <h1 className="text-[30px] font-[700]">Standard hasaplar</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Hasap maglumaty</h1>
        </div>

        <div className="flex items-center  justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Ulanyjy ady</h1>
            <input
              value={user?.first_name}
              onChange={(e) => {
                setUser({ ...user, first_name: e.target.value });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Ulanyjy familýasy</h1>
            <input
              value={user?.last_name}
              onChange={(e) => {
                setUser({ ...user, last_name: e.target.value });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]"> Jynsy</h1>
            <Select
              value={user?.gender}
              onChange={(e, newValue) => {
                setUser({
                  ...user,
                  gender: newValue,
                });
              }}
              placeholder="Hemmesini görkez"
              className="text-[14px] w-full h-[47px] mt-1 text-black font-[400]  border-[1px] !bg-white !border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              indicator={<KeyboardArrowDown className="!text-[16px]" />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              <Option key={"Erkek"} value={"male"}>
                Erkek
              </Option>
              <Option key={"Aýal"} value={"female"}>
                Aýal
              </Option>
            </Select>
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Telefon belgisi</h1>
            <input
              value={user?.phone_number}
              onChange={(e) => {
                setUser({ ...user, phone_number: e.target.value });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Doglan güni</h1>
            <input
              value={user?.birth_date}
              format="YYYY-MM-DD"
              onChange={(e) => {
                setUser({ ...user, birth_date: e.target.value });
              }}
              className={`text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none `}
              placeholder="Girizilmedik"
              type="date"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Topary</h1>
            <Select
              value={user?.group}
              onChange={(e, newValue) => {
                setUser({
                  ...user,
                  group: newValue,
                });
              }}
              placeholder="Hemmesini görkez"
              className="text-[14px] w-full h-[47px] mt-1 text-black font-[400]  border-[1px] !bg-white !border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              indicator={<KeyboardArrowDown className="!text-[16px]" />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              {groups?.data?.map((item, i) => {
                return (
                  <Option key={"option" + i} value={item?.id}>
                    {item?.title}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Salgysy</h1>
            <input
              value={user?.address}
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
              }}
              className={`text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none `}
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Köçesi</h1>
            <Select
              value={user?.street}
              onChange={(e, newValue) => {
                console.log(e?.target?.value, newValue);
                setUser({
                  ...user,
                  street: newValue,
                });
              }}
              placeholder="Hemmesini görkez"
              className="text-[14px] w-full h-[47px] mt-1 text-black font-[400]  border-[1px] !bg-white !border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              indicator={<KeyboardArrowDown className="!text-[16px]" />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              {streets?.data?.map((item, i) => {
                return (
                  <Option key={"option" + i} value={item?.id}>
                    {item?.title}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Hasaby</h1>
            <input
              value={user?.balance}
              onChange={(e) => {
                setUser({
                  ...user,
                  balance: +e.target.value,
                });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="number"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Cashback</h1>

            <input
              type="number"
              value={user?.cashback}
              // value={user?.profile?.birthday?.slice(0, 10)}
              onChange={(e) => {
                console.log(e.target.value);
                setUser({
                  ...user,
                  cashback: +e.target.value,
                });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
            />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 py-2 bg-[#F7F8FA] w-full">
        <div className="  w-full mt-5 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
          <div className="flex items-center gap-2"></div>
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

export default React.memo(UserCreate);
