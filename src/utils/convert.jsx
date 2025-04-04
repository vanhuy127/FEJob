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
