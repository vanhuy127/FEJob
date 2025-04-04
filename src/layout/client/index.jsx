import React from "react";
import { Navbar } from "../../components/client/Navbar";
import { Outlet } from "react-router-dom";

export const LayoutClient = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
