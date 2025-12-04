import React, { useEffect, useState } from "react";
import LikedPostCard from "../Components/LikedPostCard";

const fetchLikedPosts = async (loaderFunction) => {
  try {
    loaderFunction(true);
    const url = `${
      import.meta.env.VITE_BACKEND_BASE_URL
    }/api/v1/posts/get-liked-posts`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    console.log("Response: ", response);

    if (response.statusCode >= 400) {
      console.log("Fetching liked posts failed: ", response.status);
    } else {
      const data = await response.json();
      // loaderFunction(false);
      // console.log("Liked posts: ", data);
      return data;
    }
  } catch (error) {
    console.log("Error in fetching liked posts: ", error.message);
  } finally {
    loaderFunction(false);
  }
};

export default function LikedPosts() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [fetchingLikedPosts, setFetchingLikedPosts] = useState(false);
  useEffect(() => {
    fetchLikedPosts(setFetchingLikedPosts)
      .then((data) => {
        console.log("Data: ", data);
        setLikedPosts([...data?.data]);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return fetchingLikedPosts ? (
    <div className="h-screen w-full flex justify-center items-center">
      <p className="text-(--text) text-2xl font-semibold">
        Getting liked posts...
      </p>
    </div>
  ) : (
    <div
      className={`mt-45 w-[calc(100%-16px)] mx-auto sm:w-[calc(100%-32px)] mb-20 flex flex-col gap-4 border-2 rounded-2xl overflow-hidden max-w-[750px]`}
    >
      {/* <NearbyNewsCard />
      <NearbyNewsCard />
      <NearbyNewsCard /> */}
      {/* <h1>Liked Posts</h1> */}

      {likedPosts.map((post) => {
        // console.log("asdf: ", likedPosts)
        return <LikedPostCard post={post} />;
      })}
    </div>
  );
}
