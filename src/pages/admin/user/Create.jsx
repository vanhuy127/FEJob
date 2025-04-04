import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../../../components/share/Loading";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../../service/api";
import { validateFields } from "../../../utils/validate";
import { AlertContext } from "../../../provider/AlertProvider";
export const CreateUser = () => {
  const navigate = useNavigate();
  const { handleOpenAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    age: 0,
    gender: "",
    address: "",
    role: { id: 0, name: "" },
    company: {
      id: 0,
      name: "",
    },
  });

  const validationRules = {
    email: { required: true, email: true, label: "Email" },
    name: { required: true, label: "Tên" },
    password: { required: true, label: "Mật khẩu" },
    age: { required: true, min: 1, label: "Tuổi" },
    gender: { required: true, label: "Giới tính" },
    role: { required: true, label: "Vai trò" },
    company: { required: true, label: "Công ty" },
    address: { required: true, label: "Địa chỉ" },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, roleRes] = await Promise.all([
          ApiService.callFetchCompany(""),
          ApiService.callFetchRole(""),
        ]);

        if (companyRes.data.statusCode === 200) {
          setCompanies(companyRes.data.data.result);
        } else {
          console.error(companyRes.statusText);
        }

        if (roleRes.data.statusCode === 200) {
          setRoles(roleRes.data.data.result);
        } else {
          console.error(roleRes.statusText);
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

  const handleSelectChange = (e, list, name) => {
    const selected = list.find((item) => item.id === parseInt(e.target.value));
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        [name]: { id: selected.id, name: selected.name },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields(formData, validationRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully", formData);

      try {
        const res = await ApiService.callCreateUser(formData);
        console.log(res);

        if (res.status === 201) {
          handleOpenAlert({
            type: "success",
            message: "Thêm mới người dùng thành công",
          });
          setTimeout(() => {
            navigate("/admin/user");
          }, 1000);
        }
      } catch (error) {
        console.error("lỗi khi thêm mới người dùng", error);

        if (error.status === 400) {
          setErrors((prev) => ({
            ...prev,
            email: "Email đã tồn tại, vui lòng chọn email khác",
          }));
        } else {
          handleOpenAlert({
            type: "error",
            message: "có lỗi xảy ra, vui lòng thử lại sau",
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
            <h1 className="text-xl font-semibold">Thêm mới người dùng</h1>
            <Link
              to={`/admin/user`}
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
                  autoComplete="email"
                  className={`${
                    errors.email
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : ""
                  }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="password"
                  className={`${
                    errors.password && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  className={`${
                    errors.password &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  }bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className={`${
                    errors.name && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`${
                    errors.name &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập tên hiển thị"
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
                  htmlFor="age"
                  className={`${
                    errors.age && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Tuổi
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  className={`${
                    errors.age &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập tuổi"
                  value={formData.age}
                  onChange={handleChange}
                />
                {errors.age && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.age}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="gender"
                  className={`${
                    errors.gender && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Giới tính
                </label>
                <select
                  name="gender"
                  onChange={handleChange}
                  id="gender"
                  className={`${
                    errors.gender &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="">Chọn giới tính</option>
                  {[
                    { value: "MALE", label: "Nam" },
                    { value: "FEMALE", label: "Nữ" },
                    { value: "OTHER", label: "Khác" },
                  ].map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.gender}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="role"
                  className={`${
                    errors.role && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Vai trò
                </label>
                <select
                  name="role"
                  onChange={(e) => {
                    handleSelectChange(e, roles, e.target.name);
                  }}
                  id="role"
                  className={`${
                    errors.role &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="">Chọn vai trò</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.role}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="company"
                  className={`${
                    errors.company && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Thuộc công ty
                </label>
                <select
                  name="company"
                  onChange={(e) => {
                    handleSelectChange(e, companies, e.target.name);
                  }}
                  id="company"
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
              <div className="w-full">
                <label
                  htmlFor="address"
                  className={`${
                    errors.address && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={`${
                    errors.address &&
                    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Tạo mới
            </button>
          </form>
        </>
      )}
    </div>
  );
};
