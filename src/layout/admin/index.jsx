import React from "react";
import { Navbar } from "../../components/admin/Navbar";
import { Sidebar } from "../../components/admin/Sidebar";
import { Outlet } from "react-router-dom";

export const LayoutAdmin = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64 flex h-dvh flex-col">
        <Navbar />
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};
