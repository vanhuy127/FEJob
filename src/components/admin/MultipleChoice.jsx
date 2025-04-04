import React, { useState } from "react";

export const MultipleChoice = ({
  label,
  list,
  error,
  selected,
  setSelected,
}) => {
  const [currentId, setCurrentId] = useState("");

  const addSkill = () => {
    if (!currentId) return;

    const found = list.find((item) => item.id == currentId);

    if (found) {
      setSelected([...selected, found]);
    }
  };

  const remove = (id) => {
    setSelected(selected.filter((skill) => skill.id !== id));
  };

  // console.log(selected, currentId);

  return (
    <div className="w-full">
      <label
        htmlFor="location"
        className={`${
          error && "text-red-700 dark:text-red-500"
        } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
      >
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <select
          name="location"
          id="location"
          onChange={(e) => setCurrentId(e.target.value)}
          className={`${
            error &&
            "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
          } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
        >
          <option value="">Chọn {label}</option>
          {list
            .filter(
              (item) =>
                !selected.find((selectedItem) => selectedItem.id === item.id)
            )
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {selected.map((item) => (
          <span
            key={item.id}
            id="badge-dismiss-default"
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-lg dark:bg-blue-900 dark:text-blue-300"
          >
            {item.name}
            <button
              type="button"
              className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-xs hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
              onClick={() => remove(item.id)}
            >
              <svg
                className="w-2 h-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
