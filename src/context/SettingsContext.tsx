"use client";

import { createContext, useContext, useState } from "react";

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
  const [isHideUnreadMessage, setIsHideUnreadMessage] = useState(false);

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
