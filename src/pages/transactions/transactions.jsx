import React, { useEffect, useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import CheckBox from "../../components/CheckBox";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import Pagination from "../../components/pagination";
import PageLoading from "../../components/PageLoading";

import userPicture from "../../images/user.png";
import { useGetFilteredTransactionsQuery } from "../../services/transactions";
import dayjs, { Dayjs } from "dayjs";

import { DatePicker } from "antd";

const Sargytlar = () => {
  const history = useHistory();
  const [pages, setPages] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDelete, setISDelete] = useState(false);
  const [story, setStory] = useState(null);
  const [reason, setReason] = useState("");
  const { RangePicker } = DatePicker;

  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    search: "",
    type: "",
    startDate: dayjs().subtract(1, "day"),
    endDate: dayjs(),
  });
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useGetFilteredTransactionsQuery({
    page: filter?.page,
    limit: filter?.limit,
    search: filter?.search,
    type: filter?.type,
    startDate: dayjs(filter?.startDate).format("YYYY-MM-DD"),
    endDate: dayjs(filter?.endDate).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    const time = setTimeout(() => {
      setFilter({ ...filter, search: search });
    }, 500);
    return () => clearTimeout(time);
  }, [search]);

  if (isLoading) return <PageLoading />;
  if (error) {
    return <div>Ýalňyşlyk boldy</div>;
  }

  console.log(data);

  // useEffect(() => {
  //   const time = setTimeout(() => {
  //     getcomments();
  //   }, 400);

  //   return () => clearTimeout(time);
  // }, [filter]);

  // useEffect(() => {
  //   getcomments();
  // }, [filter]);

  // const getcomments = () => {
  //   setLoading(true);
  //   axiosInstance
  //     .get(
  //       "/api/transaction/all/filters?page=2&limit=5&startDate=2025-06-20&endDate=2025-07-05"
  //     )
  //     .then((data) => {
  //       setLoading(false);
  //       console.log(data.data);
  //       setTransactions(data.data);
  //       let i = 1;
  //       let array = [];
  //       while (i <= data?.data?.meta?.last_page) {
  //         array.push(i);
  //         i++;
  //       }
  //       setPages([...array]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // };

  const acceptcomments = (id) => {
    // id &&
    //   axiosInstance
    //     .post("/transactions/accept/" + id)
    //     .then((data) => {
    //       console.log(data.data);
    //       getcomments();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };

  const deletecomments = () => {
    //   reason?.length > 0 &&
    //     axiosInstance
    //       .post("/transactions/decline/" + story?.id, {
    //         reason: reason,
    //       })
    //       .then((data) => {
    //         console.log(data.data);
    //         getcomments();
    //         setISDelete(false);
    //         setReason("");
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
  };

  return (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[15px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Sargytlar</h1>
        <div className="w-fit flex gap-5">
          {/* cashback */}
          {/* payment */}
          <Select
            onChange={(e, value) => setFilter({ ...filter, type: value })}
            placeholder="Hemmesini görkez"
            className="!border-[#E9EBF0] !border-[1px] !h-[40px] !bg-white !rounded-[8px] !px-[17px] !w-fit !min-w-[200px] !text-[14px] !text-black  "
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
            <Option value="">Hemmesini görkez</Option>
            <Option value="payment">Töleg görä</Option>
            <Option value="cashback">cashback göra</Option>
          </Select>
          <RangePicker
            // locale={tkTK}
            // presets={rangePresets}
            // defaultValue={[
            //   dayjs(filter?.startDate, "DD-MM-YYYY"),
            //   dayjs(filter?.endDate, "DD-MM-YYYY"),
            // ]}
            value={[
              dayjs(filter.startDate, "DD-MM-YYYY"),
              dayjs(filter.endDate, "DD-MM-YYYY"),
            ]}
            onChange={(a, b) => {
              b[0] &&
                b[1] &&
                setFilter({
                  ...filter,
                  startDate: dayjs(b[0], "DD-MM-YYYY"),
                  endDate: dayjs(b[1], "DD-MM-YYYY"),
                });
              // b[1] && setEndTime(dayjs(b[1], "DD-MM-YYYY"));
            }}
            format={"DD-MM-YYYY"}
          />
          {/* <Button
            onClick={() => history.push({ pathname: "/transactions/create" })}
            className="  !h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit   !text-[14px] !text-white  "
            startDecorator={<Add />}
          >
            Sargyt döret
          </Button> */}
          {/* <button className="h-[40px] border-[#E9EBF0] border-[1px] rounded-[8px]"></button> */}
        </div>
      </div>

      {/*  Table*/}
      <div className="w-full p-5 bg-white rounded-[8px]">
        {/* Table search */}
        <div className="w-full mb-4 flex items-center px-4 h-[40px] rounded-[6px] border-[1px] border-[#E9EBF0]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_0_1937)">
              <circle
                cx="7.66683"
                cy="7.66659"
                r="6.33333"
                stroke="#C7CED9"
                strokeWidth="2"
              />
              <path
                d="M12.3335 12.3333L14.6668 14.6666"
                stroke="#C7CED9"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_1937">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="w-full border-none outline-none h-[38px] pl-4 text-[14px] font-[600] text-black "
            placeholder="Gözleg"
          />
        </div>
        {/* Table header */}
        <div className="w-full gap-[20px] flex items-center px-4 h-[40px] rounded-[6px] bg-[#F7F8FA]">
          <h1 className="text-[14px] whitespace-nowrap font-[500] text-[#98A2B2] w-[25%] uppercase">
            Ady Familýasy
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[25%] uppercase">
            Telefon
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[10%]   whitespace-nowrap uppercase">
            Bahasy
          </h1>

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[20%]   whitespace-nowrap uppercase">
            Cashback
          </h1>

          <h1 className="text-[14px] font-[500] whitespace-nowrap text-[#98A2B2] w-[20%] text-center uppercase">
            Töleg
          </h1>
        </div>

        {/* Table body */}
        <div className="w-full flex flex-wrap">
          {data?.data?.transactions?.map((item, i) => {
            return loading ? (
              <PageLoading />
            ) : (
              <div
                key={"categoryItem" + i}
                className="w-full gap-[20px] flex items-center px-4 h-[70px] rounded-[6px] bg-white border-b-[1px] border-[#E9EBF0]"
              >
                <h1 className="text-[14px] font-[500] text-black w-[25%] uppercase">
                  {item?.customer?.first_name} {item?.customer?.last_name}
                </h1>

                <h1 className="text-[14px] font-[500] text-black w-[25%] uppercase">
                  {item?.customer?.phone_number}
                </h1>

                <h1 className="text-[14px] font-[500] text-black w-[10%]   whitespace-nowrap uppercase">
                  {item?.amount} TMT
                </h1>

                <h1 className="text-[14px] font-[500] text-black w-[20%]   whitespace-nowrap uppercase">
                  {item?.cashback} TMT
                </h1>

                <h1 className="text-[14px] flex items-center justify-between gap-2 font-[500] text-[#98A2B2] w-[20%]   uppercase">
                  <div
                    className={`bg-opacity-15 px-4 py-2 w-fit whitespace-nowrap rounded-[12px] ${
                      item?.is_active ? "" : ""
                      // "text-[#44CE62] px-[26px] bg-[#44CE62]"
                      // : "text-[#E9B500] bg-[#E9B500]"
                    }  `}
                  >
                    {item?.title}
                  </div>

                  <div
                    onClick={() =>
                      history.push({ pathname: "/transactions/" + item?.id })
                    }
                    className="cursor-pointer p-2"
                  >
                    <svg
                      width="3"
                      height="15"
                      viewBox="0 0 3 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="1.5" cy="1.5" r="1.5" fill="black" />
                      <circle cx="1.5" cy="7.5" r="1.5" fill="black" />
                      <circle cx="1.5" cy="13.5" r="1.5" fill="black" />
                    </svg>
                  </div>
                </h1>
              </div>
            );
          })}
        </div>
        {/* Table footer */}

        <div className="w-full bg-white p-4 rounded-[8px] flex mt-5 justify-between items-center">
          <h1 className="text-[14px] font-[400]">
            {data?.data?.total} Sargytlar
          </h1>
          <Pagination
            meta={data?.data}
            pages={pages}
            length={data?.data?.transactions?.length}
            pageNo={filter.page}
            next={() => setFilter({ ...filter, page: filter.page + 1 })}
            prev={() => setFilter({ ...filter, page: filter.page - 1 })}
            goTo={(item) => setFilter({ ...filter, page: item })}
          />
        </div>

        {/* Selected items delete */}
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={isDelete}
          onClose={() => setISDelete(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 700,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <div className="flex w-[500px] border-b-[1px] border-[#E9EBF0] pb-5 justify-between items-center">
              <h1 className="text-[20px] font-[500]">
                Teswiriň aýyrylmagynyň sebäbi
              </h1>
              <button onClick={() => setISDelete(false)}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 1L1.00006 14.9999M0.999999 0.999943L14.9999 14.9999"
                    stroke="#B1B1B1"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-5">
              <h1 className="text-[16px] text-left  mb-1 font-[400]">
                Düşündiriş
              </h1>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[100px] border-[1px] border-[#98A2B2] rounded-[6px] outline-none p-2 w-full"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>

              <div className="flex mt-5 gap-[29px] justify-end">
                <button
                  onClick={() => setISDelete(false)}
                  className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-blue hover:text-white"
                >
                  Goýbolsun et
                </button>
                <button
                  onClick={() => deletecomments()}
                  className="text-[14px] font-[500] text-white hover:bg-[#fd6060] bg-[#FF4D4D] rounded-[8px] px-6 py-3"
                >
                  Aýyr
                </button>
              </div>
            </div>
          </Sheet>
        </Modal>
      </div>
    </div>
  );
};

export default React.memo(Sargytlar);
