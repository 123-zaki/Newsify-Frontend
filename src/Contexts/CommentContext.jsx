import { createContext, useState } from "react";

export const CommentContext = createContext();

export function CommentProvider({ children }) {
  const [openComment, setOpenComment] = useState(false);

  return (
    <CommentContext.Provider value={{ setOpenComment, openComment }}>
      {children}
    </CommentContext.Provider>
  );
}
