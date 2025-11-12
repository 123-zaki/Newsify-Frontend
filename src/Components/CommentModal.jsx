import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../Contexts/ThemeContext";
import ViewReplies from "./ViewReplies";
import { FaArrowCircleRight } from "react-icons/fa";
import { ReplyContext } from "../Contexts/ReplyingContext";
import { CommentContext } from "../Contexts/CommentContext";
import { CommentNewsContext } from "../Contexts/CommentNewsContext";

export default function CommentModal({
  fetchExistingIndComments,
}) {


  const {openComment, setOpenComment} = useContext(CommentContext);
  const {existingIndComments, setExistingIndComments, newsToSeeComment, setNewIndComments, setNewChildComments, newIndComments} = useContext(CommentNewsContext);

  useEffect(() => {
    fetchExistingIndComments().then((data) => {
      // console.log(": ", data);
      const items = data ? data : [];
      setExistingIndComments([...items])
    });
  }, [newsToSeeComment, newIndComments]);

  // console.log("Exis ind comm: ", existingIndComments);

  const [isDark] = useContext(ThemeContext);
  const { replyingComment, setReplyingComment } = useContext(ReplyContext);
  const {setTemporaryComment} = useContext(CommentNewsContext);

  const sentinelRef = useRef(null);
  const [hasShadow, setHasShadow] = useState(false);

  const [commentText, setCommentText] = useState("");
  // const [repliedToUsername, setRepliedToUsername] = useState("");

  useEffect(() => {
    if (!sentinelRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting === true  => sentinel visible => no shadow
        // entry.isIntersecting === false => scrolled past sentinel => add shadow
        // console.log("called!");
        setHasShadow(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   if (commentText.trim() !== "" && commentText[0] === "@") {
  //     const [userName] = commentText.split(" ");
  //     setRepliedToUsername(userName);
  //     setCommentText(commentText.replace(userName, ""));
  //   }
  // }, [commentText]);

  async function handleCommentSubmit(e) {}

  async function createComment(e) {
    e.stopPropagation();
    e.preventDefault();

    let repliedToUsername = null;

    try {
      let url = ``;
      let payload = {};
      const parentComment = replyingComment;
      if (replyingComment) {
        url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/comments/create-child-comment/${newsToSeeComment?._id}/${parentComment._id}`;

        if (commentText.trim() !== "" && commentText[0] === "@") {
          const [userName] = commentText.split(" ");
          repliedToUsername = userName;
          setCommentText(commentText.replace(userName, ""));
          console.log("first: ", commentText);
        }

        payload = {
          text: commentText,
          repliedTo:
            repliedToUsername && repliedToUsername.trim() !== ""
              ? repliedToUsername
              : undefined,
        };
      } else {
        url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/comments/create-ind-comment/${newsToSeeComment?._id}`;

        payload = {
          text: commentText,
        };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.log("Comment creation failed: ", response.status);
      } else {
        const data = await response.json();
        console.log("Comment data: ", data);
        if (replyingComment) {
          setNewChildComments((prev) => [...prev, data.data]);
        } else {
          setNewIndComments((prev) => [...prev, data.data]);
        }
      }
    } catch (error) {
      console.log("Error while creating comment: ", error.message);
    }

    setCommentText("");
  }

  return (
    <div
      className={`absolute bg-black/50 z-20 w-full -bottom-10 ${
        openComment ? "h-[480px]" : "h-0"
      } transition-all max-h-[480px]`}
      onClick={(e) => setOpenComment(false)}
    >
      <div
        className={`mt-12 h-[90%] w-full ${
          isDark ? "bg-(--bg-body)" : "bg-white"
        } rounded-xs shadow-sm flex flex-col items-center overflow-y-scroll hide-scrollbar relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-2xl font-bold underline pt-2 mb-3 text-center sticky top-0 ${
            isDark ? "bg-(--bg-body)" : "bg-white"
          } z-10 w-full pb-2 ${hasShadow ? "shadow-sm" : ""}`}
        >
          Comments
        </h2>
        <div className="h-px" ref={sentinelRef}></div>
        <div className={`text-(--text) max-w-[400px] px-2 pb-3`}>
          <div className={`flex flex-col gap-0 pb-6 px-2`}>
            {/* Original UI */}
            {existingIndComments?.map((indComment, ind) => {
              // console.log("first: ", indComment);
              return (
                <div key={ind}>
                  <h3 className="text-md font-bold">
                    {indComment.commentedBy.username ?? "Wrong access"}
                  </h3>
                  <p className="text-xs">{indComment.text ?? "Wrong access"}</p>
                  <div className="flex flex-col gap-2 items-start mt-1">
                    <label
                      htmlFor="comment"
                      className={`cursor-pointer ${
                        isDark ? "text-neutral-300" : "text-slate-400"
                      } font-semibold text-xs`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setReplyingComment(indComment);
                      }}
                    >
                      Reply
                    </label>

                    {/* Replies Section */}
                    <ViewReplies
                      parentComment={indComment}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
      <div
          className={`sticky bottom-22 ${
            isDark ? "bg-(--bg-body)" : "bg-white"
          } p-3 shadow-sm w-full ${openComment ? 'block' : 'hidden'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <form action="">
            <div
              className={`px-4 outline-0 border ${
                isDark ? "border-neutral-100" : "border-slate-200"
              } w-full max-w-[450px] mx-auto rounded-lg flex justify-between`}
            >
              <input
                type="text"
                id="comment"
                value={commentText}
                placeholder="Join the conversation..."
                className={`py-1.5 outline-0 ${
                  isDark
                    ? "placeholder:text-neutral-300"
                    : "placeholder:text-neutral-400"
                } w-full max-w-[450px] mx-auto block rounded-lg`}
                onChange={(e) => {
                  e.stopPropagation();
                  setCommentText(e.target.value);
                }}
              />
              <button className={`cursor-pointer`} onClick={createComment}>
                <FaArrowCircleRight />
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}
