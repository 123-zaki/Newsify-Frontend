import { createContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [category, setCategory] = useState("general");

  return (
    <CategoryContext.Provider value={[category, setCategory]}>
      {children}
    </CategoryContext.Provider>
  );
}
