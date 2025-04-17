import React from "react";
import { TopCompanyItem } from "./TopCompanyItem";

export const TopCompany = ({ list }) => {
  console.log("list company", list);

  return (
    <section className="max-w-screen-xl py-28 mx-auto px-4 ">
      {/* headding */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">
          Các nhà tuyển dụng hàng đầu
        </h2>
        <a
          href="/company"
          className="group flex items-center gap-3 text-blue-700 hover:text-white border border-blue-700/30 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Xem tất cả
          <svg
            className="w-6 h-6 text-blue-700 dark:text-white group-hover:text-white dark:group-hover:text-blue-800"
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
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </a>
      </div>
      {/* company */}
      <div className="grid grid-cols-4 gap-6">
        {list &&
          list.map((company, index) => {
            return <TopCompanyItem key={index} company={company} />;
          })}
      </div>
    </section>
  );
};
