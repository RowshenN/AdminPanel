import React, { useRef, useState } from "react";
import Alert from "@mui/joy/Alert";
import { IconButton, Typography } from "@mui/joy";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import PageLoading from "../../components/PageLoading";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import { useCreateNewsMutation } from "../../services/news";

const NewsCreate = () => {
  const history = useHistory();
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
    date: new Date().toISOString().split("T")[0],
  });

  const [createNews, { isLoading }] = useCreateNewsMutation();

  const handleSubmit = async () => {
    // Validate
    if (
      !news.name_tm ||
      !news.name_ru ||
      !news.name_en ||
      !news.text_tm ||
      !news.text_ru ||
      !news.text_en
    ) {
      setWarning(true);
      return;
    }

    const formData = new FormData();
    formData.append("name_tm", news.name_tm);
    formData.append("name_ru", news.name_ru);
    formData.append("name_en", news.name_en);
    formData.append("text_tm", news.text_tm);
    formData.append("text_ru", news.text_ru);
    formData.append("text_en", news.text_en);
    formData.append("date", news.date);
    if (file) formData.append("img", file);

    try {
      await createNews(formData).unwrap();
      message.success("Täzelik üstünlikli döredildi");
      history.push("/news");
    } catch (error) {
      console.error("Error creating news:", error);
      message.error("Maglumatlary barlaň");
    }
  };

  if (isLoading) return <PageLoading />;

  return (
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

      {/* Header */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Täzelik</h1>
      </div>

      {/* Form */}
      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        {/* Image Upload */}
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
                  + Surat goş
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input fields */}
        <div className="flex items-start justify-between py-[15px]">
          <div className="w-[49%] flex flex-col items-start justify-start gap-4">
            <input
              value={news.name_tm}
              onChange={(e) => setNews({ ...news, name_tm: e.target.value })}
              placeholder="Ady_tm"
              className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
            />
            <input
              value={news.name_en}
              onChange={(e) => setNews({ ...news, name_en: e.target.value })}
              placeholder="Ady_en"
              className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
            />
            <input
              value={news.name_ru}
              onChange={(e) => setNews({ ...news, name_ru: e.target.value })}
              placeholder="Ady_ru"
              className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
            />
          </div>

          <div className="w-[49%] flex flex-col items-baseline justify-start gap-4">
            <textarea
              value={news.text_tm}
              onChange={(e) => setNews({ ...news, text_tm: e.target.value })}
              placeholder="Text_tm"
              className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
            />
            <textarea
              value={news.text_en}
              onChange={(e) => setNews({ ...news, text_en: e.target.value })}
              placeholder="Text_en"
              className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
            />
            <textarea
              value={news.text_ru}
              onChange={(e) => setNews({ ...news, text_ru: e.target.value })}
              placeholder="Text_ru"
              className="text-[14px] w-full mt-1 text-black font-[400] border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 py-2 bg-[#F7F8FA] w-full">
        <div className="w-full mt-4 flex justify-end gap-5 items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
          <button
            onClick={() => history.goBack()}
            className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
          >
            Goýbolsun et
          </button>
          <button
            onClick={handleSubmit}
            className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
          >
            Ýatda sakla
          </button>
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

export default React.memo(NewsCreate);
