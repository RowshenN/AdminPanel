import React, { useEffect, useRef, useState, useContext } from "react";
import { Context } from "../context/context";
import { useHistory, useLocation } from "react-router-dom";

import { axiosInstance } from "../utils/axiosIntance";
import lang from "../lang/home.json";

const Header = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openCat2, setOpenCat2] = useState(false);
  const path = useLocation();
  const { dil, ChangeDil } = useContext(Context);
  const user = JSON.parse(localStorage.getItem("userData"));
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  function useOutsideAlerterCat(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenCat(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  function useOutsideAlerterCat2(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenCat2(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  const wrapperRefCat = useRef(null);
  const wrapperRefCat2 = useRef(null);
  useOutsideAlerter(wrapperRef);
  useOutsideAlerterCat(wrapperRefCat);
  useOutsideAlerterCat2(wrapperRefCat2);
  const date = new Date();
  const months = [
    "Ýanwar",
    "Fewral",
    "Mart",
    "Aprel",
    "Maý",
    "Iýun",
    "Iýul",
    "Awgust",
    "Sentýabr",
    "Oktýabr",
    "Noýabr",
    "Dekabr",
  ];

  return (
    <div className="w-full border-[1px] sticky top-0 z-20 bg-[#F7F8FA] border-[#E9EBF0] h-[100px] flex justify-between px-[30px] items-center">
      <div>
        <h1 className="leading-[28px] text-[16px] font-[600] text-black">
          Hoş geldiňiz,{" "}
          {(user?.admin?.name != null ? user?.admin?.name : "") +
            " " +
            (user?.admin?.surname != null ? user?.admin?.surname : "")}
        </h1>
        <div className="flex gap-3 items-center mt-2">
          <p className="text-[#98A2B2] text-[12px] leading-[14px] font-[500] border-r-[1px] border-[#98A2B2] pr-3">
            {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
          </p>
          <p className="text-[#98A2B2] text-[12px]  leading-[14px] font-[500]">
            {date.getHours()}:{date.getMinutes()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-[27px]">
        {/* <div className="flex cursor-pointer gap-5 pr-[27px] border-r-[1px] border-[#E9EBF0]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7491 9.70957V9.00497C18.7491 5.13623 15.7274 2 12 2C8.27256 2 5.25087 5.13623 5.25087 9.00497V9.70957C5.25087 10.5552 5.00972 11.3818 4.5578 12.0854L3.45036 13.8095C2.43882 15.3843 3.21105 17.5249 4.97036 18.0229C9.57274 19.3257 14.4273 19.3257 19.0296 18.0229C20.789 17.5249 21.5612 15.3843 20.5496 13.8095L19.4422 12.0854C18.9903 11.3818 18.7491 10.5552 18.7491 9.70957Z"
              stroke="#B8BFCC"
              strokeWidth="2"
            />
            <path
              d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
              stroke="#B8BFCC"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0867 21.3877L13.9472 21.8971L13.0867 21.3877ZM13.6288 20.4718L12.7682 19.9625L13.6288 20.4718ZM10.3712 20.4718L9.51065 20.9812H9.51065L10.3712 20.4718ZM10.9133 21.3877L11.7739 20.8783L10.9133 21.3877ZM2.3806 15.9134L3.30448 15.5307H3.30448L2.3806 15.9134ZM7.78958 18.9915L7.77235 19.9913L7.78958 18.9915ZM5.08658 18.6194L4.7039 19.5433H4.7039L5.08658 18.6194ZM21.6194 15.9134L22.5433 16.2961V16.2961L21.6194 15.9134ZM16.2104 18.9915L16.1932 17.9916L16.2104 18.9915ZM18.9134 18.6194L19.2961 19.5433H19.2961L18.9134 18.6194ZM19.6125 2.7368L19.09 3.58944L19.6125 2.7368ZM21.2632 4.38751L22.1158 3.86501V3.86501L21.2632 4.38751ZM4.38751 2.7368L3.86501 1.88416V1.88416L4.38751 2.7368ZM2.7368 4.38751L1.88416 3.86501H1.88416L2.7368 4.38751ZM9.40279 19.2098L9.90556 18.3454L9.90555 18.3454L9.40279 19.2098ZM13.9472 21.8971L14.4893 20.9812L12.7682 19.9625L12.2261 20.8783L13.9472 21.8971ZM9.51065 20.9812L10.0528 21.8971L11.7739 20.8783L11.2318 19.9625L9.51065 20.9812ZM12.2261 20.8783C12.1817 20.9534 12.1041 20.9999 12 20.9999C11.8958 20.9999 11.8183 20.9534 11.7739 20.8783L10.0528 21.8971C10.9231 23.3675 13.0768 23.3675 13.9472 21.8971L12.2261 20.8783ZM10.5 3H13.5V1H10.5V3ZM21 10.5V11.5H23V10.5H21ZM3 11.5V10.5H1V11.5H3ZM1 11.5C1 12.6512 0.999458 13.5646 1.04989 14.3038C1.10094 15.052 1.20754 15.6945 1.45672 16.2961L3.30448 15.5307C3.17306 15.2135 3.08936 14.8141 3.04526 14.1677C3.00054 13.5124 3 12.6785 3 11.5H1ZM7.80681 17.9916C6.55134 17.97 5.93668 17.8891 5.46926 17.6955L4.7039 19.5433C5.5571 19.8967 6.51709 19.9697 7.77235 19.9913L7.80681 17.9916ZM1.45672 16.2961C2.06569 17.7663 3.23373 18.9343 4.7039 19.5433L5.46927 17.6955C4.48915 17.2895 3.71046 16.5108 3.30448 15.5307L1.45672 16.2961ZM21 11.5C21 12.6785 20.9995 13.5124 20.9547 14.1677C20.9106 14.8141 20.8269 15.2135 20.6955 15.5307L22.5433 16.2961C22.7925 15.6945 22.8991 15.052 22.9501 14.3038C23.0005 13.5646 23 12.6512 23 11.5H21ZM16.2276 19.9913C17.4829 19.9697 18.4429 19.8967 19.2961 19.5433L18.5307 17.6955C18.0633 17.8891 17.4486 17.97 16.1932 17.9916L16.2276 19.9913ZM20.6955 15.5307C20.2895 16.5108 19.5108 17.2895 18.5307 17.6955L19.2961 19.5433C20.7663 18.9343 21.9343 17.7663 22.5433 16.2961L20.6955 15.5307ZM13.5 3C15.1561 3 16.3279 3.00106 17.2382 3.08761C18.1337 3.17275 18.6724 3.33351 19.09 3.58944L20.135 1.88416C19.3503 1.40329 18.4694 1.19565 17.4276 1.09659C16.4006 0.998945 15.1174 1 13.5 1V3ZM23 10.5C23 8.88265 23.0011 7.59941 22.9034 6.57244C22.8043 5.53059 22.5967 4.64971 22.1158 3.86501L20.4106 4.91001C20.6665 5.32765 20.8272 5.8663 20.9124 6.76175C20.9989 7.67209 21 8.84392 21 10.5H23ZM19.09 3.58944C19.6282 3.91926 20.0807 4.37178 20.4106 4.91001L22.1158 3.86501C21.6211 3.05768 20.9423 2.37889 20.135 1.88416L19.09 3.58944ZM10.5 1C8.88265 1 7.59941 0.998945 6.57244 1.09659C5.53059 1.19565 4.64971 1.40329 3.86501 1.88416L4.91001 3.58944C5.32765 3.33351 5.8663 3.17275 6.76175 3.08761C7.67209 3.00106 8.84392 3 10.5 3V1ZM3 10.5C3 8.84392 3.00106 7.67209 3.08761 6.76175C3.17275 5.8663 3.33351 5.32765 3.58944 4.91001L1.88416 3.86501C1.40329 4.64971 1.19565 5.53059 1.09659 6.57244C0.998945 7.59941 1 8.88265 1 10.5H3ZM3.86501 1.88416C3.05768 2.37889 2.37889 3.05768 1.88416 3.86501L3.58944 4.91001C3.91926 4.37178 4.37178 3.91926 4.91001 3.58944L3.86501 1.88416ZM11.2318 19.9625C11.0311 19.6235 10.8461 19.3088 10.6641 19.0591C10.4698 18.7926 10.2363 18.5378 9.90556 18.3454L8.90003 20.0743C8.90695 20.0783 8.94742 20.0993 9.04782 20.2371C9.16052 20.3917 9.2908 20.6098 9.51065 20.9812L11.2318 19.9625ZM7.77235 19.9913C8.21609 19.999 8.48062 20.0045 8.67837 20.0264C8.85757 20.0463 8.8964 20.0722 8.90003 20.0743L9.90555 18.3454C9.57149 18.1511 9.22888 18.0751 8.89849 18.0386C8.58664 18.004 8.21341 17.9986 7.80681 17.9916L7.77235 19.9913ZM14.4893 20.9812C14.7092 20.6098 14.8394 20.3917 14.9521 20.2371C15.0525 20.0993 15.093 20.0783 15.0999 20.0743L14.0944 18.3454C13.7636 18.5378 13.5301 18.7926 13.3359 19.0591C13.1539 19.3088 12.9688 19.6235 12.7682 19.9625L14.4893 20.9812ZM16.1932 17.9916C15.7865 17.9986 15.4133 18.004 15.1015 18.0386C14.7711 18.0751 14.4285 18.1511 14.0944 18.3454L15.0999 20.0743C15.1036 20.0722 15.1424 20.0463 15.3216 20.0264C15.5193 20.0045 15.7839 19.999 16.2276 19.9913L16.1932 17.9916Z"
              fill="#B8BFCC"
            />
            <path
              d="M8 9H16"
              stroke="#B8BFCC"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 12.5H13.5"
              stroke="#B8BFCC"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex h-[50px] bg-white px-[15px] gap-[15px] border-[1px] border-[#E9EBF0] w-[340px] justify-start items-center rounded-[6px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_0_1365)">
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
              <clipPath id="clip0_0_1365">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input
            placeholder="Gözleg"
            className="h-[48px] w-full outline-none rounded-[6px]"
            type="text"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
