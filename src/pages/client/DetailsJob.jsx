import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../../components/share/Loading";
import { useParams } from "react-router-dom";
import ApiService from "../../service/api";
import { formatCurrency, formatDate } from "../../utils/convert";
import parse from "html-react-parser";
import { useUserStore } from "../../store/UserStore";
import { PopUpCVContext } from "../../provider/PopUpCVProvider";

export const DetailsJob = () => {
  const { jobId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const { getCurrentUser } = useUserStore();
  const { openPopup } = useContext(PopUpCVContext);

  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser.id) return;
      try {
        const [jobRes, favoriteRes] = await Promise.all([
          ApiService.callFetchJobById(jobId),
          await ApiService.callGetFavoriteJobs(currentUser.id),
        ]);
        let jobTmp;
        if (jobRes.status === 200) {
          console.log("jobRes", jobRes);
          setJob(jobRes.data.data);
          jobTmp = jobRes.data.data;
        } else {
          console.error(jobRes.statusText);
        }

        if (favoriteRes.status === 200) {
          const isFavorite = favoriteRes.data.data.find(
            (i) => i.id === jobTmp.id
          );
          console.log("favRes", isFavorite);
          setIsFavorite(isFavorite);
        } else {
          console.error(favoriteRes.statusText);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [jobId, currentUser]);

  const handleChangeFavorite = async (jobId, userId) => {
    try {
      if (isFavorite) {
        const favRes = await ApiService.callRemoveFromFavorite(jobId, userId);
        console.log("favRemoveRes:", favRes);
        if (favRes.status === 200) {
          setIsFavorite(false);
        } else {
          console.error("favRemove failed:", favRes.statusText);
        }
        return;
      } else {
        const favRes = await ApiService.callAddToFavorite(jobId, userId);
        console.log("favAddRes:", favRes);
        if (favRes.status === 200) {
          setIsFavorite(true);
        } else {
          console.error("favAdd failed:", favRes.statusText);
        }
      }
    } catch (error) {
      console.error("Error change fav jobs:", error);
    }
  };

  const handleApply = () => {
    openPopup({
      user: currentUser,
      job: job,
      // onConfirm: () => deleteUser(id),
    });
  };
  return (
    <div className="max-w-screen-xl py-10 px-5 mx-auto ">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className=" bg-white rounded-2xl shadow p-6 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap">
            <div className="flex items-center space-x-4">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${job.company.logo}`}
                alt="logo"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-5">
                  <h1 className="text-2xl font-bold">{job.name}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="bg-blue-100 text-blue-500 text-xs font-semibold px-2 py-1 rounded-full">
                      {job.level}
                    </span>
                  </div>
                </div>
                <div className="flex mt-2 text-sm text-gray-500">
                  <span>career@instagram.com (bổ sung)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end mt-4 md:mt-0">
              <div className="flex items-center gap-5">
                <div
                  onClick={() => handleChangeFavorite(job.id, currentUser.id)}
                  className={`p-3 ${
                    isFavorite ? "bg-blue-800" : "bg-blue-50 hover:bg-blue-200"
                  }   transition-all rounded-lg cursor-pointer `}
                >
                  <svg
                    className={`w-6 h-6 ${
                      isFavorite ? "text-white" : "text-blue-800"
                    }  dark:text-white`}
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
                      d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                    />
                  </svg>
                </div>
                <button
                  onClick={() => handleApply()}
                  className=" transition-all text-blue-800 bg-blue-200 hover:bg-blue-700 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ứng tuyển
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
              <span className="text-sm text-gray-500 font-medium">
                Hạn cuối:
                <span className="text-red-500 ml-1">
                  {formatDate(job.endDate)}
                </span>
              </span>
            </div>
          </div>

          {/* Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Mô tả công việc</h2>
                <div className="text-gray-700 leading-relaxed">
                  {parse(job.description)}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Kỹ năng</h2>
                <div className="flex items-center gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="inline-flex items-center bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-[3px] rounded-full dark:bg-green-900 dark:text-green-300"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <div className="border border-blue-200 p-4 rounded-xl shadow">
                <h3 className="font-semibold text-lg mb-4">Job Overview</h3>
                <div className="grid grid-cols-3 gap-5 text-sm text-gray-700">
                  <div className="flex items-start flex-col gap-1">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-white"
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
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>

                    <span className="text-sm text-gray-500">Bắt đầu:</span>
                    <span className="text-sm text-gray-800 font-semibold">
                      {formatDate(job.startDate)}
                    </span>
                  </div>
                  <div className="flex items-start flex-col gap-1">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-white"
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
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>

                    <span className="text-sm text-gray-500">Hạn cuối: </span>
                    <span className="text-sm text-gray-800 font-semibold">
                      {formatDate(job.endDate)}
                    </span>
                  </div>
                  <div className="flex items-start flex-col gap-1">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-white"
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
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>

                    <span className="text-sm text-gray-500">Lương: </span>
                    <span className="text-sm text-gray-800 font-semibold">
                      {formatCurrency(job.salary)}
                    </span>
                  </div>
                  <div className="flex items-start flex-col gap-1">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-white"
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
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>

                    <span className="text-sm text-gray-500">Địa điểm: </span>
                    <span className="text-sm text-gray-800 font-semibold">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-start flex-col gap-1">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-white"
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
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>

                    <span className="text-sm text-gray-500">Cấp độ: </span>
                    <span className="text-sm text-gray-800 font-semibold">
                      {job.level}
                    </span>
                  </div>
                  <div className="flex items-start flex-col gap-1">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-white"
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
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>

                    <span className="text-sm text-gray-500">Số lượng: </span>
                    <span className="text-sm text-gray-800 font-semibold">
                      {job.quantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* <div className="border border-blue-200 p-4 rounded-xl shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                    alt="Instagram"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">Instagram</h3>
                    <p className="text-sm text-gray-500">
                      Social networking service
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>Founded: March 21, 2006</p>
                  <p>Type: Private Company</p>
                  <p>Size: 120-300 Employers</p>
                  <p>Phone: (406) 555-0120</p>
                  <p>Email: twitter@gmail.com</p>
                  <p>Website: https://twitter.com</p>
                </div>
                <div className="flex space-x-2 mt-4">

                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
