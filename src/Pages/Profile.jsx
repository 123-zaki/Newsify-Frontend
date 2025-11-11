import React, { useContext, useState } from "react";
import {
  FaArrowLeft,
  FaHome,
  FaCog,
  FaLightbulb,
  FaAngleUp,
  FaMoon,
  FaSignOutAlt,
  FaNewspaper,
  FaBookmark
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Contexts/ThemeContext";
import SignUpModal from "../Components/SignUpModal";
import LoginModal from "../Components/LoginModal";
import { AuthContext } from "../Contexts/AuthContext";

export default function Profile() {
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const [isDark, setIsDark] = useContext(ThemeContext);

  const [openSetting, setOpenSetting] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <div className="relative" onClick={() => setOpenSetting(false)}>
      <div
        className={`${
          !openSetting
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        } -top-25 absolute w-full z-10 shadow-md bg-(--bg) text-(--text) py-3 transform transition-all`}
      >
        <button
          className="absolute right-5 z-20 cursor-pointer"
          onClick={() => setOpenSetting(false)}
        >
          <FaAngleUp />
        </button>
        <div className={`flex p-4 items-center justify-center`}>
          <div className="flex flex-col sm:flex-row gap-4 pt-2 pb-1">
            <button
              className="shadow-sm rounded-md hover:shadow-md text-(--text) flex gap-2 items-center px-4 py-1 cursor-pointer bg-(--bg-body)"
              onClick={() => {
                setIsDark(true);
                localStorage.setItem("isDark", JSON.stringify(true));
                setOpenSetting(false);
              }}
            >
              Dark Mode <FaMoon />
            </button>
            <button
              className="shadow-sm rounded-md hover:shadow-md text-(--text) flex gap-2 items-center px-4 py-1 cursor-pointer bg-(--bg-body)"
              onClick={() => {
                setIsDark(false);
                localStorage.setItem("isDark", JSON.stringify(false));
                setOpenSetting(false);
              }}
            >
              Light Mode <FaLightbulb />
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-5 py-3 flex justify-between text-(--text) mt-28">
        <div className="bg-slate-400 rounded-full p-2 cursor-pointer">
          <NavLink
            className="text-black"
            onClick={() => {navigate(-1)}}
            title="Go Back"
          >
            {FaArrowLeft}
          </NavLink>
        </div>
        <div className="bg-slate-400 rounded-full p-2 cursor-pointer">
          <NavLink to={"/"} className="text-black" title="Go Home">
            {FaHome}
          </NavLink>
        </div>
      </div>
      {/* <hr className="text-slate-500 mb-5" /> */}
      <main className="mt-8">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="bg-(--bg) text-(--text) rounded-md shadow-sm p-2">
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Date Of Birth: {user.dateOfBirth}</p>
              <p>Mobile: {user.mobileNumber}</p>
            </div>

            <div
              className="hover:shadow-md cursor-pointer rounded-md hover:overflow-hidden hover:border"
              onClick={(e) => {
                e.stopPropagation();
                setOpenSetting(true);
              }}
            >
              <hr className="text-slate-300" />
              <p className="text-xl py-2 mx-auto px-4 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] flex gap-4 sm:gap-6 md:gap-8 items-center text-(--text)">
                <span>
                  <FaCog />
                </span>{" "}
                Settings
              </p>
              <hr className="text-slate-300" />
            </div>

            <div
              className="hover:shadow-md cursor-pointer rounded-md hover:overflow-hidden hover:border"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/user/:id/contribution")
              }}
            >
              <hr className="text-slate-300" />
              <p className="text-xl py-2 mx-auto px-4 w-[calc(100%-8px)] sm:w-[calc(100%-16px)] flex gap-4 sm:gap-6 md:gap-8 items-center text-(--text)">
                <span>
                  <FaNewspaper />
                </span>{" "}
                Your Contribution
              </p>
              <hr className="text-slate-300" />
            </div>

            <div
              className="hover:shadow-md cursor-pointer rounded-md hover:overflow-hidden hover:border"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/user/:id/bookmarks")
              }}
            >
              <hr className="text-slate-300" />
              <p className="text-xl py-2 mx-auto px-4 w-[calc(100%-8px)] sm:w-[calc(100%-16px)] flex gap-4 sm:gap-6 md:gap-8 items-center text-(--text)">
                <span>
                  <FaBookmark />
                </span>{" "}
                Bookmarks
              </p>
              <hr className="text-slate-300" />
            </div>

            <div
              className="hover:shadow-md cursor-pointer rounded-md hover:overflow-hidden hover:border"
              onClick={(e) => {
                e.stopPropagation();
                setUser(null);
                // localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
                navigate("/");
              }}
            >
              <hr className="text-slate-300" />
              <p className="text-xl py-2 mx-auto px-4 w-[calc(100%-8px)] sm:w-[calc(100%-16px)] flex gap-4 sm:gap-6 md:gap-8 items-center text-(--text)">
                <span>
                  <FaSignOutAlt />
                </span>{" "}
                Logout
              </p>
              <hr className="text-slate-300" />
            </div>
          </div>
        ) : (
          <div className="text-(--text) flex justify-center items-center w-[calc(100%-16px)] sm:w-[calc(100%-32px)] mx-auto select-none">
            <div className="shadow-md rounded-lg max-w-xl flex flex-col gap-3 p-2 sm:p-4 bg-(--bg)">
              <h2 className="text-center text-2xl font-semibold">
                You are not logged in, Please log in first if you don't have
                account, create one
              </h2>
              <div className="flex justify-between">
                <div className="max-w-[150px] flex items-center flex-col">
                  <button className="shadow-lg hover:shadow-md px-4 py-2 rounded-md font-semibold sm:text-sm text-(--text) bg-(--bg-body) gap-1 cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    setOpenLogin(true);
                    // console.log("Clicked Login");
                  }}>
                    Login
                  </button>
                  <p className="text-center text-blue-600 cursor-pointer hover:underline">Sign In here</p>
                </div>
                <div className="max-w-[150px] flex items-center flex-col">
                  <button className="shadow-lg hover:shadow-md px-4 py-2 rounded-md font-semibold sm:text-sm text-(--text) bg-(--bg-body) gap-1 cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    setOpenSignUp(true);
                    // console.log("Clicked SignUp");
                  }}>
                    Sign Up
                  </button>
                  <p className="text-center text-blue-600 cursor-pointer hover:underline">
                    Don't have account, create one
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <SignUpModal openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} setOpenLogin={setOpenLogin} />
      <LoginModal setOpenSignUp={setOpenSignUp} setOpenLogin={setOpenLogin} openLogin={openLogin} />
    </div>
  );
}
