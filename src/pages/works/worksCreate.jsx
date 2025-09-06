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
import { useCreateCategoryMutation } from "../../services/category";
import { message } from "antd";

const WorksCreate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    title: "",
  });
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);

  const [createCategory] = useCreateCategoryMutation();

  const createcategory = async () => {
    try {
      const formData = new FormData();
      formData.append("title", category.title);
      console.log(file);
      file != null && formData.append("image", file);
      await createCategory(formData).unwrap();
      history.goBack();
    } catch (err) {
      console.error("Pozmakda säwlik:", err);
      message.warning("Başartmady!");
    }
  };

  const [about, setAbout] = useState({
    name_tm: "",
    name_ru: "",
    name_en: "",
    text_tm: "",
    text_en: "",
    text_ru: "",
  });

  const fileHandler = (f) => {
    console.log(f);

    let type = f?.type?.split("/")[1];
    console.log(type);
    if (
      (type == "png" || type == "jpg" || type == "jpeg") &&
      f.size <= 100 * 1024
    ) {
      setFile(f);
    } else {
      alert("Olceg we type uns berin!");
    }
  };
  return loading ? (
    <PageLoading />
  ) : (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Work</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Work goş</h1>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Name_tm</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Name_tm
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={about.name_tm}
              onChange={(e) => {
                setAbout({ ...about, name_tm: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Adyny giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Name_ru</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Name_ru
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={about.name_ru}
              onChange={(e) => {
                setAbout({ ...about, name_ru: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Adyny giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Name_en</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Name_en
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={about.name_en}
              onChange={(e) => {
                setAbout({ ...about, name_en: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Adyny giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Text_tm</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Text_tm
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={about.text_tm}
              onChange={(e) => {
                setAbout({ ...about, text_tm: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Text_tm giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Text_en</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Text_en
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={about.text_en}
              onChange={(e) => {
                setAbout({ ...about, text_en: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Text_en giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Text_ru</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Text_ru
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={about.text_ru}
              onChange={(e) => {
                setAbout({ ...about, text_ru: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Text_ru giriz"
              type="text"
            />
          </div>
        </div>
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

export default React.memo(WorksCreate);
