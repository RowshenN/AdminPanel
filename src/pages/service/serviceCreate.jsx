import React, { useRef, useState } from "react";
import Alert from "@mui/joy/Alert";
import { IconButton } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import PageLoading from "../../components/PageLoading";
import { message } from "antd";

const ServiceCreate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [bigPostPicture, setBigPostPicture] = useState(null);
  const [warning, setWarning] = useState(false);

  const fileRef = useRef(null);

  const [product, setProduct] = useState({
    name_tm: "",
    name_ru: "",
    name_en: "",
    text_tm: "",
    text_ru: "",
    text_en: "",
    date: "",
  });

  const updatePost = async () => {
    try {
      // Validate required fields
      if (!product?.name_tm || !file) {
        setWarning(true);
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("name_tm", product.name_tm);
      formData.append("name_ru", product.name_ru);
      formData.append("name_en", product.name_en);
      formData.append("text_tm", product.text_tm);
      formData.append("text_ru", product.text_ru);
      formData.append("text_en", product.text_en);
      formData.append("date", product.date || new Date().toISOString());
      formData.append("img", file); // match backend field name

      const res = await axiosInstance.post("service/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Created service:", res.data);
      message.success("Service created successfully!");
      history.push("/service"); // redirect after creation
    } catch (err) {
      console.error("Error creating service:", err);
      message.warning("Başartmady!");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <PageLoading />
  ) : (
    <div className="w-full">
      {warning && (
        <Alert
          className="!fixed z-50 top-5 right-5"
          sx={{ alignItems: "flex-start" }}
          startDecorator={<WarningIcon />}
          variant="soft"
          color="warning"
          endDecorator={
            <IconButton
              onClick={() => setWarning(false)}
              variant="soft"
              color="warning"
            >
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <div>{"Maglumat nädogry!"}</div>
            <Typography level="body-sm" color="warning">
              Maglumatlary doly we dogry girizmeli!
            </Typography>
          </div>
        </Alert>
      )}

      {/* Header */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Serwis</h1>
      </div>

      {/* Form */}
      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Serwis maglumaty</h1>
        </div>

        {/* Image Upload */}
        <div className="flex items-center object-contain justify-between py-[30px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Serwis suratlary</h1>
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
                  <span>Click to upload</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Text Inputs */}
        <div className="flex items-start justify-between py-[15px]">
          <div className="w-[49%] flex flex-col items-start justify-start gap-4">
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Ady_tm</h1>
              <input
                value={product.name_tm}
                onChange={(e) =>
                  setProduct({ ...product, name_tm: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
                placeholder="Girizilmedik"
                type="text"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Ady_en</h1>
              <input
                value={product.name_en}
                onChange={(e) =>
                  setProduct({ ...product, name_en: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
                placeholder="Girizilmedik"
                type="text"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Ady_ru</h1>
              <input
                value={product.name_ru}
                onChange={(e) =>
                  setProduct({ ...product, name_ru: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
                placeholder="Girizilmedik"
                type="text"
              />
            </div>
          </div>

          <div className="w-[49%] flex flex-col items-baseline justify-start gap-4">
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Text_tm</h1>
              <textarea
                value={product.text_tm}
                onChange={(e) =>
                  setProduct({ ...product, text_tm: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
                placeholder="Text_tm"
              ></textarea>
            </div>
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Text_en</h1>
              <textarea
                value={product.text_en}
                onChange={(e) =>
                  setProduct({ ...product, text_en: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
                placeholder="Text_en"
              ></textarea>
            </div>
            <div className="w-full">
              <h1 className="text-[16px] font-[500]">Text_ru</h1>
              <textarea
                value={product.text_ru}
                onChange={(e) =>
                  setProduct({ ...product, text_ru: e.target.value })
                }
                className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
                placeholder="Text_ru"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 py-2 bg-[#F7F8FA] w-full">
        <div className="w-full mt-4 flex justify-end items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
          <div className="w-fit flex gap-6 items-center">
            <button
              onClick={() => history.goBack()}
              className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
            >
              Goýbolsun et
            </button>
            <button
              onClick={updatePost}
              className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
            >
              Ýatda sakla
            </button>
          </div>
        </div>
      </div>

      {/* Big image modal */}
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

export default React.memo(ServiceCreate);
