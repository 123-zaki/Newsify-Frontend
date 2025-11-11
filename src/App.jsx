import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Components/Header";
import Categories from "./Components/Categories";
import { Link, Outlet, useLocation, useMatch } from "react-router-dom";
import { CategoryContext } from "./Contexts/CategoryContext";
import Footer from "./Components/Footer";
import { ThemeContext } from "./Contexts/ThemeContext";
import { AuthContext } from "./Contexts/AuthContext";
import { useWatchLocation } from "./CustomHooks/useWatchLocation";
import { CommentContext } from "./Contexts/CommentContext";
import { ProfileMenuContext } from "./Contexts/ProfileMenuContext";
import { DashboardHamburgerContext } from "./Contexts/DashboardHamburgerContext";

export default function App() {
  const [isDark, setIsDark] = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [hasShadow, setHasShadow] = useState(false);
  const sentinelRef = useRef(null);
  const isHome = useMatch({ path: "/", end: true });
  const showDashboardBtn = useMatch({ path: "/dashboard", end: true });
  const isProfile = useMatch({ path: "/profile", end: true });

  const { setOpenComment } = useContext(CommentContext);
  const { setOpenProfileMenu } = useContext(ProfileMenuContext);
  const {isOpen, setIsOpen} = useContext(DashboardHamburgerContext);

  useWatchLocation(user ? 12000 : null); // At an interval of 2 minutes

  useEffect(() => {
    if (!sentinelRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting === true  => sentinel visible => no shadow
        // entry.isIntersecting === false => scrolled past sentinel => add shadow
        console.log("called!");
        setHasShadow(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <div
      className="max-w-[1400px] mx-auto"
      onClick={(e) => {
        setOpenComment(false);
        setOpenProfileMenu(false);
        setIsOpen(false);
      }}
    >
      <div className={`w-full ${hasShadow ? "shadow-xs" : ""}`}>
        <nav
          className={`w-full fixed top-0 z-2 bg-(--bg) text-(--text) max-w-[1400px] ${
            hasShadow ? "shadow-md" : ""
          } ${isDark ? "bg-(--bg-body)" : ""} pt-3 pb-9 md:pb-12`}
        >
          <div className="sm:block sm:shadow-md rounded-lg w-[calc(100%-16px)] sm:w-[calc(100%-32px)] mx-auto bg-(--bg)">
            <Header />
          </div>
          {true && !showDashboardBtn ? (
            <div className="m w-[calc(100%-16px)] sm:w-[calc(100%-32px)] mx-auto flex justify-end">
              <Link
                to={"/dashboard"}
                className={`bg-blue-500 rounded-md px-4 py-1 md:py-2 md:text-xl font-semibold shadow-sm cursor-pointer hover:bg-blue-700 hover:shadow-md fixed ${
                  !isProfile ? "top-34 sm:top-32" : "bottom-25"
                } text-white`}
              >
                Go to dashboard
              </Link>
            </div>
          ) : (
            []
          )}
          <div className="">{isHome && <Categories />}</div>
          {/* <Categories /> */}
        </nav>
        <div className="h-px" ref={sentinelRef}></div>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
