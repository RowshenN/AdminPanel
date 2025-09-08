import React, { useEffect, useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "../../components/pagination";
import PageLoading from "../../components/PageLoading";

import trash from "../../images/Trash.svg";
import { message } from "antd";

const News = () => {
  const path = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState({
    search_query: "",
    sort: "default",
    page: 1,
    limit: 10,
  });
  const [isDelete, setISDelete] = useState(false);
  const [identifier, setIdentifier] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        name: filter.search_query,
        order:
          filter.sort === "default" ? 1 : filter.sort.startsWith("-") ? 2 : 1,
        deleted: false,
      }).toString();

      const res = await axiosInstance.get(`/api/news/all?${query}`);
      setNews(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching news:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNews();
    }, 300);
    return () => clearTimeout(timer);
  }, [filter.search_query, filter.sort, filter.page]);

  console.log("news:  ", news);

  if (loading) return <PageLoading />;

  const deletCategories = () => {
    try {
      axiosInstance.delete(`/api/news/delete/${identifier}`);
      message.success("Täzelik üstünlikli pozuldy");
      setISDelete(false);
    } catch (error) {
      message.warning("Täzelik pozulmady");
      console.log(error);
    } finally {
      fetchNews();
    }
  };

  return (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Täzelikler</h1>
        <div className="w-fit flex gap-5">
          <Select
            placeholder="Hemmesini görkez"
            onChange={(e, value) => setFilter({ ...filter, sort: value })}
            value={filter.sort}
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
            <Option value="default">Hemmesini görkez</Option>
            <Option value="caption">Adyna görä</Option>
            <Option value="-caption">-Adyna görä</Option>
            <Option value="created_at">Senesine görä</Option>
            <Option value="-created_at">-Senesine görä</Option>
          </Select>
          <Button
            onClick={() => history.push({ pathname: "/news/create" })}
            className="!h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit !text-[14px] !text-white"
            startDecorator={<Add />}
          >
            Goş
          </Button>
        </div>
      </div>

      {/* Table */}
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
            value={filter.search_query}
            onChange={(e) =>
              setFilter({ ...filter, search_query: e.target.value })
            }
            type="text"
            className="w-full border-none outline-none h-[38px] pl-4 text-[14px] font-[600] text-black "
            placeholder="Gözleg"
          />
        </div>

        {/* Table header */}
        <div className="w-full gap-[20px] flex items-center px-4 h-[40px] rounded-[6px] bg-[#F7F8FA]">
          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[8%] min-w-[45px]">
            Surat
          </h1>
          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[25%]">Ady</h1>
          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[20%] whitespace-nowrap">
            Text
          </h1>
          <h1 className="text-[14px] font-[500] whitespace-nowrap text-[#98A2B2] w-[15%] text-center">
            Status
          </h1>
        </div>

        {/* Table body */}
        {Array.isArray(news) ? (
          news.map((item, i) => (
            <div
              key={"news" + i}
              className="w-full gap-[20px] flex items-center px-4 h-[70px] rounded-[6px] bg-white border-b-[1px] border-[#E9EBF0]"
            >
              <div className="w-[8%] min-w-[45px]">
                <h1 className="rounded-[4px] flex items-center justify-center w-[40px] h-[40px] bg-[#F7F8FA]">
                  <img
                    src={process.env.REACT_APP_BASE_URL + item?.img?.img_url}
                    alt=""
                  />
                </h1>
              </div>

              <h1 className="text-[14px] font-[500] text-black w-[25%]">
                {item?.name_tm}
              </h1>

              <h1 className="text-[14px] font-[500] text-black w-[20%]">
                {item?.text_tm}
              </h1>

              <h1 className="text-[14px] flex items-center justify-between gap-2 font-[500] text-[#98A2B2] w-[25%]">
                <div
                  className={`bg-opacity-15 px-4 py-2 w-fit rounded-[12px] ${
                    item?.is_active
                      ? "text-[#44CE62] px-[26px] bg-[#44CE62]"
                      : "text-[#E9B500] bg-[#E9B500]"
                  }`}
                >
                  {item?.is_active ? "Active" : "Garaşylýar"}
                </div>

                <div
                  onClick={() =>
                    history.push({ pathname: path?.pathname + "/" + item?.id })
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

                <div
                  onClick={() => {
                    setISDelete(true);
                    setIdentifier(item.id);
                  }}
                  className="cursor-pointer w-full h-full "
                >
                  <img src={trash} alt="trash" className="h-[20px] w-[25px] " />
                </div>
              </h1>
            </div>
          ))
        ) : (
          <div>Ýok</div>
        )}

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
            // variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <div className="flex w-[350px] border-b-[1px] border-[#E9EBF0] pb-5 justify-between items-center">
              <h1 className="text-[20px] font-[500]">Täzeligi aýyrmak</h1>
              <button onClick={() => setISDelete()}>
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

            <div>
              <h1 className="text-[16px] text-center my-10 font-[400]">
                Täzeligi aýyrmak isleýärsiňizmi?
              </h1>

              <div className="flex gap-[29px] justify-center">
                <button
                  onClick={() => setISDelete(false)}
                  className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-blue hover:text-white"
                >
                  Goýbolsun et
                </button>
                <button
                  onClick={() => deletCategories()}
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

export default React.memo(News);
