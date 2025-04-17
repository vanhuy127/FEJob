import React, { createContext, useState } from "react";

export const PopUpCVContext = createContext();

export const PopUpCVProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
    onConfirm: null,
  });

  const openPopup = ({ message, onConfirm }) => {
    setPopup({
      isOpen: true,
      message,
      onConfirm,
    });
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <PopUpCVContext.Provider value={{ openPopup, closePopup }}>
      <div className="relative">{children}</div>
      {popup.isOpen && (
        <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-slate-200/70">
          <div
            id="popup-modal"
            className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Ứng tuyển ngay
                  </h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="select-modal"
                    onClick={closePopup}
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="p-4 md:p-5">
                  <p class="text-gray-500 dark:text-gray-400 mb-4">
                    Select your desired position:
                  </p>
                  <ul class="space-y-4 mb-4">
                    <li>
                      <input
                        type="radio"
                        id="job-1"
                        name="job"
                        value="job-1"
                        class="hidden peer"
                        required
                      />
                      <label
                        for="job-1"
                        class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                      >
                        <div class="block">
                          <div class="w-full text-lg font-semibold">
                            UI/UX Engineer
                          </div>
                          <div class="w-full text-gray-500 dark:text-gray-400">
                            Flowbite
                          </div>
                        </div>
                        <svg
                          class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="job-2"
                        name="job"
                        value="job-2"
                        class="hidden peer"
                      />
                      <label
                        for="job-2"
                        class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                      >
                        <div class="block">
                          <div class="w-full text-lg font-semibold">
                            React Developer
                          </div>
                          <div class="w-full text-gray-500 dark:text-gray-400">
                            Alphabet
                          </div>
                        </div>
                        <svg
                          class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="job-3"
                        name="job"
                        value="job-3"
                        class="hidden peer"
                      />
                      <label
                        for="job-3"
                        class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                      >
                        <div class="block">
                          <div class="w-full text-lg font-semibold">
                            Full Stack Engineer
                          </div>
                          <div class="w-full text-gray-500 dark:text-gray-400">
                            Apple
                          </div>
                        </div>
                        <svg
                          class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </label>
                    </li>
                  </ul>
                  <button class="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Next step
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PopUpCVContext.Provider>
  );
};
