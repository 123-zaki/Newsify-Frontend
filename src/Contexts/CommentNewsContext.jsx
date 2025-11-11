import { createContext, useState } from "react";

export const CommentNewsContext = createContext();

export function CommentNewsProvider({ children }) {
  const [newsToSeeComment, setNewsToSeeComment] = useState(null);
  const [existingIndComments, setExistingIndComments] = useState([]);
  const [newIndComments, setNewIndComments] = useState([]);
  const [existingChildComments, setExistingChildComments] = useState([]);
  const [newChildComments, setNewChildComments] = useState([]);

  return (
    <CommentNewsContext.Provider
      value={{
        newsToSeeComment,
        setNewsToSeeComment,
        existingIndComments,
        setExistingIndComments,
        newIndComments,
        setNewIndComments,
        existingChildComments,
        setExistingChildComments,
        newChildComments,
        setNewChildComments,
      }}
    >
      {children}
    </CommentNewsContext.Provider>
  );
}
