import React, { useState } from "react";

export const RoleModel = ({ list, activeList, onPermissionChange }) => {
  const groupedPermissions = list.reduce((acc, list) => {
    const { module } = list;
    if (!acc[module]) {
      acc[module] = [];
    }
    acc[module].push(list);
    return acc;
  }, {});
  const groupedEntries = Object.entries(groupedPermissions);
  return (
    <div className="w-[80%] mx-auto">
      {groupedEntries.map(([key, value], index) => {
        return (
          <RoleModeItem
            key={key}
            list={value}
            label={key}
            isFirst={index === 0}
            isLast={index === groupedEntries.length - 1}
            onPermissionChange={onPermissionChange}
            activeList={activeList}
          />
        );
      })}
    </div>
  );
};

const RoleModeItem = ({
  list,
  label,
  isFirst,
  isLast,
  activeList,
  onPermissionChange,
}) => {
  const [open, setOpen] = useState(false);

  const isItemChecked = (id) =>
    activeList.some((activeItem) => activeItem.id === id);

  const activeCount = list.filter((item) => isItemChecked(item.id)).length;

  const allChecked = list.every((item) => isItemChecked(item.id));
  const handleCheckBoxChange = () => {
    list.forEach((item) => {
      const isChecked = isItemChecked(item.id);
      // nếu từ inactive chuyển sang active thì bỏ qua những item đã active
      // nếu từ active chuyển sang inactive thì bỏ qua những item đã inactive
      if ((allChecked && isChecked) || (!allChecked && !isChecked)) {
        onPermissionChange(item.id);
      }
    });
  };
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className={`${
          isFirst
            ? "rounded-tr-lg rounded-tl-lg"
            : isLast
            ? "rounded-br-lg rounded-bl-lg"
            : ""
        } overflow-hidden cursor-pointer flex bg-gray-100 justify-between gap-3 p-3 border border-gray-300 dark:border-gray-600`}
      >
        <div className="flex items-center gap-3">
          <div>
            {open ? (
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
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
                  d="m19 9-7 7-7-7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
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
                  d="m9 5 7 7-7 7"
                />
              </svg>
            )}
          </div>
          <h3 className="text-gray-600">
            {label}{" "}
            <span className="text-sm text-gray-500">
              ({activeCount}/{list.length})
            </span>
          </h3>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={allChecked}
            onChange={handleCheckBoxChange}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        </label>
      </div>
      {open && (
        <div className="grid gap-3 lg:grid-cols-2 grid-cols-1 py-3 px-[100px] border border-gray-300 dark:border-gray-600">
          {list.map((item) => (
            <RoleModelSubItem
              key={item.id}
              item={item}
              activeList={activeList}
              onPermissionChange={onPermissionChange}
            />
          ))}
        </div>
      )}
    </>
  );
};

const RoleModelSubItem = ({ item, activeList, onPermissionChange }) => {
  const isChecked = activeList.some((activeItem) => activeItem.id === item.id);
  return (
    <div className="flex items-center bg-gray-100 gap-5 p-3 border border-gray-300 rounded-lg rounded-tr-lg dark:border-gray-600">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={isChecked}
          onChange={() => onPermissionChange(item.id)}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      </label>
      <p className="text-gray-600">{item.name}</p>
    </div>
  );
};
