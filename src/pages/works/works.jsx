import React, { useEffect, useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import CheckBox from "../../components/CheckBox";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "../../components/pagination";
import PageLoading from "../../components/PageLoading";

import trash from "../../images/Trash.svg";

const Works = () => {
  const path = useLocation();
  const history = useHistory();
  const [pages, setPages] = useState([]);
  const [works, setWorks] = useState([]);
  const [selecteds, setSelecteds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDelete, setISDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [isId, setIsId] = useState(null);
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    search_query: "",
    sort: "default",
  });

  const fetchWorks = () => {
    setLoading(true);
    axiosInstance
      .get("/api/works/all", {
        params: {
          name: filter.search_query,
          order: filter.sort === "default" ? 1 : -1,
          deleted: false,
        },
      })
      .then((res) => {
        setWorks(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWorks();
  }, [filter]);

  useEffect(() => {
    const time = setTimeout(() => {
      setSearch(filter.search_query);
    }, 500);
    return () => clearTimeout(time);
  }, [filter]);

  const selectItem = (id) => {
    let array = selecteds;
    let bar = false;
    array.map((item) => {
      if (item === id) {
        bar = true;
      }
    });

    if (bar) {
      let newArray = selecteds.filter((item) => item !== id);
      setSelecteds([...newArray]);
    } else {
      array.push(id);
      setSelecteds([...array]);
    }
  };

  const selectAll = () => {
    setAllSelected(true);
    let array = [];
    works?.map((item) => {
      array.push(item?.id);
    });
    setSelecteds([...array]);
  };

  const isSelected = (id) => {
    let array = selecteds;
    let bar = false;
    array?.map((item) => {
      if (item === id) {
        bar = true;
      }
    });
    return bar;
  };
  const deleteWorks = () => {
    axiosInstance
      .delete(`/api/works/delete/${isId}`)
      .then(() => {
        console.log("sucesfully");
        setISDelete(false);
        fetchWorks();
      })
      .catch(console.log);
  };

  if (loading) return <PageLoading />;

  return (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Işler</h1>
        <div className="w-fit flex gap-5">
          <Select
            placeholder="Hemmesini görkez"
            onChange={(e, value) => setFilter({ ...filter, sort: value })}
            value={filter.sort}
            className="!border-[#E9EBF0] !border-[1px] !h-[40px] !bg-white !rounded-[8px] !px-[17px] !w-fit !min-w-[200px] !text-[14px] !text-black"
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
            <Option value="asc">Adyna görä</Option>
            <Option value="desc">-Adyna görä</Option>
            <Option value="date">Senesine görä</Option>
            <Option value="-date">-Senesine görä</Option>
          </Select>
          <Button
            onClick={() => history.push({ pathname: "/works/create" })}
            className="!h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit !text-[14px] !text-white"
            startDecorator={<Add />}
          >
            Goş
          </Button>
        </div>
      </div>

      {/*  Table*/}
      <div className="w-full p-5 bg-white rounded-[8px]">
        {/* Table search */}
        <div className="w-full mb-4 flex items-center px-4 h-[40px] rounded-[6px] border-[1px] border-[#E9EBF0]">
          <input
            value={filter.search_query}
            onChange={(e) =>
              setFilter({ ...filter, search_query: e.target.value })
            }
            type="text"
            className="w-full border-none outline-none h-[38px] pl-4 text-[14px] font-[600] text-black"
            placeholder="Gözleg"
          />
        </div>

        {/* Table header */}
        <div className="w-full gap-[20px] flex items-center px-4 h-[40px] rounded-[6px] bg-[#F7F8FA]">
          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[8%] min-w-[45px] uppercase">
            Surat
          </h1>
          <h1 className="text-[14px] whitespace-nowrap font-[500] text-[#98A2B2] w-[25%] uppercase">
            Ady
          </h1>
          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[20%] whitespace-nowrap uppercase">
            Text
          </h1>
          <h1 className="text-[14px] font-[500] whitespace-nowrap text-[#98A2B2] w-[15%] text-center uppercase">
            Status
          </h1>
        </div>

        {/* Table body */}
        {works?.map((item, i) => (
          <div
            key={"work" + i}
            className="w-full gap-[20px] flex items-center px-4 h-[70px] rounded-[6px] bg-white border-b-[1px] border-[#E9EBF0]"
          >
            <div className="w-[8%] min-w-[45px]">
              <h1 className="rounded-[4px] flex items-center justify-center w-[40px] h-[40px] bg-[#F7F8FA]">
                <img src={process.env.REACT_APP_BASE_URL + item?.img} alt="" />
              </h1>
            </div>

            <h1 className="text-[14px] font-[500] text-black w-[25%] ">
              {item?.name_tm || item?.name_ru || item?.name_en}
            </h1>

            <h1 className="text-[14px] font-[500] text-black w-[25%] ">
              {item?.text_tm || item?.text_ru || item?.text_en}
            </h1>

            <h1 className="text-[14px] flex items-center justify-between gap-2 font-[500] text-[#98A2B2] w-[15%] uppercase">
              <div
                className={`bg-opacity-15 px-4 py-2 w-fit rounded-[12px] ${
                  item?.deleted
                    ? "text-[#E9B500] bg-[#E9B500]"
                    : "text-[#44CE62] bg-[#44CE62]"
                }`}
              >
                {item?.deleted ? "Deleted" : "Active"}
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
                  setIsId(item.id);
                }}
                className="cursor-pointer "
              >
                <img src={trash} alt="trash" />
              </div>
            </h1>
          </div>
        ))}

        {/* Table footer */}
        <div className="sticky bottom-0 bg-white h-fit py-1">
          {selecteds?.length === 0 ? (
            <div className="w-full flex mt-5 justify-between items-center">
              <h1 className="text-[14px] font-[400]">{works?.length} işler</h1>
              <Pagination
                meta={{}}
                pages={pages}
                pageNo={filter.page}
                length={works?.length}
                next={() => setFilter({ ...filter, page: filter.page + 1 })}
                prev={() => setFilter({ ...filter, page: filter.page - 1 })}
                goTo={(item) => setFilter({ ...filter, page: item })}
              />
            </div>
          ) : (
            <div className="w-full mt-2 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
              <h1 className="text-[14px] font-[400]">
                {selecteds?.length + " "} sany saýlandy
              </h1>
              <div className="w-fit flex gap-6 items-center ">
                <button
                  onClick={() => {
                    setSelecteds([]);
                    setAllSelected(false);
                  }}
                  className="text-[#98A2B2] text-[14px] font-[500] py-[11px] px-[27px] hover:bg-blue hover:text-white rounded-[8px]"
                >
                  Goýbolsun et
                </button>
                <button
                  onClick={() => setISDelete(true)}
                  className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-[#FF4D4D] rounded-[8px]"
                >
                  Aýyr
                </button>
              </div>
            </div>
          )}
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
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <div className="flex w-[350px] border-b-[1px] border-[#E9EBF0] pb-5 justify-between items-center">
              <h1 className="text-[20px] font-[500]">Işi aýyrmak</h1>
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

            <div>
              <h1 className="text-[16px] text-center my-10 font-[400]">
                Işi aýyrmak isleýärsiňizmi?
              </h1>

              <div className="flex gap-[29px] justify-center">
                <button
                  onClick={() => setISDelete(false)}
                  className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-blue hover:text-white"
                >
                  Goýbolsun et
                </button>
                <button
                  onClick={() => deleteWorks()}
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

export default React.memo(Works);
