import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loading } from "../../../components/share/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../../service/api";
import { validateFields } from "../../../utils/validate";
import { AlertContext } from "../../../provider/AlertProvider";
import TextEditor from "../../../components/admin/TextEditor";
import { MultipleChoice } from "../../../components/admin/MultipleChoice";
import { DatePicker } from "../../../components/admin/DatePicker";
import { formatDate, parseDate } from "../../../utils/convert";

export const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { handleOpenAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    skills: [],
    company: {
      id: 0,
      name: "",
    },
    location: "",
    salary: "",
    quantity: 0,
    level: "",
    description: "",
    startDate: "",
    endDate: "",
    active: false,
  });
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleSetSkills = (skillArr) => {
    setFormData((prev) => ({ ...prev, skills: skillArr }));
  };

  const handleSetDescription = useCallback((description) => {
    setFormData((prev) => ({ ...prev, description }));
  }, []);

  const validationRules = {
    name: { required: true, label: "Tên công ty" },
    skills: { empty: false, label: "Kỹ năng" },
    company: { required: true, label: "Công ty" },
    salary: { required: true, label: "Lương" },
    location: { required: true, label: "Địa điểm" },
    quantity: { required: true, min: 1, label: "Số lượng" },
    level: { required: true, label: "Trình độ" },
    description: { required: true, label: "Mô tả" },
    startDate: { required: true, isValidDate: true, label: "Ngày bắt đầu" },
    endDate: {
      required: true,
      isValidDate: true,
      dateAfter: true,
      label: "Ngày kết thúc",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, skillRes, jobRes] = await Promise.all([
          ApiService.callFetchCompany(""),
          ApiService.callFetchAllSkill(""),
          ApiService.callFetchJobById(jobId),
        ]);
        console.log("jobRes", jobRes);
        if (companyRes.data.statusCode === 200) {
          setCompanies(companyRes.data.data.result);
        } else {
          console.error(companyRes.statusText);
        }

        if (skillRes.data.statusCode === 200) {
          setSkills(skillRes.data.data.result);
        } else {
          console.error(skillRes.statusText);
        }

        if (jobRes.data.statusCode === 200) {
          setFormData({
            ...jobRes.data.data,
            startDate: formatDate(jobRes.data.data.startDate),
            endDate: formatDate(jobRes.data.data.endDate),
          });
        } else {
          console.error(jobRes.statusText);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e, list, name) => {
    const selected = list.find((item) => item.id === parseInt(e.target.value));
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        [name]: { id: selected.id, name: selected.name },
      }));
    }
  };

  const handleSetStartDate = (date) => {
    setFormData((prev) => ({ ...prev, startDate: date }));
  };
  const handleSetEndDate = (date) => {
    setFormData((prev) => ({ ...prev, endDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields(formData, validationRules);
    setErrors(validationErrors);
    console.log(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log("update job successfully", formData);

      try {
        const jobRes = await ApiService.callUpdateJob({
          ...formData,
          startDate: parseDate(formData.startDate),
          endDate: parseDate(formData.endDate),
        });

        if (jobRes.status === 200) {
          handleOpenAlert({
            type: "success",
            message: "Cập nhật công việc thành công",
          });
          setTimeout(() => {
            navigate("/admin/job");
          }, 1000);
        }
        console.log("job response", jobRes);
      } catch (error) {
        console.log("lỗi khi cập nhật công việc", error);
        if (error.status !== 200) {
          handleOpenAlert({
            type: "error",
            message: "có lỗi xảy ra, vui lòng thử lại.",
          });
        }
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
              Cập nhật thông tin công việc
            </h1>
            <Link
              to={`/admin/job`}
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
                    errors.name
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Tên công việc
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`${
                    errors.name
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : ""
                  }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập tên công ty"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="location"
                  className={`${
                    errors.location && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Địa điểm
                </label>
                <select
                  name="location"
                  onChange={handleChange}
                  value={formData.location}
                  id="location"
                  className={`${
                    errors.location &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="">Chọn địa điểm</option>
                  {[
                    { value: "HANOI", label: "Hà Nội" },
                    { value: "HOCHIMINH", label: "Hồ Chí Minh" },
                    { value: "DANANG", label: "Đà nẵng" },
                    { value: "OTHER", label: "Khác" },
                  ].map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.location}
                  </p>
                )}
              </div>

              <MultipleChoice
                label="Kỹ năng"
                list={skills}
                error={errors.skills}
                selected={formData.skills}
                setSelected={handleSetSkills}
              />

              <div className="w-full">
                <label
                  htmlFor="salary"
                  className={`${
                    errors.salary && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Mức lương
                </label>
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  className={`${
                    errors.salary &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập mức lương"
                  value={formData.salary}
                  onChange={handleChange}
                />
                {errors.salary && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.salary}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="quantity"
                  className={`${
                    errors.quantity && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Số lượng
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className={`${
                    errors.quantity &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập số lượng"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.quantity}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="level"
                  className={`${
                    errors.level && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Trình độ
                </label>
                <select
                  name="level"
                  onChange={handleChange}
                  id="level"
                  value={formData.level}
                  className={`${
                    errors.level &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="">Chọn trình độ</option>
                  {[
                    { value: "INTERN", label: "INTERN" },
                    { value: "FRESHER", label: "FRESHER" },
                    { value: "JUNIOR", label: "JUNIOR" },
                    { value: "MIDDLE", label: "MIDDLE" },
                    { value: "SENIOR", label: "SENIOR" },
                  ].map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.level && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.level}
                  </p>
                )}
              </div>

              <DatePicker
                setDate={handleSetStartDate}
                date={formData.startDate}
                error={errors.startDate}
                label="Từ ngày"
              />

              <DatePicker
                setDate={handleSetEndDate}
                date={formData.endDate}
                error={errors.endDate}
                label="Đến ngày"
              />

              <div className="w-full">
                <label
                  htmlFor="company"
                  className={`${
                    errors.company && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Công ty
                </label>
                <select
                  name="company"
                  onChange={(e) => {
                    handleSelectChange(e, companies, e.target.name);
                  }}
                  id="company"
                  value={formData.company.id}
                  className={`${
                    errors.company &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="">Chọn công ty</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
                {errors.company && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="address"
                  className={`${
                    errors.description && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Mô tả
                </label>
                <TextEditor
                  onChange={handleSetDescription}
                  initData={formData.description}
                />

                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            <label className="flex items-center cursor-pointer mb-5 gap-3">
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Hoạt động
              </span>
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={formData.active}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    active: e.target.checked ? true : false,
                  }));
                }}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            </label>

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
