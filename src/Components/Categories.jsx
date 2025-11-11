import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { CategoryContext } from "../Contexts/CategoryContext";

export default function Categories() {
  const categories = [
    "general",
    "technology",
    "sports",
    "health",
    "business",
    "entertainment",
  ];

  const [category, setCategory] = useContext(CategoryContext);
  

  return (
    <>
      <div
        className={`grid grid-flow-col gap-2 mx-auto w-[calc(100%-16px)] overflow-x-scroll scroll-smooth scroll hide-scrollbar sm:w-[calc(100%-32px)] py-2 my-2`}
      >
        {categories.map((ct, ind) => (
          <span
            className={`px-2 py-1 shadow-md rounded-lg bg-(--bg) text(--text) text-center capitalize cursor-pointer hover:transform hover:scale-105 transition-transform ${
              ct === category ? "bg-[#5a749d]" : ""
            }`}
            key={ind}
            onClick={(e) => setCategory(e.target.innerText.toLowerCase())}
          >
            {ct}
          </span>
        ))}
      </div>
    </>
  );
}
