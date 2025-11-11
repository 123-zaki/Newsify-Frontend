import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDark')) ?? false);

  useEffect(() => {
    const root = document.documentElement;
    // console.log(root);
    if(isDark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    localStorage.setItem('isDark', JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeContext.Provider value={[isDark, setIsDark]}>
      {children}
    </ThemeContext.Provider>
  );
}
