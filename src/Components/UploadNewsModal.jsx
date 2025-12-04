import React, { useContext, useState } from "react";
import { UploadNewsContext } from "../Contexts/UploadNewsContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import { FaLocationArrow, FaUpload } from "react-icons/fa";
import { useWindowSize } from "../CustomHooks/useWindowSize";
import Modal from "./Modal";

export default function UploadNewsModal() {
  const { isUploadNewsOpen, setIsUploadNewsOpen } =
    useContext(UploadNewsContext);
  const [isDark] = useContext(ThemeContext);
  const windowSize = useWindowSize();

  const [uploadNewsData, setUploadNewsData] = useState({
    title: "",
    description: "",
    image: null,
    location: null,
  });
  const [responseErrors, setResponseErrors] = useState();
  const [uploadingNews, setUploadingNews] = useState(false);

  async function handleNewsUpload(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("Handle News Upload");
    console.log("Upload news data: ", uploadNewsData);

    // function getCookie(name) {
    //   const m = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
    //   return m ? decodeURIComponent(m[2]) : null;
    // }
    // const token = getCookie("token");

    const url = `${
      import.meta.env.VITE_BACKEND_BASE_URL
    }/api/v1/nearby/news/upload`;

    try {
      setUploadingNews(true);
      const fd = new FormData();
      fd.append("title", uploadNewsData.title);
      fd.append("description", uploadNewsData.description);
      fd.append("image", uploadNewsData.image);
      if (uploadNewsData.location)
        fd.append("location", JSON.stringify(uploadNewsData.location));

      console.log("Fd: ", fd);

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: fd,
      });

      if (response.ok) {
        const data = await response.json().catch(() => null);
        console.log("Data: ", data);
        // close modal only after successful upload
        setIsUploadNewsOpen(false);

        // reset form data after success
        setUploadNewsData({
          title: "",
          description: "",
          image: null,
          location: null,
        });
      } else {
        const errJson = await response.json().catch(() => null);
        const message =
          errJson?.message || response.statusText || "Upload failed";
        setResponseErrors(message);
        console.log("Error while uploading news : ", message);
      }
    } catch (error) {
      console.log("Error uploading news: ", error.message);
    } finally {
      setUploadingNews(false);
    }

    setUploadNewsData({
      title: "",
      description: "",
      image: null,
      location: null,
    });
  }

  return (
    <Modal
      isOpen={isUploadNewsOpen}
      setIsOpen={setIsUploadNewsOpen}
      header={"Upload News"}
      content={
        <div className={`text-(--text) h-fit`}>
          <h2
            className={`text-(--text) text-xl font-semibold mb-2 ${
              isDark ? "text-neutral-300" : "text-black"
            }`}
          >
            Upload News
          </h2>
          <form onSubmit={handleNewsUpload}>
            <input
              name="title"
              id="title-modal"
              value={uploadNewsData.title}
              placeholder="Title"
              className={`px-2 py-1.5 mb-2 font-sm outline-0 border border-slate-400 rounded-md text-(--text) bg-(--bg-body) w-full`}
              onChange={(e) => {
                setResponseErrors("");
                setUploadNewsData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />

            <textarea
              name="description"
              id="description-modal"
              value={uploadNewsData.description}
              placeholder="Description"
              className="px-2 py-1.5 font-sm outline-0 border border-slate-400 rounded-md text-(--text) h-[150px] bg-(--bg-body) w-full resize-none hide-scrollbar"
              onChange={(e) =>
              {
                setResponseErrors("");
                setUploadNewsData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              }
            ></textarea>

            <label
              htmlFor="image-modal"
              className={`inline-block mb-2 ${
                isDark ? "text-neutral-300" : "text-black"
              }`}
            >
              Image
            </label>
            <div className="rounded-md shadow-sm bg-(--bg-body) cursor-pointer px-2 py-2 mb-2">
              <label
                htmlFor="image-modal"
                className={`${
                  isDark ? "text-neutral-300" : "text-black"
                } cursor-pointer flex items-center gap-2 justify-center text-xs`}
              >
                <FaUpload />
                {uploadNewsData.image ? "Change image" : "Upload an image"}
              </label>
              <input
                type="file"
                id="image-modal"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  e.stopPropagation();
                  console.log("Files: ", e.target.files);

                  const image = e.target.files?.[0];
                  if (!image) return;
                  if (image.size > 5 * 1024 * 1024) return alert("Max 5MB");

                  setUploadNewsData((prev) => ({ ...prev, image: image }));
                }}
              />
              <div className="cursor-default">
                {uploadNewsData.image && (
                  <>
                    <div
                      className={`${
                        isDark ? "bg-white" : "bg-black"
                      } h-0.5 w-full my-1`}
                    ></div>
                    <div className="flex justify-center">
                      <img
                        src={URL.createObjectURL(uploadNewsData.image)}
                        alt="preview"
                        className="w-32 h-20 object-cover"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="rounded-md shadow-sm bg-(--bg-body) cursor-pointer px-2 py-2">
              <label
                htmlFor="location-modal"
                // title={`${uploadNewsData.location ? 'Your location is set' : ''}`}
                // className={`${
                //   isDark ? "text-neutral-300" : "text-black"
                // } ${uploadNewsData.location ? 'cursor-not-allowed' : 'cursor-pointer'} flex items-center gap-2 justify-center text-xs`}
                className={`${
                  isDark ? "text-neutral-300" : "text-black"
                } cursor-pointer flex items-center gap-2 justify-center text-xs`}
              >
                <FaLocationArrow />
                {uploadNewsData.location
                  ? `lat: ${uploadNewsData.location.lat.toFixed(
                      2
                    )}, long: ${uploadNewsData.location.long.toFixed(2)}`
                  : "Use my location"}
              </label>
              <input
                type=""
                id="location-modal"
                // disabled={uploadNewsData.location}
                className="sr-only"
                onClick={(e) => {
                  e.stopPropagation();
                  const location = navigator.geolocation.getCurrentPosition(
                    (loc) =>
                      setUploadNewsData((prev) => ({
                        ...prev,
                        location: {
                          lat: loc.coords.latitude,
                          long: loc.coords.longitude,
                        },
                      })),
                    (err) =>
                      console.log("Error getting location: ", err.message)
                  );
                }}
              />
            </div>
            <button
              type="submit"
              disabled={uploadingNews}
              className={`w-full mt-2 px-4 py-1.5 bg-blue-400/60 rounded-md shadow-sm hover:bg-blue-600/20 ${uploadingNews ? 'cursor-no-drop' : 'cursor-pointer'}`}
            >
              {uploadingNews ? "Uploading news..." : "Submit"}
            </button>
          </form>
        </div>
      }
      footer={
        <>
          {responseErrors && (
            <p className="text-red-600 text-sm bottom-32 -mt-3">
              {responseErrors}
            </p>
          )}
          {/* <p className="mt-6">
            Don't have an account?{" "}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setOpenSignUp(true);
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Create New
            </button>
          </p> */}
        </>
      }
    />
  );
}
