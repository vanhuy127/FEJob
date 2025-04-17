import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loading } from "../../../components/share/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../../service/api";
import { validateFields } from "../../../utils/validate";
import { AlertContext } from "../../../provider/AlertProvider";
import { RoleModel } from "../../../components/admin/RoleModel";

export const EditRole = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const { handleOpenAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [permissions, setPermissions] = useState(null);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    permissions: [],
    active: false,
  });

  const validationRules = {
    name: { required: true, label: "Tên vai trò" },
    description: { required: true, label: "Mô tả" },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [permissionRes, roleRes] = await Promise.all([
          ApiService.callFetchPermission(`page=1&size=200&sort=module,asc`),
          ApiService.callFetchRoleById(roleId),
        ]);

        if (permissionRes.data.statusCode === 200) {
          setPermissions(permissionRes.data.data.result);
        } else {
          console.error(permissionRes.statusText);
        }

        if (roleRes.data.statusCode === 200) {
          const data = roleRes.data.data;
          setFormData(data);
        } else {
          console.error(res.statusText);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
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
  // Hàm xử lý thay đổi trạng thái của 1 quyền
  const handlePermissionChange = (id) => {
    // Cập nhật formData.permissions
    setFormData((prev) => {
      if (prev.permissions.some((item) => item.id === id)) {
        return {
          ...prev,
          permissions: prev.permissions.filter((item) => item.id !== id),
        };
      } else {
        return { ...prev, permissions: [...prev.permissions, { id: id }] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields(formData, validationRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("[update role] Form submitted successfully", formData);
      try {
        const res = await ApiService.callUpdateRole(formData);

        if (res.status === 200) {
          handleOpenAlert({
            type: "success",
            message: "Cập nhật vai trò thành công",
          });
          setTimeout(() => {
            navigate("/admin/role");
          }, 1000);
        }
        console.log(res);
      } catch (error) {
        console.log("lỗi khi thêm kỹ năng", error);
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
              Cập nhật thông tin vai trò
            </h1>
            <Link
              to={`/admin/role`}
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
                  Tên vai trò
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
                  placeholder="Vui lòng nhập tên kỹ năng"
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
                  htmlFor="description"
                  className={`${
                    errors.description
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Mô tả
                </label>
                <textarea
                  type="text"
                  rows="3"
                  name="description"
                  id="description"
                  className={`${
                    errors.description
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : ""
                  }  text-gray-900 dark:text-white bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Vui lòng nhập mô tả"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <label className="flex items-center cursor-pointer mb-5 gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
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

              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className={`${
                    errors.description
                      ? "text-red-700 dark:text-red-500"
                      : " text-gray-900 dark:text-white"
                  } block mb-2 text-sm font-medium `}
                >
                  Mô tả
                </label>
                {permissions.length > 0 && (
                  <RoleModel
                    list={permissions}
                    activeList={formData.permissions}
                    onPermissionChange={handlePermissionChange}
                  />
                )}
              </div>
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
