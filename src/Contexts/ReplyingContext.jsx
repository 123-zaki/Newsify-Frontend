import { createContext, useState } from "react";

export const ReplyContext = createContext();

export function ReplyProvider({ children }) {
  const [replyingComment, setReplyingComment] = useState(null);

  return (
    <ReplyContext.Provider value={{ replyingComment, setReplyingComment }}>
      {children}
    </ReplyContext.Provider>
  );
}
