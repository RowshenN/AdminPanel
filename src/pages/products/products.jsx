import React, { useEffect, useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import CheckBox from "../../components/CheckBox";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Pagination from "../../components/pagination";
import PageLoading from "../../components/PageLoading";
import { useGetAllProductsQuery } from "../../services/products";

const Products = () => {
  const path = useLocation();
  console.log("path", path);
  const history = useHistory();
  const [pages, setPages] = useState([]);
  const [products, setProducts] = useState([]);
  const [selecteds, setSelecteds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDelete, setISDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    search_query: "",
    sort: "default",
    type:
      path?.pathname == "/products"
        ? "product"
        : path?.pathname == "/posts"
        ? "post"
        : "",
  });

  const { data, error, isLoading } = useGetAllProductsQuery(search);

  useEffect(() => {
    const time = setTimeout(() => {
      setSearch(filter.search_query);
    }, 500);
    return () => clearTimeout(time);
  }, [filter]);

  if (isLoading) return <PageLoading />;
  if (error) {
    return <div>Ýalňyşlyk boldy</div>;
  }
  console.log("products", data);

  const selectItem = (id) => {
    let array = selecteds;
    let bar = false;
    array.map((item) => {
      if (item == id) {
        bar = true;
      }
    });

    if (bar) {
      let newArray = selecteds.filter((item) => {
        return item != id;
      });
      setSelecteds([...newArray]);
    } else {
      array.push(id);
      setSelecteds([...array]);
    }
  };

  const selectAll = () => {
    setAllSelected(true);
    let array = [];
    products?.data?.map((item) => {
      array.push(item?.id);
    });
    setSelecteds([...array]);
  };

  const isSelected = (id) => {
    let array = selecteds;
    let bar = false;
    array?.map((item) => {
      if (item == id) {
        bar = true;
      }
    });
    return bar;
  };

  const deleteProducts = () => {
    // setISDelete(false);
    // axiosInstance
    //   .post("/posts/delete", {
    //     posts: selecteds,
    //   })
    //   .then((data) => {
    //     console.log(data.data);
    //     getProducts();
    //     setSelecteds([]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Harytlar</h1>
        <div className="w-fit flex gap-5">
          <Select
            placeholder="Hemmesini görkez"
            onChange={(e, value) => setFilter({ ...filter, sort: value })}
            value={filter.value}
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
            <Option value="created_at">-Senesine görä</Option>
            <Option value="-is_active">Garaşylýar</Option>
            <Option value="is_active">Aktive</Option>
            <Option value="price">Bahasyna görä</Option>
            <Option value="-price">-Bahasyna görä</Option>
          </Select>
          <Button
            onClick={() => history.push({ pathname: "/products/create" })}
            className="  !h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit   !text-[14px] !text-white  "
            startDecorator={<Add />}
          >
            Goş
          </Button>
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
          {/* {allSelected ? (
            <div
              onClick={() => {
                setSelecteds([]);
                setAllSelected(false);
              }}
            >
              <CheckBox checked={true} />
            </div>
          ) : (
            <div onClick={() => selectAll()}>
              <CheckBox checked={false} />
            </div>
          )} */}
          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[8%] min-w-[45px] uppercase">
            Surat
          </h1>

          <h1 className="text-[14px] whitespace-nowrap font-[500] text-[#98A2B2] w-[25%] uppercase">
            Ady
          </h1>

          {/* <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[10%]   whitespace-nowrap uppercase">
            Bahasy
          </h1> */}

          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[20%]   whitespace-nowrap uppercase">
            KAtegoriýa
          </h1>

          <h1 className="text-[14px] font-[500] whitespace-nowrap text-[#98A2B2] w-[15%] text-center uppercase">
            Status
          </h1>
        </div>

        {/* Table body */}
        {data?.data?.map((item, i) => {
          return loading ? (
            <PageLoading />
          ) : (
            <div
              key={"products" + i}
              className="w-full gap-[20px] flex items-center px-4 h-[70px] rounded-[6px] bg-white border-b-[1px] border-[#E9EBF0]"
            >
              {/* <div onClick={() => selectItem(item?.id)}>
                {isSelected(item?.id) ? (
                  <CheckBox checked={true} />
                ) : (
                  <CheckBox checked={false} />
                )}
              </div> */}
              <div className="w-[8%] min-w-[45px]">
                <h1 className="rounded-[4px] flex items-center justify-center w-[40px] h-[40px] bg-[#F7F8FA]">
                  <img
                    src={process.env.REACT_APP_BASE_URL + item?.image_url}
                    alt=""
                  />
                </h1>
              </div>

              <h1 className="text-[14px] font-[500] text-black w-[25%] uppercase">
                {item?.title}
              </h1>

              <h1 className="text-[14px] font-[500] text-black w-[25%] uppercase">
                {item?.category?.title}
              </h1>

              {/* <h1 className="text-[14px] font-[500] text-black w-[10%]   whitespace-nowrap uppercase">
                {item?.price} TMT
              </h1>

              <h1 className="text-[14px] font-[500] text-black w-[20%]   whitespace-nowrap uppercase">
                {item?.category}
              </h1> */}

              <h1 className="text-[14px] flex items-center justify-between gap-2 font-[500] text-[#98A2B2] w-[15%]   uppercase">
                <div
                  className={`bg-opacity-15 px-4 py-2 w-fit rounded-[12px] ${
                    item?.is_active
                      ? "text-[#44CE62] px-[26px] bg-[#44CE62]"
                      : "text-[#E9B500] bg-[#E9B500]"
                  }  `}
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
              </h1>
            </div>
          );
        })}

        {/* Table footer */}
        <div className="sticky bottom-0 bg-white h-fit py-1">
          {selecteds?.length == 0 ? (
            <div className="w-full flex mt-5 justify-between items-center">
              <h1 className="text-[14px] font-[400]">
                {data?.data?.length} haryt
              </h1>
              <Pagination
                meta={products?.meta}
                pages={pages}
                pageNo={filter.page}
                length={data?.data?.length}
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
              <h1 className="text-[20px] font-[500]">Haryt aýyrmak</h1>
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
                Harydy aýyrmak isleýärsiňizmi?
              </h1>

              <div className="flex gap-[29px] justify-center">
                <button
                  onClick={() => setISDelete(false)}
                  className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-blue hover:text-white"
                >
                  Goýbolsun et
                </button>
                <button
                  onClick={() => deleteProducts()}
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

export default React.memo(Products);
