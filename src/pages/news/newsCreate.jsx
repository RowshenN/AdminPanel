import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Alert from "@mui/joy/Alert";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import { IconButton, Input } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import PageLoading from "../../components/PageLoading";
import { message } from "antd";

const NewsCreate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [bigPostPicture, setBigPostPicture] = useState(null);
  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);

  const [news, setNews] = useState({
    name_tm: "",
    name_ru: "",
    name_en: "",
    text_tm: "",
    text_ru: "",
    text_en: "",
    date: moment().format("YYYY-MM-DD"),
  });

  const updatePost = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name_tm", news.name_tm);
      formData.append("name_ru", news.name_ru);
      formData.append("name_en", news.name_en);
      formData.append("text_tm", news.text_tm);
      formData.append("text_ru", news.text_ru);
      formData.append("text_en", news.text_en);
      formData.append("date", news.date);

      if (file) {
        formData.append("img", file);
      }

      const response = await axiosInstance.post("/api/news/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("News created:", response.data);
      history.push("/news"); // redirect after success
      message.success("Täzelik üstünlikli döredildi");
    } catch (err) {
      console.error("Error creating news:", err);
      message.warning(" Maglumatlary barlaň.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <PageLoading />
  ) : (
    <div className="w-full">
      {/* alert */}
      {warning && (
        <Alert
          className="!fixed z-50 top-5 right-5"
          key={"title"}
          sx={{ alignItems: "flex-start" }}
          startDecorator={<WarningIcon />}
          variant="soft"
          color={"warning"}
          endDecorator={
            <IconButton
              onClick={() => setWarning(false)}
              variant="soft"
              color={"warning"}
            >
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <div>{"Maglumat nädogry!"}</div>
            <Typography level="body-sm" color={"warning"}>
              Maglumatlary doly we dogry girizmeli!
            </Typography>
          </div>
        </Alert>
      )}

      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Täzelik</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Täzelik maglumaty</h1>
        </div>

        <div className="flex items-center object-contain justify-between py-[30px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Täzelik suratlary</h1>
            <div className="flex gap-5 mt-5 justify-start">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileRef}
                className="hidden"
                type="file"
              />
              {file ? (
                <div className="w-[75px] h-[75px] p-0 cursor-pointer border-[#98A2B2] rounded-[6px] relative">
                  <div
                    onClick={() => setFile(null)}
                    className="bg-gray-100 text-[8px] w-[30px] h-[30px] border-2 rounded-[100%] cursor-pointer absolute -top-[20px] -right-[20px]   p-[1px]"
                  >
                    <CloseRoundedIcon className="text-[8px] w-[30px] h-[30px]" />
                  </div>
                  <img
                    className="w-[75px] h-[75px] object-cover rounded-[6px]"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current.click()}
                  className="border-[2px] cursor-pointer border-[#98A2B2] border-dashed p-[25px] rounded-[6px]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 12.4999L3.75159 10.9673C4.66286 10.1699 6.03628 10.2156 6.89249 11.0719L11.1822 15.3616C11.8694 16.0488 12.9512 16.1425 13.7464 15.5837L14.0446 15.3741C15.1888 14.57 16.7369 14.6631 17.7765 15.5987L21 18.4999"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15 5.5H18.5M18.5 5.5H22M18.5 5.5V9M18.5 5.5V2"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-start  justify-between py-[15px]">
          <div className="w-[49%] flex flex-col items-start justify-start gap-4">
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Ady_tm</h1>
              <input
                value={news.name_tm}
                onChange={(e) => setNews({ ...news, name_tm: e.target.value })}
                className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
                placeholder="Girizilmedik"
                type="text"
              />
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Ady_en</h1>
              <input
                value={news.name_en}
                onChange={(e) => setNews({ ...news, name_en: e.target.value })}
                className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
                placeholder="Girizilmedik"
                type="text"
              />
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Ady_ru</h1>
              <input
                value={news.name_ru}
                onChange={(e) => setNews({ ...news, name_ru: e.target.value })}
                className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
                placeholder="Girizilmedik"
                type="text"
              />
            </div>
          </div>
          <div className="w-[49%] flex flex-col items-baseline justify-start gap-4">
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Text_tm</h1>
              <textarea
                value={news.text_tm}
                onChange={(e) => setNews({ ...news, text_tm: e.target.value })}
                className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
                placeholder="Text_tm"
              ></textarea>
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Text_en</h1>
              <textarea
                value={news.text_en}
                onChange={(e) => setNews({ ...news, text_en: e.target.value })}
                className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
                placeholder="Text_en"
              ></textarea>
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Text_ru</h1>
              <textarea
                value={news.text_ru}
                onChange={(e) => setNews({ ...news, text_ru: e.target.value })}
                className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
                placeholder="Text_ru"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 py-2 bg-[#F7F8FA] w-full">
        <div className=" w-full mt-4 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
          <div className="flex items-center gap-2"></div>
          <div className="w-fit flex gap-6 items-center ">
            <button
              onClick={() => history.goBack()}
              className="text-blue  text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
            >
              Goýbolsun et
            </button>
            <button
              onClick={() => updatePost()}
              className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
            >
              Ýatda sakla
            </button>
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={bigPostPicture != null}
        onClose={() => setBigPostPicture(null)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 600,
            width: "50%",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <div className="w-full flex justify-center items-center">
            <img
              className="w-[50%] object-contain"
              src={bigPostPicture}
              alt=""
            />
          </div>
        </Sheet>
      </Modal>
    </div>
  );
};

export default React.memo(NewsCreate);
