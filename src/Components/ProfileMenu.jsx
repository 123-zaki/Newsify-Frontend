import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { AuthContext } from "../Contexts/AuthContext";

export default function ProfileMenu({ setOpenProfileMenu }) {
    const [isDark] = useContext(ThemeContext);
    const {Logout} = useContext(AuthContext);
  return (
    <div className={`w-[110px] sm:w-[140px] px-2 py-1 ${isDark ? 'bg-(--bg-body)' : 'bg-white'} text-(--text) rounded-md shadow-md`}>
      <p
        className="my-2 cursor-pointer select-none hover:text-neutral-400"
        onClick={(e) => {
          e.stopPropagation();
          setOpenProfileMenu(false);
        }}
      >
        My Posts
      </p>
      <p
        className="my-2 cursor-pointer select-none hover:text-neutral-400"
        onClick={(e) => {
          e.stopPropagation();
          setOpenProfileMenu(false);
        }}
      >
        Settings
      </p>
      <p
        className="my-2 cursor-pointer select-none hover:text-neutral-400"
        onClick={async (e) => {
          e.stopPropagation();
          await Logout();
          setOpenProfileMenu(false);
        }}
      >
        Logout
      </p>
    </div>
  );
}
