import React, { useContext, useRef, useState } from "react";
import Toggle from "./Toggle";
import { ThemeContext } from "../Contexts/ThemeContext";
import { SearchContext } from "../Contexts/SearchContext";
import { useMatch } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { ProfileMenuContext } from "../Contexts/ProfileMenuContext";
import { FaAngleDown } from "react-icons/fa";
import { AuthContext } from "../Contexts/AuthContext";

export default function Header({ searchRef }) {
  const [isDark, setIsDark] = useContext(ThemeContext);
  const {user} = useContext(AuthContext);
  const isHome = useMatch({ path: "/", end: true });

  const avatarUrl = null;
  const isDashboard = useMatch({path: '/dashboard', end: true});

  const [openSearch, setOpenSearch] = useContext(SearchContext);
  const {openProfileMenu, setOpenProfileMenu} = useContext(ProfileMenuContext);

  return (
    <div className="flex justify-between px-2 sm:px-8 py-4 sm:py-2 items-center">
      <h1 className="text-2xl font-bold">Newsify</h1>
      <div className="flex gap-4 sm:gap-6 items-center">
        <div
          className={`${
            isHome ? "block" : "hidden"
          } rounded-full p-1 sm:p-2 cursor-pointer bg-(--bg-body) text(--text)`}
          onClick={() => setOpenSearch(!openSearch)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 40 40"
          >
            <linearGradient
              id="-2suTD81jP2ew0CFO8L6Qa_p8VkXMjDOpcE_gr1"
              x1="31.916"
              x2="25.088"
              y1="31.849"
              y2="26.05"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#b2b2b2"></stop>
              <stop offset=".999"></stop>
            </linearGradient>
            <polygon
              fill="url(#-2suTD81jP2ew0CFO8L6Qa_p8VkXMjDOpcE_gr1)"
              points="29.976,27 24.451,27.176 33.95,36.778 36.778,33.95"
            ></polygon>
            <path
              fill="#b2b2b2"
              d="M24.313,27c-1.788,1.256-3.962,2-6.313,2c-6.075,0-11-4.925-11-11S11.925,7,18,7s11,4.925,11,11	c0,2.659-0.944,5.098-2.515,7h4.776C32.368,22.909,33,20.53,33,18c0-8.284-6.716-15-15-15S3,9.716,3,18c0,8.284,6.716,15,15,15	c4.903,0,9.243-2.363,11.98-6H24.313z"
            ></path>
          </svg>
        </div>
        <Toggle setIsDark={setIsDark} isDark={isDark} />
        {isDashboard ? (
          <div className="sm:ml-2">
            <div className="group flex items-center gap-1 sm:gap-2 cursor-pointer" onClick={(e) => {
              e.stopPropagation();
              setOpenProfileMenu(!openProfileMenu);
            }}>
              <div className="rounded-full">
                <img
                  src={avatarUrl ?? "https://avatar.iran.liara.run/public"}
                  alt="avatar"
                  className="object-cover h-8 sm:h-10"
                />
              </div>
              <p>{user?.username}</p>
              <p className={`hidden group-hover:block absolute right-7 mt-0.5 ${openProfileMenu ? '-rotate-180' : ''} transition-all`}><FaAngleDown /></p>
            </div>
            <div className={`absolute top-16 z-10 ${openProfileMenu ? '' : 'hidden'}`}>
              <ProfileMenu setOpenProfileMenu={setOpenProfileMenu} />
            </div>
          </div>
        ) : (
          []
        )}
      </div>
    </div>
  );
}
