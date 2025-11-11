import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaBookmark, FaHome, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex justify-center">
      <nav className="bg-(--bg) text-(--text) h-12 sm:h-15 fixed bottom-2 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] shadow-md rounded-lg flex items-center">
        <div className="flex justify-between w-[90%] mx-auto">
          <NavLink
            to={"/"}
            className={({ isActive }) => {
              return isActive ? "text-blue-700" : "text-(--text)";
            }}
          >
            {FaHome}
          </NavLink>
          <NavLink
            to={"/bookmark"}
            className={({ isActive }) => {
              return isActive ? "text-blue-700" : "text-(--text)";
            }}
          >
            {FaBookmark}
          </NavLink>
          <NavLink
            to={"/explore"}
            className={({ isActive }) => {
              return isActive ? "text-blue-700" : "text-(--text)";
            }}
          >
            {FaGlobe}
          </NavLink>
          <NavLink
            to={"/profile"}
            className={({ isActive }) => {
              return isActive ? "text-blue-700" : "text-(--text)";
            }}
          >
            {FaUser}
          </NavLink>
        </div>
      </nav>
    </footer>
  );
}
