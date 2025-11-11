import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <SearchContext.Provider value={[openSearch, setOpenSearch]}>
      {children}
    </SearchContext.Provider>
  );
}
