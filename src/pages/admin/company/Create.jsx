import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loading } from "../../../components/share/Loading";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../../service/api";
import { validateFields } from "../../../utils/validate";
import { AlertContext } from "../../../provider/AlertProvider";
import TextEditor from "../../../components/admin/TextEditor";
export const CreateCompany = () => {
  const navigate = useNavigate();
  const { handleOpenAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    address: "",
    description: "",
    image: { file: "", imageUrl: "" },
  });

  const setDescription = useCallback((description) => {
    setFormData((prev) => ({ ...prev, description }));
  }, []);

  const validationRules = {
    name: { required: true, label: "Tên công ty" },
    address: { required: true, label: "Địa chỉ" },
    description: { required: true, type: "textEditor", label: "Mô tả" },
    image: { required: true, image: true, label: "Ảnh" },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: { file, imageUrl },
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
        // xử lý thêm ảnh vào csdl
        const imageRes = await ApiService.callUploadSingleFile(
          formData.image.file,
          "company"
        );
        if (imageRes.status === 200) {
          const fileName = imageRes?.data?.data?.fileName;
          const companyRes = await ApiService.callCreateCompany(
            formData.name,
            formData.address,
            formData.description,
            fileName
          );

          if (companyRes.status === 201) {
            handleOpenAlert({
              type: "success",
              message: "Thêm mới công ty thành công",
            });
            setTimeout(() => {
              navigate("/admin/company");
            }, 1000);
          }
          console.log(companyRes);
        }
      } catch (error) {
        console.log("lỗi khi thêm công ty", error);
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
            <h1 className="text-xl font-semibold">Thêm mới công ty</h1>
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
              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className={`${
                    errors.name
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Tên công ty
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
              <div className="col-span-2">
                <label
                  htmlFor="image"
                  className={`${
                    errors.image
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Ảnh
                </label>
                <input
                  className="mb-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                />
                {formData.image.imageUrl && (
                  <img
                    className="h-[100px] w-[180px] object-cover rounded-lg"
                    src={formData.image.imageUrl}
                    alt="image"
                  />
                )}
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.image}
                  </p>
                )}
              </div>

              <div className="col-span-2">
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
              <div className="col-span-2">
                <label
                  htmlFor="address"
                  className={`${
                    errors.description && "text-red-700 dark:text-red-500"
                  } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Mô tả
                </label>
                <TextEditor onChange={setDescription} />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.description}
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
