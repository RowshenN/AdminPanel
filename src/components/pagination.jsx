import React from "react";

const Pagination = (props) => {
  return (
    <div className="flex items-center cursor-pointer gap-6">
      <div>
        {props?.pageNo != 1 ? (
          <svg
            onClick={() => props?.prev()}
            className="rotate-180"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L4.29289 4.29289C4.68342 4.68342 4.68342 5.31658 4.29289 5.70711L1 9"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 9L1.70711 5.70711C1.31658 5.31658 1.31658 4.68342 1.70711 4.29289L5 1"
              stroke="#B8BFCC"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <div className="w-fit flex gap-6">
        {props?.pages?.map((item, i) => {
          return (
            (i == 0 ||
              i == 1 ||
              i == props?.pages?.length - 2 ||
              i == props?.pages?.length - 1 ||
              props?.meta?.page == item ||
              props?.meta?.page == item + 1 ||
              props?.meta?.page == item - 1) && (
              <div
                key={"page" + i + 1}
                onClick={() => props?.goTo(item)}
                className={`text-[14px] font-[400]  ${
                  props?.meta?.page == item && "text-blue"
                }`}
              >
                {item}
              </div>
            )
          );
        })}
      </div>
      <div>
        {props?.length >= 10 ? (
          <svg
            onClick={() => props?.next()}
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L4.29289 4.29289C4.68342 4.68342 4.68342 5.31658 4.29289 5.70711L1 9"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            className="rotate-180"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 9L1.70711 5.70711C1.31658 5.31658 1.31658 4.68342 1.70711 4.29289L5 1"
              stroke="#B8BFCC"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default React.memo(Pagination);
