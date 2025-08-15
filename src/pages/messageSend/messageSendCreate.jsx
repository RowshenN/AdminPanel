import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import { useCreateMessageSendMutation } from "../../services/messageSend";

const MessageTemplateCreate = () => {
  const history = useHistory();
  const [sms, setSms] = useState({
    phone_number: "",
    title: "",
    description: "",
    status: "sent",
  });

  const [createMessageSend] = useCreateMessageSendMutation();

  const createcategory = async () => {
    try {
      await createMessageSend(sms).unwrap();
      history.goBack();
    } catch (err) {
      console.error("Pozmakda säwlik:", err);
    }
  };

  return (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]"> SMS ugratmak</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]"> SMS ugratmak</h1>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">SMS ady</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              SMS ady adyny girizeniň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={sms.title}
              onChange={(e) => {
                setSms({ ...sms, title: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Adyny giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Düşündiriş</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Düşündiriş girizeniň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={sms.description}
              onChange={(e) => {
                setSms({ ...sms, description: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Düşündiriş giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Telefon</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Telefon girizeniň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={sms.phone_number}
              onChange={(e) => {
                setSms({ ...sms, phone_number: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Telefon giriz"
              type="text"
            />
          </div>
        </div>

        {/* <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Status</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Doglan güni kesgitlemek üçin status düzüň
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <Switch
              checked={sms.is_birthday == true ? true : false}
              onChange={(event) =>
                setSms({
                  ...sms,
                  is_birthday: event.target.checked ? true : false,
                })
              }
            />
          </div>
        </div> */}
      </div>
      <div className="w-full mt-5 flex justify-end items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
        <div className="w-fit flex gap-6 items-center ">
          <button
            onClick={() => history.goBack()}
            className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
          >
            Goýbolsun et
          </button>
          <button
            onClick={() => createcategory()}
            className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
          >
            Ýatda sakla
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MessageTemplateCreate);
