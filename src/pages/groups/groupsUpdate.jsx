import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import {
  useUpdateGroupMutation,
  useGetGroupQuery,
  useDeleteGroupMutation,
} from "../../services/group";
import { message } from "antd";
import { Button, Popconfirm } from "antd";

const CategoryUpdate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [newFile, setNewFile] = useState(false);
  const [group, setGroup] = useState({
    title: "",
    cashback: 0,
  });
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);

  const { data: categoryData, error, isLoading } = useGetGroupQuery(id);
  const [updateGroup] = useUpdateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();

  useEffect(() => {
    if (categoryData) {
      setGroup(categoryData?.data);
    }
  }, [categoryData]);
  if (isLoading) return <PageLoading />;
  if (error) {
    return <div>Ýalňyşlyk boldy</div>;
  }
  console.log("product", categoryData);

  const createcategory = async () => {
    setLoading(true);
    const formData = {
      title: group.title,
      cashback: +group?.cashback,
    };
    try {
      await updateGroup({ id: id, body: formData }).unwrap();
      history.goBack();
    } catch (err) {
      console.error("Pozmakda säwlik:", err);
      message.warning("Başartmady!");
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
        <h1 className="text-[30px] font-[700]">Topar</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Topar maglumaty</h1>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Topar ady</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Toparyň adyny girizeniňizde 30 simwoldan geçmäň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={group.title}
              onChange={(e) => {
                setGroup({ ...group, title: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Adyny giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">cashback</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Toparyň cashback-ni girizeniňizde san bolmaly.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={group.cashback}
              onChange={(e) => {
                setGroup({ ...group, cashback: e.target.value });
              }}
              className="text-[14px] w-full text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="cashback giriz"
              type="number"
            />
          </div>
        </div>
        <div className="w-[49%] flex justify-between">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Topary poz</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Topary pozmak
            </p>
          </div>
          <Popconfirm
            title="Maglumaty pozmak!"
            description="Siz çyndan pozmak isleýärsiňizmi?"
            onConfirm={async () => {
              const respons = await deleteGroup(id);
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
              onClick={() => createcategory()}
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

export default React.memo(CategoryUpdate);
