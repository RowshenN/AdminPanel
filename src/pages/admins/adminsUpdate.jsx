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
import {
  useUpdateAdminMutation,
  useGetAdminQuery,
  useDeleteAdminMutation,
} from "../../services/admin";
import { message } from "antd";
import { Button, Popconfirm } from "antd";

const AdminsUpdate = () => {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    password: "",
    position: "",
    type: "",
    can_message: true,
  });
  const [newPassword, setNewPassword] = useState("");

  const [updateAdmin] = useUpdateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();
  const { data: custumers, error, isLoading } = useGetAdminQuery(id);

  useEffect(() => {
    if (custumers) {
      setUser(custumers?.data);
    }
  }, [custumers]);

  if (isLoading) return <PageLoading />;
  if (error) {
    return <div>Ýalňyşlyk boldy</div>;
  }
  const createUser = async () => {
    try {
      let bodyData = {
        username: user?.username,
        position: user?.position,
        type: user?.type,
        can_message: user?.can_message,
      };

      newPassword?.length > 0
        ? (bodyData.password = newPassword)
        : console.log("");

      await updateAdmin({
        id: id,
        body: bodyData,
      });
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
        <h1 className="text-[30px] font-[700]">Admin (Ulanyjy) hasaplar</h1>
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
              value={user?.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Ulanyjy password</h1>
            <input
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Wezipesi</h1>
            <input
              value={user?.position}
              onChange={(e) => {
                setUser({
                  ...user,
                  position: e.target.value,
                });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Görnüşi</h1>

            <Select
              value={user?.type}
              onChange={(e, newValue) => {
                setUser({
                  ...user,
                  type: newValue,
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
              <Option key={"Erkek"} value={"admin"}>
                Admin
              </Option>
              <Option key={"Aýal"} value={"developer"}>
                Developer
              </Option>
            </Select>
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Status</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Message ugradyp ýa-da ugratmaýanlygyny kesgitlemek üçin status
              düzüň
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <Switch
              checked={user.can_message == true ? true : false}
              onChange={(event) =>
                setUser({
                  ...user,
                  can_message: event.target.checked ? true : false,
                })
              }
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]"> Admin poz</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Admin pozmak
            </p>
          </div>
          <Popconfirm
            title="Maglumaty pozmak!"
            description="Siz çyndan pozmak isleýärsiňizmi?"
            onConfirm={async () => {
              const respons = await deleteAdmin(id);
              console.log(respons);
              respons?.data?.status == 200
                ? history.goBack()
                : message.warning(respons.error.data.message);
            }}
            // onCancel={cancel}
            okText="Hawa"
            cancelText="Ýok"
          >
            <Button danger>Pozmak</Button>
          </Popconfirm>
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

export default React.memo(AdminsUpdate);
