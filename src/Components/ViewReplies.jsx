import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { CommentNewsContext } from "../Contexts/CommentNewsContext";

export default function ViewReplies({ parentComment }) {
  const [isDark] = useContext(ThemeContext);
  const [openReplies, setOpenReplies] = useState(false);

  const [existingChildComments, setExistingChildComments] = useState([]);
  // const [newChildComments, setNewChildComments] = useState([]);

  const [piecewiseComments, setPiecewiseComments] = useState(
    existingChildComments
  );
  const [startInd, setStartInd] = useState(0);
  const [allrepliesShown, setAllRepliesShown] = useState(false);

  const { newChildComments, newsToSeeComment } = useContext(CommentNewsContext);

  async function fetchExistingChildComments(e, commentId) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/comments/child-comments/${newsToSeeComment?._id}/${commentId}`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.log(
          "Fetching existing child comments failed: ",
          response.status
        );
      } else {
        const data = await response.json();
        // console.log("Data: ", data);
        if(data?.data?.length === 0) {
          setAllRepliesShown(true);
        }
        return data;
      }
    } catch (error) {
      console.log("Error while fetching child comments: ", error.message);
    }
    return null;
  }

  useEffect(() => {
    if((existingChildComments.length !== 0) && (startInd >= existingChildComments.length)) {
      setAllRepliesShown(true);
    } else {
      setAllRepliesShown(false);
    }
  }, [startInd, newChildComments]);

  useEffect(() => {
    if (newsToSeeComment && parentComment) {
      const commentId = parentComment?._id ?? parentComment;
      fetchExistingChildComments(null, commentId);
    }
  }, [newChildComments, newsToSeeComment, parentComment]);

  return (
    <div className={`flex flex-col gap-4 pb-7 px-2`}>
      {/* Original UI */}
      {piecewiseComments.map((childCom, ind) => {
        // console.log("first: ", childCom);
        return (
          <div className={`${openReplies ? "block" : "hidden"}`} key={ind}>
            <div className={``}>
              <h3 className="text-md font-bold">
                {childCom?.commentedBy?.username ?? "Wrong access"}
              </h3>
              <p className="text-xs">{childCom?.text ?? "Wrong access"}</p>
              <div className="flex flex-col gap-2 items-start mt-1">
                <label
                  htmlFor="comment"
                  className={`cursor-pointer ${
                    isDark ? "text-neutral-300" : "text-slate-400"
                  } font-semibold text-xs`}
                >
                  Reply
                </label>
              </div>
            </div>
          </div>
        );
      })}

      <button
        className={`cursor-pointer ${
          isDark ? "text-neutral-300" : "text-slate-400 mb-4"
        } font-semibold text-xs ${allrepliesShown ? "hidden" : "flex"}`}
        onClick={async (e) => {
          e.stopPropagation();
          setOpenReplies(true);
          console.log("comm: ", existingChildComments);
          console.log("first: ", allrepliesShown)
          if (!existingChildComments.length) {
            const commentId = parentComment?._id ?? parentComment;
            const data = await fetchExistingChildComments(e, commentId);
            const items = Array.isArray(data?.data) ? data.data : [];
            setExistingChildComments((prev) => [...prev, ...items]);

            setPiecewiseComments(items.slice(0, 11));
          } else {
            if (startInd + 10 >= existingChildComments.length) {
              setAllRepliesShown(true);
              return;
            }
            setPiecewiseComments((prev) => {
              return [
                ...existingChildComments.slice(startInd, startInd + 10),
              ];
            });
            setStartInd((prev) => prev + 10);
          }
        }}
      >
        {!openReplies
          ? allrepliesShown ? "" : "----View replies"
          : "----View more replies"}
      </button>
    </div>
  );
}
