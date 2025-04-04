import { useEffect } from "react";

export const DatePicker = ({ setDate, error, date, label = "Chọn ngày" }) => {
  useEffect(() => {
    const dateInput = document.getElementById(label);
    if (dateInput) {
      dateInput.addEventListener("changeDate", (event) => {
        setDate(event.target.value);
      });
    }
  }, [setDate]);

  return (
    <div className="w-full">
      <label
        htmlFor={label}
        className={`block mb-2 text-sm font-medium ${
          error
            ? "text-red-700 dark:text-red-500"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {label}
      </label>

      <div className="relative w-full">
        {/* Icon */}
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>

        {/* Input Date */}
        <input
          id={label}
          datepicker="true"
          datepicker-buttons="true"
          datepicker-autoselect-today="true"
          datepicker-format="dd-mm-yyyy"
          type="text"
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
          placeholder="Chọn ngày"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
};
