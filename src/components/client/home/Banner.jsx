import React from "react";
import BannerImg from "../../../assets/banner_1.png";
export const Banner = () => {
  const bannerMap = [1, 1, 1, 1];

  return (
    <section className="bg-gray-100 ">
      <div className="max-w-screen-xl py-28 mx-auto px-4 ">
        <div className="flex justify-between items-center">
          <div className="max-w-xl">
            <h1 className="text-gray-950 text-6xl mb-7">
              Find a job that suits your interest & skills.
            </h1>
            <span className="text-gray-600 text-lg block mb-5">
              Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
              in scelerisque leo, eget sollicitudin velit bestibulum.
            </span>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-blue-700 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Job tittle, Keyword..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Find Job
              </button>
            </div>
          </div>
          <div>
            <img src={BannerImg} alt="" />
          </div>
        </div>

        <div className="flex justify-between items-center mt-24">
          {bannerMap.map((_, index) => (
            <div className="bg-white rounded-lg shadow-lg p-6 flex gap-5 items-center w-[23%]">
              <div className="p-4 bg-blue-200 rounded-lg ">
                <svg
                  class="w-[30px] h-[30px] text-blue-700 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m6 10.5237-2.27075.6386C3.29797 11.2836 3 11.677 3 12.125V20c0 .5523.44772 1 1 1h2V10.5237Zm12 0 2.2707.6386c.4313.1213.7293.5147.7293.9627V20c0 .5523-.4477 1-1 1h-2V10.5237Z" />
                  <path
                    fill-rule="evenodd"
                    d="M12.5547 3.16795c-.3359-.22393-.7735-.22393-1.1094 0l-6.00002 4c-.45952.30635-.5837.92722-.27735 1.38675.30636.45953.92723.5837 1.38675.27735L8 7.86853V21h8V7.86853l1.4453.96352c.0143.00957.0289.01873.0435.02746.1597.09514.3364.14076.5112.1406.3228-.0003.6395-.15664.832-.44541.3064-.45953.1822-1.0804-.2773-1.38675l-6-4ZM10 12c0-.5523.4477-1 1-1h2c.5523 0 1 .4477 1 1s-.4477 1-1 1h-2c-.5523 0-1-.4477-1-1Zm1-4c-.5523 0-1 .44772-1 1s.4477 1 1 1h2c.5523 0 1-.44772 1-1s-.4477-1-1-1h-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className="">
                <p className="text-gray-950 text-2xl font-semibold">
                  1,234,223
                </p>
                <p className="text-gray-500 text-base">Job Posted</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
