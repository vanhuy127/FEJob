export const convertDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
//conert string to date
export const parseDate = (dateStr) => {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  return new Date(Date.UTC(year, month - 1, day));
};

//convert date to string
export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day}-${month}-${year}`;
};

export const timeToBefore = (inputTime) => {
  const time = new Date(inputTime);
  const now = new Date();
  const diffMs = now.getTime() - time.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMinutes < 60) return `${diffMinutes} phút`;
  if (diffHours < 24) return `${diffHours} giờ`;
  if (diffDays < 30) return `${diffDays} ngày`;
  if (diffDays < 365) return `${diffMonths} tháng`;
  return `${diffYears} năm`;
};

export const formatCurrency = (value) => {
  const number = typeof value === "string" ? parseInt(value, 10) : value;
  return number.toLocaleString("vi-VN");
};
