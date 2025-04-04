import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../../../components/share/Loading";
import ApiService from "../../../service/api";
import { convertDateTime } from "../../../utils/convert";
import { Pagination } from "../../../components/share/Pagination";
import { Link } from "react-router-dom";
import { PopUpContext } from "../../../provider/PopUpProvider";
import { AlertContext } from "../../../provider/AlertProvider";
export const Users = () => {
  const { openPopup } = useContext(PopUpContext);
  const { handleOpenAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pages: 0,
  });
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await ApiService.callFetchUser(
          `page=${pageInfo.page}&size=10&sort=updatedAt,desc`
        );
        if (res.data.statusCode === 200) {
          const data = res.data.data;
          setUsers(data.result);
          setPageInfo({
            page: data.meta.page,
            pages: data.meta.pages,
          });

          setIsLoading(false);
          // console.log("fetch all user",res);
        } else {
          console.error(res.statusText);
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchUser();
  }, [pageInfo.page]);

  const handlePageChange = (newPage) => {
    setPageInfo((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleDelete = (id) => {
    openPopup({
      message: "Bạn có chắc chắn muốn xóa người dùng này không?",
      onConfirm: () => deleteUser(id),
    });
  };

  const deleteUser = async (userId) => {
    try {
      const res = await ApiService.callDeleteUser(userId);
      if (res.data.statusCode === 200) {
        setCompanies(users.filter((user) => user.id !== userId));
      } else {
        console.error("Delete failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      handleOpenAlert({
        type: "error",
        message: "có lỗi xảy ra, vui lòng thử lại.",
      });
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
            <h1 className="text-xl font-semibold">Danh sách người dùng</h1>
            <Link
              to={`/admin/user/create`}
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
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              Thêm mới
            </Link>
          </div>
          {/* main */}
          <div>
            <form className="flex items-center max-w-sm mb-3">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div> */}
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập thông tin cần tìm kiếm"
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>

            {/* table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {[
                      "STT",
                      "Tên",
                      "Email",
                      "Vai trò",
                      "Công ty",
                      "Thời gian tạo",
                      "Thời gian cập nhật",
                      "",
                    ].map((header, i) => (
                      <th key={i} scope="col" className="px-6 py-3">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        {user.role ? user.role.name : "-"}
                      </td>
                      <td className="px-6 py-4">
                        {user.company ? user.company?.name : "-"}
                      </td>
                      <td className="px-6 py-4">
                        {user.createdAt ? convertDateTime(user.createdAt) : "-"}
                      </td>
                      <td className="px-6 py-4">
                        {user.updatedAt ? convertDateTime(user.updatedAt) : "-"}
                      </td>
                      <td className="px-6 py-4 text-right flex items-center gap-3">
                        <Link
                          to={`/admin/user/edit/${user.id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* pagination */}
            <Pagination
              page={pageInfo.page}
              pages={pageInfo.pages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};
