import React, { useContext, useEffect, useState } from "react";
import { ProfileMenuContext } from "../Contexts/ProfileMenuContext";
import {
  FaCog,
  FaComment,
  FaHamburger,
  FaHeart,
  FaLocationArrow,
  FaPenAlt,
  FaPlus,
  FaSearchLocation,
  FaUpload,
  FaUser,
} from "react-icons/fa";
import { useWindowSize } from "../CustomHooks/useWindowSize";
import { ThemeContext } from "../Contexts/ThemeContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import NearbyNewsCard from "../Components/NearbyNewsCard";
import News from "../Components/News";
import CommentModal from "../Components/CommentModal";
import { CommentContext } from "../Contexts/CommentContext";
import { CommentNewsContext } from "../Contexts/CommentNewsContext";
import { DashboardHamburgerContext } from "../Contexts/DashboardHamburgerContext";
import { UploadNewsContext } from "../Contexts/UploadNewsContext";
import UploadNewsModal from "../Components/UploadNewsModal";

export default function Dashboard() {
  const { setOpenProfileMenu } = useContext(ProfileMenuContext);
  const [isDark] = useContext(ThemeContext);
  const { isOpen, setIsOpen } = useContext(DashboardHamburgerContext);
  const { isUploadNewsOpen, setIsUploadNewsOpen } =
    useContext(UploadNewsContext);
  const windowSize = useWindowSize();
  // console.log("window Size: ", windowSize);

  const [uploadNewsData, setUploadNewsData] = useState({
    title: "",
    description: "",
    image: null,
    location: null,
  });

  const [nearbyNews, setNearbyNews] = useState([]);
  const { newsToSeeComment, setNewsToSeeComment, setExistingIndComments } =
    useContext(CommentNewsContext);
  const [fetchingNews, setFetchingNews] = useState(false);

  //

  const { setOpenComment } = useContext(CommentContext);

  useEffect(() => {
    async function fetchNearbyNews() {
      try {
        setFetchingNews(true);

        const url = `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/api/v1/nearby/news/surrounding`;

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch nearby news: ", response.status);
        } else {
          const data = await response.json();

          // console.log("Data: ", data);

          setNearbyNews(data.data);
        }
      } catch (error) {
        console.log("Error while fetching nearby news: ", error.message);
      } finally {
        setFetchingNews(false);
      }
    }

    fetchNearbyNews();
  }, []);

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

      const data = await response.json();
      console.log("Data: ", data);
    } catch (error) {
      console.log("Error uploading news: ", error.message);
    }

    setUploadNewsData({
      title: "",
      description: "",
      image: null,
      location: null,
    });
  }

  async function fetchExistingIndComments() {
    // console.log("Calling fetch existing ind comm.")
    console.log("News id: ", newsToSeeComment?._id);
    const url = `${
      import.meta.env.VITE_BACKEND_BASE_URL
    }/api/v1/comments/ind-comments/${newsToSeeComment?._id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (!response.ok) {
        console.log("Fetching existing ind comments failed: ", response.status);
      } else {
        const data = await response.json();
        const items = data?.data ? data.data : [];
        setExistingIndComments([...items]);
        console.log("Existing independent comment Data: ", data);
        return items;
      }
    } catch (error) {
      console.log("Error while fetching independent comments: ", error.message);
    }
  }

  return (
    <div
      className="h-[calc(100vh-140px)]"
      onClick={(e) => {
        // e.stopPropagation();
        // console.log("first")
        setOpenProfileMenu(false);
        setOpenComment(false);
      }}
    >
      <div
        className={`absolute p-4 text-3xl rounded-full bg-black/60 bottom-20 z-10 cursor-pointer right-3 text-(--text)`}
        title="Upload News (Contribute)"
        onClick={(e) => {
          e.stopPropagation();
          setIsUploadNewsOpen(true);
        }}
      >
        <FaPlus />
      </div>
      <main
        className="mt-30 gap-4 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] mx-auto text-(--text)"
        style={{
          display: "grid",
          gridTemplateColumns: `${
            // windowSize > 931 ? "1fr 3fr 1fr" : "1fr 3fr"
            windowSize < 700
              ? "1fr"
              : windowSize < 931
              ? "1fr 3fr"
              : "1fr 3fr 1fr"
          }`,
        }}
      >
        <div
          className={`flex flex-col md:text-lg font-semibold h-[calc(100vh-210px)] bg-(--bg) rounded-md shadow-sm ${
            windowSize < 700 ? "hidden" : "flex"
          }`}
        >
          <div
            className={`p-2 px-3 rounded-md cursor-pointer ${
              isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
            } ${
              isDark ? "text-neutral-300" : "text-black"
            } flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <FaSearchLocation /> Nearby News
          </div>
          <div
            className={`p-2 px-3 rounded-md cursor-pointer ${
              isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
            } ${
              isDark ? "text-neutral-300" : "text-black"
            } flex items-center gap-2`}
            onClick={(e) => {
              console.log("clicked");
              e.stopPropagation();
              setIsOpen(false);
              setIsUploadNewsOpen(!isUploadNewsOpen);
            }}
          >
            <FaPenAlt />
            Upload News
          </div>
          <div
            className={`p-2 px-3 rounded-md cursor-pointer ${
              isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
            } ${
              isDark ? "text-neutral-300" : "text-black"
            } flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <FaHeart />
            Liked Posts
          </div>
          <div
            className={`p-2 px-3 rounded-md cursor-pointer ${
              isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
            } ${
              isDark ? "text-neutral-300" : "text-black"
            } flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <FaComment />
            Comments
          </div>
          <div
            className={`p-2 px-3 rounded-md cursor-pointer ${
              isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
            } ${
              isDark ? "text-neutral-300" : "text-black"
            } flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <FaUser />
            Profile
          </div>
          <div
            className={`p-2 px-3 rounded-md cursor-pointer ${
              isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
            } ${
              isDark ? "text-neutral-300" : "text-black"
            } flex items-center gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <FaCog />
            Settings
          </div>
        </div>
        <div className="h-[calc(100vh-256px)] mt-0 relative">
          <div className="flex items-center justify-between">
            <h1
              className={`text-2xl font-bold mb-2 ${
                isDark ? "text-neutral-300" : "text-black"
              }`}
            >
              Nearby News
            </h1>
            <div className={`${windowSize < 700 ? "block" : "hidden"}`}>
              <button
                className={`cursor-pointer text-2xl`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
              >
                <FaHamburger />
              </button>
              <div
                className={`absolute right-0 z-30 flex flex-col md:text-lg font-semibold bg-(--bg) rounded-md shadow-sm ${
                  isOpen ? "flex" : "hidden"
                }`}
              >
                <div
                  className={`p-2 px-3 rounded-md cursor-pointer ${
                    isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
                  } ${
                    isDark ? "text-neutral-300" : "text-black"
                  } flex items-center gap-2`}
                >
                  <FaSearchLocation /> Nearby News
                </div>
                <div
                  className={`p-2 px-3 rounded-md cursor-pointer ${
                    isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
                  } ${
                    isDark ? "text-neutral-300" : "text-black"
                  } flex items-center gap-2`}
                  onClick={(e) => {
                    console.log("clicked");
                    e.stopPropagation();
                    setIsOpen(false);
                    setIsUploadNewsOpen(!isUploadNewsOpen);
                  }}
                >
                  <FaPenAlt />
                  Upload News
                </div>
                <div
                  className={`p-2 px-3 rounded-md cursor-pointer ${
                    isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
                  } ${
                    isDark ? "text-neutral-300" : "text-black"
                  } flex items-center gap-2`}
                >
                  <FaHeart />
                  Liked Posts
                </div>
                <div
                  className={`p-2 px-3 rounded-md cursor-pointer ${
                    isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
                  } ${
                    isDark ? "text-neutral-300" : "text-black"
                  } flex items-center gap-2`}
                >
                  <FaComment />
                  Comments
                </div>
                <div
                  className={`p-2 px-3 rounded-md cursor-pointer ${
                    isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
                  } ${
                    isDark ? "text-neutral-300" : "text-black"
                  } flex items-center gap-2`}
                >
                  <FaUser />
                  Profile
                </div>
                <div
                  className={`p-2 px-3 rounded-md cursor-pointer ${
                    isDark ? "hover:bg-slate-100/20" : "hover:bg-black/10"
                  } ${
                    isDark ? "text-neutral-300" : "text-black"
                  } flex items-center gap-2`}
                >
                  <FaCog />
                  Settings
                </div>
              </div>
            </div>
          </div>
          <CommentModal fetchExistingIndComments={fetchExistingIndComments} />
          <div className="rounded-md shadow-sm bg-(--bg) h-full px-3 overflow-y-scroll scroll-smooth hide-scrollbar relative my-2">
            <div className="bg-(--bg) h-4 sticky z-10 w-full top-0"></div>
            {fetchingNews ? (
              <div className="w-full h-full flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {/* <NearbyNewsCard /> */}
                {/* <NearbyNewsCard />
                <NearbyNewsCard />
                <NearbyNewsCard />
                <NearbyNewsCard /> */}

                {nearbyNews.length > 0 ? (
                  nearbyNews.map((news, ind) => {
                    return (
                      <div className="flex flex-col gap-2" key={ind}>
                        <NearbyNewsCard
                          news={news}
                          fetchExistingIndComments={fetchExistingIndComments}
                        />
                        {/* <News article={news} ind={ind} /> */}
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center mt-40">
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-center">
                        No nearby news yet
                      </h2>
                      <p className="text-sm text-center">
                        Take your first step and be the one in your area to
                        contribute
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="bg-(--bg) h-3 sticky z-10 w-full bottom-0 backdrop-blur-3xl"></div>
          </div>
        </div>
        <div
          className={`p-2 px-4 bg-(--bg) rounded-md shadow-sm text-(--text) ${
            windowSize > 931 ? "" : "hidden"
          } h-fit`}
        >
          <h2
            className={`text-(--text) text-xl font-semibold mb-2 ${
              isDark ? "text-neutral-300" : "text-black"
            }`}
          >
            Upload News
          </h2>
          <form action="">
            <input
              name="title"
              id="title"
              value={uploadNewsData.title}
              placeholder="Title"
              className={`px-2 py-1.5 mb-2 font-sm outline-0 border border-slate-400 rounded-md text-(--text) bg-(--bg-body)`}
              onChange={(e) =>
                setUploadNewsData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />

            <textarea
              name="description"
              id="description"
              value={uploadNewsData.description}
              placeholder="Description"
              className="px-2 py-1.5 font-sm outline-0 border border-slate-400 rounded-md text-(--text) h-[150px] bg-(--bg-body) w-full resize-none hide-scrollbar"
              onChange={(e) =>
                setUploadNewsData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>

            <label
              htmlFor="image"
              className={`inline-block mb-2 ${
                isDark ? "text-neutral-300" : "text-black"
              }`}
            >
              Image
            </label>
            <div className="rounded-md shadow-sm bg-(--bg-body) cursor-pointer px-2 py-2 mb-2">
              <label
                htmlFor="image"
                className={`${
                  isDark ? "text-neutral-300" : "text-black"
                } cursor-pointer flex items-center gap-2 justify-center text-xs`}
              >
                <FaUpload />
                {uploadNewsData.image ? "Change image" : "Upload an image"}
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
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
                htmlFor="location"
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
                id="location"
                // disabled={uploadNewsData.location}
                className="sr-only"
                onClick={(e) => {
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
              className="w-full mt-2 px-4 py-1.5 bg-blue-400/60 rounded-md shadow-sm cursor-pointer hover:bg-blue-600/20"
              onClick={handleNewsUpload}
            >
              Submit
            </button>
          </form>
        </div>
      </main>

      <UploadNewsModal />
    </div>
  );
}
