import React from "react";
import { Link } from "react-router-dom";

const Card = (data: any) => {
  console.log("file: index.tsx ~ line 4 ~ Card ~ data", data.data);
  data = data.data;
  return (
    <div className="break-inside h-full w-100 text-left relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl max-w-[23rem] p-4 mb-4 bg-white text-black dark:bg-slate-800 dark:text-white">
      <div className="flex items-center flex-col justify-between font-medium">
        <span className="uppercase text-xs text-green-500">
          by {data?.userName}
        </span>
        <span className="text-xs text-slate-500">
          contract address: {data?.contractAddress}
        </span>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <div className="flex flex-none items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="14 2 18 6 7 17 3 17 3 13 14 2" />
            <line x1={3} y1={22} x2={21} y2={22} />
          </svg>
        </div>
        <span className="text-base font-medium">{data?.indexerName}</span>
      </div>
      <div> Description: {data?.description}</div>
      <div className="flex justify-between items-center">
        <Link to={`/indexer/${data?.userName}/${data?.contractAddress}`}>
          <button className="flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
            <span>View</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
