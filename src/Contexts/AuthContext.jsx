import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/me`;

    console.log("Checking auth");

    try {
      setAuthLoading(true);
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        // console.log("Checking login")
        const data = await response.json();
        // console.log("Data: ", data.data);
        setUser(data?.data ?? null);
      } else {
        setUser(null);
        console.warn("Auth cheking failed: ", response);
      }
    } catch (error) {
      console.log("Error cheking login: ", error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    // Do not use async directly on useEffect; define an inner async function.

    checkAuth();
  }, []);

  async function Logout() {
    const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/logout`;

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(null);
    } catch (error) {
      console.log("Error logging out user: ", error.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authLoading,
        user,
        setUser,
        setAuthLoading,
        Logout,
        refreshAuth: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
