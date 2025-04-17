import React from "react";
import { Link, useNavigation } from "react-router-dom";

export const TopCompanyItem = ({ company }) => {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4  rounded-lg border border-gray-200 text-gray-500 hover:border-blue-500 hover:shadow-lg">
      <div className="flex items-center gap-4 w-full">
        <img
          className="w-16 h-16 rounded-lg object-cover"
          src={`${import.meta.env.VITE_IMAGE_URL}${company.logo}`}
          alt=""
        />
        <div className="flex flex-col justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-4 ">
            <h3 className="text-lg text-gray-800 font-semibold truncate w-fit">
              {company.name}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <div className="text-sm  flex items-center gap-1 overflow-hidden">
              <svg
                className="shrink-0 w-6 h-6 text-gray-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
                />
              </svg>

              <span className="truncate w-fit">{company.address}</span>
            </div>
          </div>
        </div>
      </div>
      <Link
        to={`/company/${company.id}`}
        className="bg-blue-300 text-blue-700 w-full text-center py-3 block rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
      >
        Chi tiết
      </Link>
    </div>
  );
};
