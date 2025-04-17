import React, { useContext } from "react";
import { useUserStore } from "../../store/UserStore";
import { Link, useNavigate } from "react-router-dom";
import { AlertContext } from "../../provider/AlertProvider";
import ApiService from "../../service/api";

export const Navbar = () => {
  const { getCurrentUser, setCurrentUser } = useUserStore();
  const { handleOpenAlert } = useContext(AlertContext);
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await ApiService.callLogout();
      console.log("logout res", res);
      if (res.status === 200) {
        handleOpenAlert({
          type: "success",
          message: "Đăng xuất thành công",
        });
        setCurrentUser({});
        localStorage.removeItem("accessToken");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }
      handleOpenAlert({
        type: "error",
        message: "Có lỗi xảy ra, vui lòng thử lại.",
      });
    } catch (err) {
      console.error(err);
      handleOpenAlert({
        type: "error",
        message: "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            IT Job
          </span>
        </a>
        {currentUser && (
          <div className="flex items-center gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <span>welcome, {currentUser?.name}</span>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://avatar.iran.liara.run/public"
                alt="user photo"
              />
            </button>
            {/* drop down */}
            <div
              className="z-50 hidden my-4 text-base list-none bg-gray-100 divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Trang chủ
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
            {/* <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button> */}
          </div>
        )}
      </div>
    </nav>
  );
};
