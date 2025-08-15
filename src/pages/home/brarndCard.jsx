import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Context } from "../../context/context";
import lang from "../../lang/home.json";
import { BASE_URL } from "../../utils/axiosIntance";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BrandCard = (props) => {
  const history = useHistory();
  const { dil } = useContext(Context);
  return (
    <div
      onClick={() =>
        history.push({
          pathname: "/brand/" + props.data.id,
        })
      }
      className="cursor-pointer w-fit"
    >
      <div className=" z-10  w-[60px] md:w-[134px]  flex items-center justify-center h-[60px] md:h-[134px] bg-footerBackground  rounded-[100%]">
        <LazyLoadImage
          className="   h-[60%] z-1 object-contain"
          src={BASE_URL + "/" + props?.data?.img}
          alt="category_surat"
        />
      </div>

      <div className=" text-center my-2 text-black font-[500] text-[10px] md:text-[16px]    ">
        {dil == "TM"
          ? props?.data?.name_tm
          : dil == "RU"
          ? props?.data?.name_ru
          : props?.data?.name_en}
      </div>
    </div>
  );
};

export default BrandCard;
