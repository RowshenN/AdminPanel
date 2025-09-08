import React, { useRef, useState } from "react";
import Alert from "@mui/joy/Alert";
import { IconButton, Typography } from "@mui/joy";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { axiosInstance } from "../../utils/axiosIntance";
import PageLoading from "../../components/PageLoading";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";

const BannerCreate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [bigPostPicture, setBigPostPicture] = useState(null);
  const [warning, setWarning] = useState(false);
  const fileRef = useRef(null);

  const [banner, setBanner] = useState({
    title_tm: "",
    title_en: "",
    title_ru: "",
    text_tm: "",
    text_en: "",
    text_ru: "",
    link: "",
    type: "",
  });

  const createBanner = async () => {
    if (!banner.title_tm || !banner.title_en || !banner.title_ru) {
      setWarning(true);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title_tm", banner.title_tm);
      formData.append("title_en", banner.title_en);
      formData.append("title_ru", banner.title_ru);
      formData.append("text_tm", banner.text_tm);
      formData.append("text_en", banner.text_en);
      formData.append("text_ru", banner.text_ru);
      formData.append("link", banner.link);
      formData.append("type", banner.type);
      if (file) formData.append("img", file);

      const { data } = await axiosInstance.post(
        "/api/banner/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Banner üstünlikli döredildi!");
      history.push("/banner");
    } catch (err) {
      console.error(err);
      message.warning("Banner döretmek başartmady!");
    }
    setLoading(false);
  };

  return loading ? (
    <PageLoading />
  ) : (
    <div className="w-full">
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

      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Banner</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        {/* Banner Images */}
        <div className="w-[49%]">
          <h1 className="text-[16px] font-[500]">Banner suratlary</h1>
          <div className="flex gap-5 mt-5 justify-start">
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file ? (
              <div className="w-[75px] h-[75px] p-0 cursor-pointer border-[#98A2B2] rounded-[6px] relative">
                <div
                  onClick={() => setFile(null)}
                  className="bg-gray-100 text-[8px] w-[30px] h-[30px] border-2 rounded-[100%] cursor-pointer absolute -top-[20px] -right-[20px] p-[1px]"
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
                <span>Upload Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Banner Texts */}
        <div className="flex flex-col items-start justify-between py-[15px]">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Banner_tm ady</h1>
              <input
                type="text"
                placeholder="Girizilmedik"
                value={banner.title_tm}
                onChange={(e) =>
                  setBanner({ ...banner, title_tm: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              />
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Banner_en ady</h1>
              <input
                type="text"
                placeholder="Girizilmedik"
                value={banner.title_en}
                onChange={(e) =>
                  setBanner({ ...banner, title_en: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              />
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Banner_ru ady</h1>
              <input
                type="text"
                placeholder="Girizilmedik"
                value={banner.title_ru}
                onChange={(e) =>
                  setBanner({ ...banner, title_ru: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Text_tm</h1>
              <textarea
                placeholder="Text_tm"
                value={banner.text_tm}
                onChange={(e) =>
                  setBanner({ ...banner, text_tm: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              />
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Text_en</h1>
              <textarea
                placeholder="Text_en"
                value={banner.text_en}
                onChange={(e) =>
                  setBanner({ ...banner, text_en: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              />
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Text_ru</h1>
              <textarea
                placeholder="Text_ru"
                value={banner.text_ru}
                onChange={(e) =>
                  setBanner({ ...banner, text_ru: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              />
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Link</h1>
              <input
                type="text"
                placeholder="Banner link"
                value={banner.link}
                onChange={(e) => setBanner({ ...banner, link: e.target.value })}
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              />
            </div>

            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Type</h1>
              <input
                type="text"
                placeholder="Banner type"
                value={banner.type}
                onChange={(e) => setBanner({ ...banner, type: e.target.value })}
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="sticky bottom-0 py-2 bg-[#F7F8FA] w-full">
        <div className=" w-full mt-4 flex justify-end items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
          <div className="w-fit flex gap-6 items-center ">
            <button
              onClick={() => history.goBack()}
              className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
            >
              Goýbolsun et
            </button>
            <button
              onClick={() => createBanner()}
              className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
            >
              Ýatda sakla
            </button>
          </div>
        </div>
      </div>

      {/* Big image preview */}
      <Modal
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

export default React.memo(BannerCreate);
