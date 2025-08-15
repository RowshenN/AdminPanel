import React, { useState } from "react";

const CheckBox = (props) => {
  return (
    <div className="cursor-pointer">
      {props?.checked == true ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 2C16.6569 2 18 3.34315 18 5V15.0001C18 16.6569 16.6569 18.0001 15 18.0001H5C3.34315 18.0001 2 16.6569 2 15.0001L2 5C2 3.34315 3.34315 2 5 2L15 2Z"
            fill="#0075FF"
          />
          <path
            d="M7 10L9 12L14 7"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 2C16.6569 2 18 3.34315 18 5V15.0001C18 16.6569 16.6569 18.0001 15 18.0001H5C3.34315 18.0001 2 16.6569 2 15.0001L2 5C2 3.34315 3.34315 2 5 2L15 2Z"
            stroke="#98A2B2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default CheckBox;
