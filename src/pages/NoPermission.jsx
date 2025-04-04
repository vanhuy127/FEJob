import React from "react";
import { Link } from "react-router-dom";

export const NoPermission = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Bạn không có quyền truy cập trang này</h1>
      <p>Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là lỗi.</p>
      <Link to="/">Quay lại trang chủ</Link>
    </div>
  );
};
