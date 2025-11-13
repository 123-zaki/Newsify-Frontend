import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { CategoryProvider } from "./Contexts/CategoryContext.jsx";
import { ThemeProvider } from "./Contexts/ThemeContext.jsx";
import { SearchProvider } from "./Contexts/SearchContext.jsx";
import Article from "./Pages/Article.jsx";
import Error from "./Components/Error";
import Profile from "./Pages/Profile.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import { ProfileMenuProvider } from "./Contexts/ProfileMenuContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { CommentProvider } from "./Contexts/CommentContext.jsx";
import { CommentNewsProvider } from "./Contexts/CommentNewsContext.jsx";
import { ReplyProvider } from "./Contexts/ReplyingContext.jsx";
import { DashboardHamburgerProvider } from "./Contexts/DashboardHamburgerContext.jsx";
import { UploadNewsProvider } from "./Contexts/UploadNewsContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <CategoryProvider>
          <UploadNewsProvider>
            <DashboardHamburgerProvider>
              <ReplyProvider>
                <CommentProvider>
                  <CommentNewsProvider>
                    <ThemeProvider>
                      <SearchProvider>
                        <ProfileMenuProvider>
                          <App />
                        </ProfileMenuProvider>
                      </SearchProvider>
                    </ThemeProvider>
                  </CommentNewsProvider>
                </CommentProvider>
              </ReplyProvider>
            </DashboardHamburgerProvider>
          </UploadNewsProvider>
        </CategoryProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "article/:id",
        element: <Article />,
        errorElement: (
          <>
            <div className="flex flex-col justify-center items-center h-screen">
              <div className="max-w-96 shadow-xl rounded-lg hover:shadow-2xl hover:rounded-br-2xl hover:rounded-tl-2xl p-3 bg-(--bg)">
                <h1 className="text-2xl font-semibold text-(--text) mb-4">
                  404 - Page Not Found
                </h1>
                <p className="text-(--text)">
                  This article page does not exist, you have arrived on a wrong
                  url
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <CategoryProvider>
          <ThemeProvider>
            <SearchProvider>
              <Login />
            </SearchProvider>
          </ThemeProvider>
        </CategoryProvider>
      </AuthProvider>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <AuthProvider>
        <CategoryProvider>
          <ThemeProvider>
            <SearchProvider>
              <SignUp />
            </SearchProvider>
          </ThemeProvider>
        </CategoryProvider>
      </AuthProvider>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthProvider>
        <ThemeProvider>
          <ForgotPassword />
        </ThemeProvider>
      </AuthProvider>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
