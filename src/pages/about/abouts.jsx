import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { Add } from "@mui/icons-material";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import PageLoading from "../../components/PageLoading";
import Pagination from "../../components/pagination";

const About = () => {
  const history = useHistory();
  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selecteds, setSelecteds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isDelete, setISDelete] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    order: 1,
    deleted: false,
    page: 1,
    limit: 10,
  });

  const fetchAbouts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        name: filter.name,
        order: filter.order,
        deleted: filter.deleted,
      }).toString();

      const { data } = await axiosInstance.get(`/api/about/all?${query}`);
      setAbouts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAbouts();
  }, [filter]);

  const selectItem = (id) => {
    if (selecteds.includes(id)) {
      setSelecteds(selecteds.filter((item) => item !== id));
    } else {
      setSelecteds([...selecteds, id]);
    }
  };

  const selectAll = () => {
    setAllSelected(true);
    setSelecteds(abouts.map((item) => item.id));
  };

  const isSelected = (id) => selecteds.includes(id);

  const deleteAbouts = async () => {
    // Implement your delete logic here
    setISDelete(false);
    setSelecteds([]);
  };

  return (
    <div className="w-full">
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Biz barada</h1>
        <div className="w-fit flex gap-5">
          <Button
            onClick={() => history.push("/about/create")}
            className="!h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit !text-[14px] !text-white"
            startDecorator={<Add />}
          >
            Goş
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full p-5 bg-white rounded-[8px]">
        {/* Search */}
        <div className="w-full mb-4 flex items-center px-4 h-[40px] rounded-[6px] border-[1px] border-[#E9EBF0]">
          <input
            type="text"
            placeholder="Gözleg"
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            className="w-full border-none outline-none h-[38px] pl-4 text-[14px] font-[600] text-black"
          />
        </div>

        {/* Table Header */}
        <div className="w-full gap-[30px] flex items-center px-4 h-[40px] rounded-[6px] bg-[#F7F8FA]">
          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[35%] uppercase">
            Header
          </h1>
          <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[55%] min-w-[120px] whitespace-nowrap uppercase">
            Text
          </h1>
        </div>

        {/* Table Body */}
        {loading ? (
          <PageLoading />
        ) : (
          abouts.map((item, i) => (
            <div
              key={i}
              className="w-full gap-[30px] flex items-center px-4 h-[70px] rounded-[6px] bg-white border-b-[1px] border-[#E9EBF0]"
            >
              <h1 className="text-[14px] font-[500] text-black w-[35%] uppercase">
                {item?.name_tm}
              </h1>
              <h1 className="text-[14px] font-[500] text-black w-[45%] min-w-[120px] uppercase">
                {item?.text_tm}
              </h1>
              <h1 className="text-[14px] flex items-center justify-between gap-4 font-[500] text-[#98A2B2] w-[15%] uppercase">
                <div
                  onClick={() => history.push("/about/" + item?.id)}
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
          ))
        )}

        {/* Table footer / Pagination */}
        <div className="w-full flex mt-5 justify-between items-center">
          <h1 className="text-[14px] font-[400]">{abouts.length} Biz barada</h1>
          <Pagination
            meta={null}
            pages={[]}
            pageNo={filter.page}
            length={abouts.length}
            next={() => setFilter({ ...filter, page: filter.page + 1 })}
            prev={() => setFilter({ ...filter, page: filter.page - 1 })}
            goTo={(item) => setFilter({ ...filter, page: item })}
          />
        </div>

        {/* Delete Modal */}
        <Modal
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
            sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
          >
            <div className="flex w-[350px] border-b-[1px] border-[#E9EBF0] pb-5 justify-between items-center">
              <h1 className="text-[20px] font-[500]">About aýyrmak</h1>
              <button onClick={() => setISDelete(false)}>X</button>
            </div>

            <div>
              <h1 className="text-[16px] text-center my-10 font-[400]">
                About aýyrmak isleýärsiňizmi?
              </h1>
              <div className="flex gap-[29px] justify-center">
                <button
                  onClick={() => setISDelete(false)}
                  className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-blue hover:text-white"
                >
                  Goýbolsun et
                </button>
                <button
                  onClick={deleteAbouts}
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

export default React.memo(About);
