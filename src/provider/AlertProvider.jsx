import React, { createContext, useEffect, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ type: "", message: "" });
  const handleOpenAlert = (info) => {
    setIsOpened(true);
    setMessageInfo(info);
    setTimeout(() => {
      setIsOpened(false);
    }, 2000);
  };

  useEffect(() => {
    if (isOpened) {
      const timer = setTimeout(() => {
        setIsOpened(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AlertContext.Provider value={{ handleOpenAlert }}>
      {children}
      <div className="fixed top-5 right-5 z-50">
        <div
          className={`transform transition-transform duration-500 ease-out ${
            isOpened
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          {isOpened &&
            (messageInfo.type === "success" ? (
              <div
                className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div>{messageInfo.message}</div>
              </div>
            ) : (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div>{messageInfo.message}</div>
              </div>
            ))}
        </div>
      </div>
    </AlertContext.Provider>
  );
};
