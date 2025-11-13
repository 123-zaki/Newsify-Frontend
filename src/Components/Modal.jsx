import React from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, setIsOpen, header, content, footer, setErrors = function () {} }) {
  return createPortal(
    <div
      className={`fixed bg-black/50 z-20 inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      } px-5`}
      onClick={(e) => setIsOpen(false)}
    >
      <div
        className="shadow-md bg-(--bg-modal) rounded-lg hover:shadow-lg flex flex-col gap-4 sm:min-w-[650px] pb-2 px-4 sm:px-8 md:px-15 lg:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl sm:text-3xl text-center pt-2 font-bold text-(--text)">{header}</h1>
        <hr className="bg-slate-400" />
        <div className="px-6 py-1">{content}</div>
        <div className="px-6 py-1 flex justify-center text-(--text)">{footer}</div>
      </div>
    </div>,
    document.getElementById("root")
  );
}
