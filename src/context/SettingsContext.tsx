"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SettingsContextType = {
  isHideUnreadMessage: boolean;
  setIsHideUnreadMessage: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isHideUnreadMessage, setIsHideUnreadMessage] = useState(() => {
    const saved = localStorage.getItem("isHideUnreadMessage");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    if (isHideUnreadMessage !== null) {
      localStorage.setItem(
        "isHideUnreadMessage",
        JSON.stringify(isHideUnreadMessage),
      );
    } else {
      localStorage.removeItem("isHideUnreadMessage");
    }
  }, [isHideUnreadMessage]);

  return (
    <SettingsContext.Provider
      value={{ isHideUnreadMessage, setIsHideUnreadMessage }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider",
    );
  }
  return context;
};
