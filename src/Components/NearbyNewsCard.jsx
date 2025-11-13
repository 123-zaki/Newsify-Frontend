import React, { useContext, useEffect, useState } from "react";
import { FaBookmark, FaComment, FaHeart, FaShare } from "react-icons/fa";
import { CommentContext } from "../Contexts/CommentContext";
import { CommentNewsContext } from "../Contexts/CommentNewsContext";

export default function NearbyNewsCard({ news, fetchExistingIndComments }) {
  const [liked, setLiked] = useState(false);
  const [temporaryLike, setTemporaryLike] = useState(news?.Likes ?? '');
  const [temporaryComment, setTemporaryComment] = useState(
    news?.Comments ?? ""
  );
  // const [temporyShare, setTemporyShare] = useState(news?.Shares ?? '');

  const { openComment, setOpenComment } = useContext(CommentContext);
  const { newsToSeeComment, setNewsToSeeComment } =
    useContext(CommentNewsContext);

  // console.log("shares: ", news);

  // useEffect(() => {
  //   // console.log("Rendering news card")

  //   fetchExistingIndComments();
  // }, [newIndComments]);

  useEffect(() => {
    async function checkLike() {
      const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/like/check-like/${news._id}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          console.log("Like checking failed: ", response.status);
        } else {
          const data = await response.json();
          // console.log("Data: ", data);
          setLiked(data.data);
        }
      } catch (error) {
        console.log("Error while checking like: ", error.message);
      }
    }

    checkLike();
  }, []);

  useEffect(() => {
    async function updateLike() {
      // console.log("news Id: ", news._id);
      const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/like/update-like`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          credentials: "include",
          body: JSON.stringify({ liked, newsId: news._id }),
        });

        if (!response.ok) {
          console.log("Like updation failed: ", response.status);
        } else {
          const data = await response.json();
          // console.log("Like Data: ", data);
        }
      } catch (error) {
        console.log("Error while updating like: ", error.message);
      }
    }

    const id = setTimeout(updateLike, 3 * 1000);

    return () => {
      clearTimeout(id);
    };
  }, [liked]);

  useEffect(() => {
    async function updateTemporaryComment() {
      // console.log("news Id: ", news._id);
      const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/comments/get-comments-quantity/${news._id}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!response.ok) {
          console.log("Temporary Comments updation failed: ", response.status);
        } else {
          const data = await response.json();
          setTemporaryComment((prev) => data?.data ?? prev);
          // console.log("Like Data: ", data);
        }
      } catch (error) {
        console.log("Error while updating temporary comments: ", error.message);
      }
    }

    const id = setTimeout(updateTemporaryComment, 3 * 1000);

    return () => {
      clearTimeout(id);
    };
  }, [temporaryComment]);

  async function handleLike(e) {
    e.stopPropagation();
    setLiked(!liked);
    setTemporaryLike((prev) => {
      if(liked) return prev - 1;
      else  return prev + 1;
    })
  }

  async function handleShare(e) {
    e.stopPropagation();

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Have a look at this firy news",
          text: `Post by ${"Me"}`,
          url: "http://localhost:5173/dashboard",
        });

        const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/news/share/update/${news?._id}`;

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          console.log("Update Share failed: ", response.status);
        } else {
          const data = await response.json();
          console.log("Data: ", data);
        }

        console.log("Share successful");
      } else {
        alert("Sharing not supported in this browser.");
      }
    } catch (error) {
      console.log("Error while sharing: ", error.message);
    }
  }

  async function handleBookmark(e) {}

  return (
    <div className="rounded-md shadow-sm hover:shadow-md bg-(--bg-body) text-(--text) p-2">
      <div>
        <img
          src={
            news.urlToImage ??
            "https://images.unsplash.com/photo-1503264116251-35a269479413?blur=80&auto=format&fit=crop&w=800&q=20"
          }
          alt="nearby-news"
          className="w-full object-cover h-60 lg:h-70 mb-2 rounded-sm sm:rounded-md"
        />
        <h1 className="text-2xl font-semibold">{news?.title}</h1>
        <p className="mb-4">{news?.description}</p>
      </div>
      <div className="flex gap-8">
        <div className={`flex items-center`}>
          <button
            className={`cursor-pointer p-1.5 rounded-full hover:bg-neutral-500 ${
              liked ? "text-red-500" : ""
            }`}
            onClick={handleLike}
          >
            <FaHeart />
          </button>
          <span>{temporaryLike}</span>
        </div>
        <div className={`flex items-center`}>
          <button
            className={`cursor-pointer p-1.5 rounded-full hover:bg-neutral-500`}
            onClick={(e) => {
              e.stopPropagation();
              setNewsToSeeComment(news);
              setOpenComment(!openComment);
            }}
          >
            <FaComment />
          </button>
          <span>{temporaryComment}</span>
        </div>
        <div className={`flex items-center`}>
          <button
            className={`cursor-pointer p-1.5 rounded-full hover:bg-neutral-500`}
            onClick={handleShare}
          >
            <FaShare />
          </button>
          <span>{news?.Shares}</span>
        </div>
        <button
          className={`cursor-pointer p-1.5 rounded-full hover:bg-neutral-500`}
        >
          <FaBookmark />
        </button>
      </div>
    </div>
  );
}
