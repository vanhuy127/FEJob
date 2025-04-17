import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../provider/AlertProvider";
import { validateFields } from "../../utils/validate";
import ApiService from "../../service/api";
import axiosInstance from "../../service/axios-custom";
import { useUserStore } from "../../store/UserStore";
export const Login = () => {
  const navigate = useNavigate();
  const { handleOpenAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, setCurrentUser } = useUserStore();

  const validationRules = {
    email: { required: true, email: true, label: "Email" },
    password: { required: true, label: "Mật khẩu" },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchUser = async () => {
    const user = await ApiService.callFetchAccount();
    if (user.status === 200) {
      console.log("fetch current user");

      setCurrentUser(user.data.data.user);
    } else {
      setCurrentUser({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = validateFields(formData, validationRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully [login]", formData);
      try {
        const res = await ApiService.callLogin(
          formData.email.trim(),
          formData.password.trim()
        );
        if (res.status === 200) {
          console.log("login res", res);
          localStorage.setItem("accessToken", res.data.data.access_token);

          axiosInstance.defaults.headers[
            "Authorization"
          ] = `Bearer ${res.data.data.access_token}`;

          await fetchUser();

          handleOpenAlert({
            type: "success",
            message: "Đăng nhập thành công",
          });
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        }
      } catch (error) {
        console.error("Login error", error);
        if (error.status === 400) {
          setErrors({
            email: "Email hoặc mật khẩu không đúng",
            password: "Email hoặc mật khẩu không đúng",
          });
        } else {
          handleOpenAlert({
            type: "error",
            message: "Có lỗi xảy ra, vui lòng thử lại.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto h-screen flex flex-col justify-center"
    >
      <h1 className="text-2xl text-center font-bold mb-5">Đăng nhập</h1>
      <div className="mb-5">
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
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="Vui lòng nhập email"
          className={`${
            errors.email
              ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : ""
          }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.email}
          </p>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className={`${
            errors.password
              ? "text-red-700 dark:text-red-500"
              : " text-gray-900 dark:text-white"
          } block mb-2 text-sm font-medium `}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Vui lòng nhập mật khẩu"
          className={`${
            errors.password
              ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : ""
          }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? "Đang tải..." : "Đăng nhập"}
      </button>
    </form>
  );
};
