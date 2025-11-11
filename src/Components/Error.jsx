import React from "react";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Error() {

  const navigate = useNavigate();
  //   return (
  //     <div className='h-screen w-full flex justify-center items-center'>
  //         <div className="p-4 shadow-lg rounded-md w-[300px] h-[300px]"></div>
  //     </div>
  //   )
  return (
    <>
      <button className="px-4 py-2 rounded-md shadow-sm hover:shadow-md ml-2 cursor-pointer sm:ml-4 mb-5 mt-30 flex items-center gap-2 bg-(--bg) text-(--text) font-semibold" onClick={() => navigate(-1)}><FaArrowLeft />Go-Back</button>
      <div className="flex flex-col justify-center items-center mt-20 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] mx-auto">
        <div className="max-w-96 shadow-xl rounded-lg hover:shadow-2xl hover:rounded-br-2xl hover:rounded-tl-2xl p-4 bg-(--bg)">
            <h1 className="text-2xl font-semibold text-(--text) mb-4 select-none text-center">
          404 - Page Not Found
        </h1>
        <p className="text-(--text) select-none text-center">
          This article page does not exist, you have arrived on a wrong url
        </p>
        <h2 className="text-(--text) select-none text-lg font-semibold mt-2 text-center">
            (If you are on correct url then this page does not exist now but will come soon)
        </h2>
        </div>
      </div>
    </>
  );
}
