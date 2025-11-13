import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "../Components/DatePicker";
import { AuthContext } from "../Contexts/AuthContext";

export default function SignUp() {
  const dobRef = useRef(null);
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
  });
  const [signingUp, setSigningUp] = useState(false);
  const [errors, setErrors] = useState({});
  const [responseErrors, setResponseErrors] = useState("");

  const { refreshAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const validationRule = {
    username: [
      { required: true, message: "Username is required" },
      { minLength: 3, message: "Username must be at least 3 characters long" },
      { maxLength: 20, message: "Username must be less than 20 characters" },
      // {validUsername: true, message: "Please enter a valid username"}
    ],
    email: [
      { required: true, message: "Email is required" },
      {
        validEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Please enter a valid email",
      },
    ],
    password: [
      { required: true, message: "Password is required" },
      {
        validPassword:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        message:
          "Password must include uppercase, lowercase, number, and special character (8–20 chars).",
      },
    ],
    mobileNumber: [
      {
        validMobileNumber: /^(?:\+91[-\s]?|91[-\s]?|0)?[6-9]\d{9}$/,
        message: "Please enter a valid mobile number",
      },
    ],
    dateOfBirth: [
      { required: true, message: "Date Of Birth is required" },
      {
        minAge: 12,
        message:
          "Please enter a valid Date Of Birth, (user should be at least 12 years old)",
      },
    ],
  };

  function validateForm(form_Data) {
    const validationResult = {};
    Object.entries(form_Data).forEach(([key, value]) => {
      if (key === "mobileNumber") {
        // console.log("req: ", Object.values(validationRule[key][0]));
        if (value && !Object.values(validationRule[key][0])[0].test(value)) {
          validationResult[`${key}_valid`] = Object.values(
            validationRule[key][0]
          )[1];
          setErrors((prev) => ({
            ...prev,
            mobileNumber: Object.values(validationRule[key][0])[1],
          }));
        }
      } else if (validationRule[key]) {
        validationRule[key].some((rule) => {
          // console.log("Rule: ", rule);
          // console.log("Message: ", rule.message);
          if (rule.required && !value) {
            validationResult[`${key}_required`] = rule.message;
            setErrors((prev) => ({ ...prev, [key]: rule.message }));
            return true;
          }

          if (rule.minLength && value.length < rule.minLength) {
            validationResult[`${key}_minLength`] = rule.message;
            setErrors((prev) => ({ ...prev, [key]: rule.message }));
            return true;
          }

          if (rule.maxLength && value.length > rule.maxLength) {
            validationResult[`${key}_maxLength`] = rule.message;
            setErrors((prev) => ({ ...prev, [key]: rule.message }));
            return true;
          }

          if (rule.validEmail && !rule.validEmail.test(value)) {
            validationResult[`${key}_valid`] = rule.message;
            setErrors((prev) => ({ ...prev, [key]: rule.message }));
            return true;
          }

          if (rule.validDOB && !rule.validDOB.test(value)) {
            validationResult[`${key}_valid`] = rule.message;
            setErrors((prev) => ({ ...prev, [key]: rule.message }));
            return true;
          }

          if (rule.validMobileNumber && !rule.validMobileNumber.test(value)) {
            validationResult[`${key}_valid`] = rule.message;
            setErrors((prev) => ({ ...prev, [key]: rule.message }));
            return true;
          }

          if (rule.validPassword && !rule.validPassword.test(value)) {
            validationResult[`${key}_valid`] = rule.message;
            setErrors((prev) => ({ ...prev, [key]: rule.message }));
            return true;
          }

          if (rule.minAge && !isAtLeast12YearsOld(value)) {
            validationResult[`${key}_minAge`] = rule.message;
            setErrors((prev) => ({ ...prev, [key]: rule.message }));
            return true;
          }
        });
      }
    });

    return validationResult;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("Registration Data: ", registrationData);

    const validationResult = validateForm(registrationData);
    if (Object.entries(validationResult).length) {
      return;
    }

    try {
      setSigningUp(true);
      const url = `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/api/v1/auth/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({
          username: registrationData.username,
          email: registrationData.email,
          password: registrationData.password,
          mobileNumber: registrationData.mobileNumber,
          dateOfBirth: registrationData.dateOfBirth,
        }),
      });

      if (data.statusCode >= 400) {
        setResponseErrors(data.message);
      } else {
        console.log("user: ", data.data.user);
        setRegistrationData({
          username: "",
          email: "",
          password: "",
          mobileNumber: "",
          dateOfBirth: "",
        });

        localStorage.setItem('jwtToken', data?.data?.token);

        await refreshAuth();

        navigate("/");
      }
    } catch (error) {
      console.log("Error signing up: ", error.message);
    } finally {
      // ensure button is re-enabled after request finishes
      setSigningUp(false);
    }
  }
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
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              {/* <!--Username input--> */}
              <div className="mb-6 relative mt-10">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-(--text)"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={registrationData.username}
                  onChange={(e) =>
                    setRegistrationData((prev) => {
                      setErrors({});
                      return { ...prev, username: e.target.value };
                    })
                  }
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-md text-neutral-800 bg-slate-200 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm absolute top-17">
                  {errors.username}
                </p>
              </div>

              {/* <!-- Email input --> */}
              <div className="mb-6 relative mt-10">
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
                  value={registrationData.email}
                  onChange={(e) =>
                    setRegistrationData((prev) => {
                      setErrors({});
                      return { ...prev, email: e.target.value };
                    })
                  }
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-md text-neutral-800 bg-slate-200 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm absolute top-17">
                  {errors.email}
                </p>
              </div>

              {/* <!--Password input--> */}
              <div className="mb-6 relative mt-10">
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
                  value={registrationData.password}
                  onChange={(e) =>
                    setRegistrationData((prev) => {
                      setErrors({});
                      return { ...prev, password: e.target.value };
                    })
                  }
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-md bg-slate-200 text-neutral-80 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm absolute top-17">
                  {errors.password}
                </p>
              </div>

              {/* <!--Mobile Number input--> */}
              <div className="mb-6 relative mt-10">
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-(--text)"
                >
                  Mobile No.
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={registrationData.mobileNumber}
                  onChange={(e) =>
                    setRegistrationData((prev) => {
                      setErrors({});
                      return { ...prev, mobileNumber: e.target.value };
                    })
                  }
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-md bg-slate-200 text-neutral-800 dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm absolute top-17">
                  {errors.mobileNumber}
                </p>
              </div>

              {/* <!--Date Of Birth input--> */}
              <div className="mb-6 relative mt-10">
                <label
                  htmlFor="dob"
                  className="block mb-2 text-sm font-medium text-(--text)"
                >
                  Date Of Birth
                </label>
                <DatePicker
                  id="dob"
                  name="dob"
                  value={registrationData.dateOfBirth}
                  options={{
                    dateFormat: "Y-m-d",
                    maxDate: "today",
                    allowInput: true,
                  }}
                  onChange={(selectedDates, dateStr) =>
                    setRegistrationData((prev) => {
                      setErrors({});
                      return { ...prev, dateOfBirth: dateStr };
                    })
                  }
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-md bg-slate-200 text-neutral-800 dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="YYYY-MM-DD"
                />
                <p className="text-red-500 text-sm absolute top-17">
                  {errors.dateOfBirth}
                </p>
              </div>

              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left py-6 mt-20">
                <button
                  type="button"
                  disabled={signingUp ? true : false}
                  aria-busy={signingUp}
                  className="inline-block cursor-pointer rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                  onClick={handleSubmit}
                >
                  {signingUp ? "Registering..." : "Register"}
                </button>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-(--text)">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="text-red-600 transition duration-150 ease-in-out hover:text-red-700 focus:text-red-700 active:text-red-800"
                  >
                    Login
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
