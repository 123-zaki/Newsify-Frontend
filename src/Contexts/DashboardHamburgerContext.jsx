import { createContext, useState } from "react";

export const DashboardHamburgerContext = createContext();

export function DashboardHamburgerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DashboardHamburgerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DashboardHamburgerContext.Provider>
  );
}
