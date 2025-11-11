import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import ButtonSpinner from "../Components/ButtonSpinner";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseErrors, setResponseErrors] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("loggin in");

    const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/login`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: loginData.email,
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const data = await response.json();
      console.log("Data: ", data);

      if (data.statusCode >= 400) {
        setResponseErrors(data.message);
      } else {
        console.log("user: ", data.data.user);
        setUser(data.data.user);
        navigate("/");
      }
      setLoginData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Error while loggin in user: ", error.message);
      // throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="h-screen px-6 bg-(--bg-body)">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full block"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 relative">
            <form>
              {/* <!-- Email input --> */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-(--text)"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => {
                    setLoginData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                    setResponseErrors("");
                  }}
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-800 dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* <!--Password input--> */}
              <div className="mb-16">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-(--text)"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => {
                    setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                    setResponseErrors("");
                  }}
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-800 dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6 flex items-center justify-between">
                {/* <!-- Remember me checkbox --> */}
                <div className="mb-0.5 block min-h-6 pl-6">
                  <input
                    className="relative float-left -ml-6 mr-1.5 mt-[0.15rem] h-4.5 w-4.5 appearance-none rounded-sm border-2 border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-600 checked:bg-blue-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-1 checked:after:block checked:after:h-3.25 checked:after:w-1.5 checked:after:rotate-45 checked:after:border-2 checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-1 focus:after:block focus:after:h-3.5 focus:after:w-3.5 focus:after:rounded-xs focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-1 checked:focus:after:h-3.25 checked:focus:after:w-1.5 checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-2 checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-blue-600 dark:checked:bg-blue-600 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value=""
                    id="exampleCheck2"
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer text-(--text)"
                    htmlFor="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div>

                {/* <!--Forgot password link--> */}
                <Link
                  to={"/forgot-password"}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/*  Response Errors  */}
              {responseErrors && (
                <p className="text-red-600 text-sm bottom-32 absolute -mt-3">
                  {responseErrors}
                </p>
              )}

              {/* <!-- Login button --> */}
              <div className="text-center py-6 lg:text-left">
                <button
                  type="button"
                  className={`inline-block rounded ${
                    loading ? "bg-blue-600 opacity-70" : "bg-blue-600"
                  } px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] cursor-pointer`}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ButtonSpinner />
                  ) : (
                    "Login"
                  )}
                </button>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-(--text)">
                  Don't have an account?{" "}
                  <Link
                    to={"/sign-up"}
                    className="text-red-600 transition duration-150 ease-in-out hover:text-red-700 focus:text-red-700 active:text-red-800"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
