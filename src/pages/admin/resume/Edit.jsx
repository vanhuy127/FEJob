import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loading } from "../../../components/share/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../../service/api";
import { validateFields } from "../../../utils/validate";
import { AlertContext } from "../../../provider/AlertProvider";
import TextEditor from "../../../components/admin/TextEditor";
import { MultipleChoice } from "../../../components/admin/MultipleChoice";
import { DatePicker } from "../../../components/admin/DatePicker";
import { convertDateTime, formatDate, parseDate } from "../../../utils/convert";

const statusOption = {
  PENDING: "PENDING",
  REVIEWING: "REVIEWING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const statusToShow = {
  [statusOption.PENDING]: [statusOption.PENDING, statusOption.REVIEWING],
  [statusOption.REVIEWING]: [
    statusOption.REVIEWING,
    statusOption.APPROVED,
    statusOption.REJECTED,
  ],
  [statusOption.APPROVED]: [statusOption.APPROVED],
  [statusOption.REJECTED]: [statusOption.REJECTED],
};

export const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { handleOpenAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: 0,
    email: "",
    url: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
    companyName: "",
    user: {
      id: 0,
      name: "",
    },
    job: {
      id: 0,
      name: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiService.callFetchResumeById(resumeId);
        console.log("resumeRes", res);
        if (res.status === 200) {
          let data = res.data.data;
          setFormData(data);
        } else {
          console.error(res.statusText);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReviewResume = async (e) => {
    if (formData.status === statusOption.PENDING) {
      try {
        const res = await ApiService.callUpdateResumeStatus(
          formData.id,
          statusOption.REVIEWING
        );
        if (res.status === 200) {
          setFormData((prev) => ({ ...prev, status: statusOption.REVIEWING }));
        }
      } catch (error) {
        console.error("lỗi khi cập nhật trạng thái CV", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await ApiService.callUpdateResumeStatus(
        formData.id,
        formData.status
      );

      if (res.status === 200) {
        handleOpenAlert({
          type: "success",
          message: "Cập nhật trạng thái CV thành công",
        });
        setTimeout(() => {
          navigate("/admin/resume");
        }, 1000);
      }
      console.log("resume response", res);
    } catch (error) {
      console.error("lỗi khi cập nhật trạng thái CV", error);
      if (error.status !== 200) {
        handleOpenAlert({
          type: "error",
          message: "có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    }
  };

  return (
    <div className="w-full h-full ">
      {/* heading */}
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-semibold">
              Cập nhật thông tin đơn ứng tuyển
            </h1>
            <Link
              to={`/admin/resume`}
              className="flex items-center gap-[3px] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <svg
                className="w-6 h-6 text-white dark:text-white"
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
                  d="m15 19-7-7 7-7"
                />
              </svg>
              Quay lại
            </Link>
          </div>
          {/* main */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-5">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className={`${
                    errors.email
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`${
                    errors.email
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : ""
                  }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập tên công ty"
                  value={formData.email}
                  // onChange={handleChange}
                  disabled
                />
                {/* {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </p>
                )} */}
              </div>
              <div className="w-full">
                <label
                  htmlFor="job"
                  className={`${
                    errors.job
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Tên công việc
                </label>
                <input
                  type="text"
                  name="job"
                  id="job"
                  className={`${
                    errors.job
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : ""
                  }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập tên công ty"
                  value={formData.job.name}
                  // onChange={handleChange}
                  disabled
                />
                {/* {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </p>
                )} */}
              </div>
              <div className="w-full">
                <label
                  htmlFor="companyName"
                  className={`${
                    errors.companyName
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Tên công ty
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  className={`${
                    errors.companyName
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : ""
                  }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập tên công ty"
                  value={formData.companyName}
                  // onChange={handleChange}
                  disabled
                />
                {/* {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </p>
                )} */}
              </div>
              <div className="w-full">
                <label
                  htmlFor="createdAt"
                  className={`${
                    errors.createdAt
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Ngày nộp CV
                </label>
                <input
                  type="text"
                  name="createdAt"
                  id="createdAt"
                  className={`${
                    errors.createdAt
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : ""
                  }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập tên công ty"
                  value={
                    formData.createdAt
                      ? convertDateTime(formData.createdAt)
                      : "-"
                  }
                  // onChange={handleChange}
                  disabled
                />
                {/* {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </p>
                )} */}
              </div>
              <div className="w-full">
                <label
                  htmlFor="updatedAt"
                  className={`${
                    errors.updatedAt
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Thời gian cập nhật gần nhất
                </label>
                <input
                  type="text"
                  name="updatedAt"
                  id="updatedAt"
                  className={`${
                    errors.updatedAt
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : ""
                  }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập tên công ty"
                  value={
                    formData.updatedAt
                      ? convertDateTime(formData.updatedAt)
                      : "-"
                  }
                  onChange={handleChange}
                  disabled
                />
                {/* {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </p>
                )} */}
              </div>

              <div className="w-full">
                <label
                  htmlFor="location"
                  className={`${
                    errors.location && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Trạng thái
                </label>
                <select
                  name="status"
                  onChange={handleChange}
                  value={formData.status}
                  id="status"
                  className={`${
                    errors.status &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  {statusToShow[formData.status].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.status}
                  </p>
                )}
              </div>
              <a
                href={`${import.meta.env.VITE_FILE_URL}${formData.url}`}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleReviewResume}
              >
                Chi tiết CV
              </a>
            </div>

            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Cập nhật
            </button>
          </form>
        </>
      )}
    </div>
  );
};
