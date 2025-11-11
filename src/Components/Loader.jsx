import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function Loader() {
  const [isDark] = useContext(ThemeContext);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:gap-x-15 mt-8">
      {Array.from({ length: 10 }).map((el, ind) => (
        <div className={`${isDark ? 'bg-slate-600' : 'bg-(--bg)'} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer relative`} key={ind}>
          <div className="w-full h-48 mb-3 bg-(--bg-loader) animate-pulse"></div>
          <div className="p-3 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 bg-(--bg-loader) animate-pulse h-15"></h2>
            <p className="mb-8 h-30 bg-(--bg-loader) animate-pulse"></p>
            <p
              className="absolute bottom-2 self-center bg-(--bg-loader) animate-pulse h-5 w-25"
            ></p>
          </div>
        </div>
      ))}
    </div>
  );
}
