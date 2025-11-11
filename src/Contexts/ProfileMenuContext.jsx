import { createContext, useState } from "react";

export const ProfileMenuContext = createContext();

export const ProfileMenuProvider = ({ children }) => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  return (
    <ProfileMenuContext.Provider
      value={{ openProfileMenu, setOpenProfileMenu }}
    >
      {children}
    </ProfileMenuContext.Provider>
  );
};
