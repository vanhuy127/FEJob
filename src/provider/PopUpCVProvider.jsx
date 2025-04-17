import React, { createContext, useContext, useState } from "react";
import { AlertContext } from "../provider/AlertProvider";
import ApiService from "../service/api";
export const PopUpCVContext = createContext();

export const PopUpCVProvider = ({ children }) => {
  const { handleOpenAlert } = useContext(AlertContext);

  const [file, setFile] = useState(null);
  const [popup, setPopup] = useState({
    isOpen: false,
    user: {},
    job: {},
  });

  const openPopup = ({ user, job }) => {
    setPopup({
      isOpen: true,
      user,
      job,
    });
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, isOpen: false }));
  };
  console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      handleOpenAlert({
        type: "error",
        message: "Vui lòng tải CV của bạn lên",
      });
      return;
    }

    // Kiểm tra định dạng và kích thước file
    if (!validTypes.includes(file.type)) {
      handleOpenAlert({
        type: "error",
        message:
          "Định dạng file không hợp lệ. Chỉ hỗ trợ *.doc, *.docx, *.pdf.",
      });
      return;
    }

    if (file.size > maxSize) {
      handleOpenAlert({
        type: "error",
        message: "Kích thước file không được vượt quá 5MB.",
      });
      return;
    }

    try {
      const fileRes = await ApiService.callUploadSingleFile(file, "resume");
      if (fileRes.status === 200) {
        const fileName = fileRes?.data?.data?.fileName;
        const cvRes = await ApiService.callCreateResume(
          fileName,
          popup.job.id,
          popup.user.email,
          popup.user.id
        );
        console.log("cvRes", cvRes);
        if (cvRes.status === 201) {
          setFile(null);
          handleOpenAlert({
            type: "success",
            message: "Nộp đơn thành công thành công",
          });
          setTimeout(() => {
            closePopup();
          }, 2000);
        }
      }
    } catch (error) {
      handleOpenAlert({
        type: "error",
        message: "Đã xảy ra lỗi, vui lòng thử lại",
      });
      console.error("Lỗi khi upload CV", error);
    }
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
            <div className="relative p-4 w-[700px] max-h-full">
              {/* <!-- Modal content --> */}
              <div className="w-full relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Ứng tuyển ngay
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="select-modal"
                    onClick={closePopup}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <div>
                    <div>
                      <label
                        htmlFor="input-group-1"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 16"
                          >
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          disabled
                          id="input-group-1"
                          className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={popup.user?.email}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-center w-full mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Tải lên CV của bạn
                    </label>
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            Tải lên CV của bạn
                          </span>{" "}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ( Hỗ trợ *.doc, *.docx, *.pdf, and &lt; 5MB )
                        </p>
                        {file && (
                          <p className="text-xs text-red-500 dark:text-gray-400">
                            Đã tải lên file{" "}
                            <span className="font-bold">{file.name}</span>
                          </p>
                        )}
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Nộp CV của bạn nào
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
