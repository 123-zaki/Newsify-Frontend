import React, { useState } from "react";

const Toggle = ({ setIsDark, isDark }) => {
  const [isChecked, setIsChecked] = useState(JSON.parse(localStorage.getItem('isChecked')) ?? false);

  const handleCheckboxChange = () => {
    setIsChecked(!isDark);
  };

  return (
    <div className={`rounded-full p-1 sm:p-2 bg-(--bg-body) ${isDark ? 'shadow-lg px-1' : ''}`} onClick={(e) => e.stopPropagation()}>
      <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <span className="label sm:flex items-center text-sm font-medium text-(--text) hidden">
          Light
        </span>
        <span
          className={`slider mx-1 flex h-6 w-[45px] items-center rounded-full p-1 duration-200 ${
            isDark ? "bg-[#072548]" : "bg-[#CCCCCE]"
          }`}
          onClick={() => {
            localStorage.setItem("isDark", JSON.stringify(!isDark));
            localStorage.setItem("isChecked", JSON.stringify(!isChecked));
            setIsDark(!isDark);
          }}
        >
          <span
            className={`dot h-4 w-4 rounded-full bg-white duration-200 ${
              isDark ? "translate-x-[22px]" : ""
            }`}
          ></span>
        </span>
        <span className="label sm:flex items-center text-sm font-medium text-(--text) hidden">
          Dark
        </span>
      </label>
    </div>
  );
};

export default Toggle;
