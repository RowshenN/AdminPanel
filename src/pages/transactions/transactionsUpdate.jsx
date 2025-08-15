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
import {
  useGetTransactionByIdQuery,
  useDeleteTransactionMutation,
} from "../../services/transactions";
import { message } from "antd";
import dayjs from "dayjs";

const TransactionsUpdate = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tran, setTran] = useState({});
  const [bigPostPicture, setBigPostPicture] = useState(null);

  const [stockOpen, setStockOpen] = useState(false);

  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);

  const [deleteTransaction] = useDeleteTransactionMutation();

  const {
    data: TransactionData,
    isLoading,
    error,
  } = useGetTransactionByIdQuery(id);

  useEffect(() => {
    if (TransactionData) {
      setTran(TransactionData?.data);
    }
  }, [TransactionData]);

  if (isLoading) return <PageLoading />;
  if (error) return <div>Ýalňyşlyk boldy</div>;
  console.log(TransactionData);

  const updateTransaction = () => {};

  const deleteTrans = async (id) => {
    try {
      await deleteTransaction(id).unwrap();
      message.success("Pozuldy!");
      // isleseňiz list täzeläp bilersiňiz
    } catch (err) {
      console.error("Pozmakda säwlik:", err);
      message.warning("Pozmak başartmady!");
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
        <h1 className="text-[30px] font-[700]">Sargytlar</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Sargytlar maglumaty</h1>
        </div>

        <div className="flex items-center  justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Müşderiniň ady</h1>
            <input
              value={tran?.customer?.first_name}
              // onChange={(e) => {
              //   setTran({ ...tran, caption: e.target.value });
              // }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Müşderiniň familýasy</h1>
            <input
              value={tran?.customer?.last_name}
              // onChange={(e) => {
              //   setTran({ ...tran, caption: e.target.value });
              // }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center  justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Müşderiniň telefony</h1>
            <input
              value={tran?.customer?.phone_number}
              // onChange={(e) => {
              //   setTran({ ...tran, caption: e.target.value });
              // }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Müşderiniň salgysy</h1>
            <input
              value={tran?.customer?.street?.title}
              // onChange={(e) => {
              //   setTran({ ...tran, caption: e.target.value });
              // }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]"> Bahasy TMT</h1>
            <input
              value={tran?.transaction?.amount}
              // onChange={(e) => {
              //   setTran({
              //     ...tran,
              //     price: e.target.value,
              //   });
              // }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Cashback</h1>
            <input
              value={tran?.transaction?.cashback}
              // onChange={(e) => {
              //   setTran({ ...tran, phone: e.target.value });
              // }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Töleg görnüşi</h1>

            <div className="text-[14px] text-[#98A2B2] font-[400] mt-2">
              {tran?.transaction?.title}
            </div>
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Sargyt wagty</h1>
            <div className="text-[14px] text-[#98A2B2] font-[400] mt-2">
              {dayjs(tran?.transaction?.date).format("DD-MM-YYYY HH:MM")}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap  items-center border-t-2 pt-4  justify-between pb-[30px]">
          <h1 className="text-[20px] font-[500] mb-2">Harytlar</h1>
          <div className="w-full h-[40px] flex items-center bg-[#F7F8FA] border-[1px] border-[#E9EBF0]">
            <div className="w-1/4 text-[14px] font-[500px] text-[#98A2B2]   leading-[40px] h-[40px] pl-6 border-r-[1px] border-[#E9EBF0]">
              Surat
            </div>
            <div className="w-1/4 text-[14px] font-[500px] text-[#98A2B2] leading-[40px] h-[40px] pl-6 border-r-[1px] border-[#E9EBF0]">
              Ady
            </div>
            <div className="w-1/4 text-[14px] font-[500px] text-[#98A2B2] leading-[40px] h-[40px] pl-6 border-r-[1px] border-[#E9EBF0]">
              Sany
            </div>
            <div className="w-1/4 text-[14px] font-[500px] text-[#98A2B2] leading-[40px] h-[40px] pl-6 ">
              Baha
            </div>
          </div>

          {tran?.product?.options?.colors?.map((item, i) => {
            return (
              <div
                key={"colors" + i}
                className="w-full min-h-[50px] flex items-center bg-[#ffffff] border-[1px] border-[#E9EBF0]"
              >
                <div className="w-1/4 flex gap-2 items-center text-[14px] font-[500px] text-[#98A2B2]   leading-[50px] h-full pl-6  ">
                  <div
                    style={{ backgroundColor: item?.color?.code }}
                    className="w-[20px] h-[20px] rounded-[100%] shadow-md"
                  ></div>{" "}
                  {item?.color?.title}
                </div>
                <div className="w-3/4">
                  {item?.sizes?.map((col, j) => {
                    return (
                      <div key={"sizes" + j} className="w-full flex ">
                        <div
                          className={`w-1/3 text-[14px] font-[500px] text-[#98A2B2] leading-[50px] h-[50px] pl-6 border-l-[1px] border-r-[1px] ${
                            item?.sizes?.length - 1 !== j && "border-b-[1px]"
                          } border-[#E9EBF0]`}
                        >
                          {col?.size?.title}
                        </div>
                        <div
                          className={`w-1/3 text-[14px] font-[500px] text-[#98A2B2] leading-[50px] h-[50px] pl-6 border-r-[1px] ${
                            item?.sizes?.length - 1 !== j && "border-b-[1px]"
                          } border-[#E9EBF0]`}
                        >
                          <input
                            value={col?.stock}
                            className="border-[1px] px-4 text-[12px] font-[400] border-[#98A2B2] rounded-[6px] w-[110px] h-[30px] text-black"
                            type="text"
                          />
                        </div>
                        <div
                          className={`w-1/3 text-[14px] font-[500px] text-[#98A2B2] ${
                            item?.sizes?.length - 1 !== j && "border-b-[1px]"
                          } border-[#E9EBF0] leading-[50px] h-[50px] pl-6 `}
                        >
                          <input
                            value={col?.price}
                            className="border-[1px] px-4 text-[12px] font-[400] border-[#98A2B2] rounded-[6px] w-[110px] h-[30px] text-black"
                            type="text"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sticky bottom-0 py-2 bg-[#F7F8FA] w-full">
        <div className=" w-full mt-4 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
          <div className="flex items-center gap-2">
            <h1 className="text-[14px] font-[400] text-[#98A2B2]">
              Soňky düzediş
            </h1>
            <h1 className="text-[14px] font-[400]">
              {tran?.created_at?.slice(0, 10) +
                " / " +
                tran?.created_at?.slice(11, 16)}
            </h1>
          </div>
          <div className="w-fit flex gap-6 items-center ">
            <button
              onClick={() => history.goBack()}
              className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
            >
              Goýbolsun et
            </button>
            <button
              onClick={() => updateTransaction()}
              className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
            >
              Ýatda sakla
            </button>
          </div>
        </div>
      </div>

      {/*  bigPostPicture */}
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

export default React.memo(TransactionsUpdate);
