import React, { useContext, useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import ButtonSpinner from "./ButtonSpinner";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({
  openLogin: isOpen,
  setOpenLogin: setIsOpen,
  setOpenSignUp,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [responseErrors, setResponseErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { setUser } = useContext(AuthContext);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("loggin in");

    const validationResult = validateForm(formData);
    if (Object.entries(validationResult).length) {
      return;
    }

    const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/login`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
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
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Error while loggin in user: ", error.message);
      // throw error;
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={"LogIn Modal"}
      content={
        <form action="">
          <Input
            id={"login-username"}
            error={errors.username}
            value={formData.username}
            label={"Username"}
            type={"text"}
            placeholder={"Enter Username..."}
            handler={(e) => {
              setErrors({});
              setFormData({ ...formData, username: e.target.value });
            }}
          />
          <Input
            id={"login-email"}
            value={formData.email}
            error={errors.email}
            label={"Email"}
            type={"email"}
            placeholder={"Enter Your Email..."}
            handler={(e) => {
              setErrors({});
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <Input
            id={"login-password"}
            value={formData.password}
            label={"Password"}
            error={errors.password}
            type={"password"}
            placeholder={"Enter Password..."}
            handler={(e) => {
              setErrors({});
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <div className="flex justify-center">
            <button
              className="py-1 px-4 rounded-md shadow-xs hover:shadow-md font-semibold bg-blue-600 text-white mt-10 cursor-pointer"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <ButtonSpinner /> : "Login"}
            </button>
          </div>
        </form>
      }
      footer={
        <>
          {responseErrors && (
            <p className="text-red-600 text-sm bottom-32 -mt-3">
              {responseErrors}
            </p>
          )}
          <p className="mt-6">
            Don't have an account?{" "}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setOpenSignUp(true);
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Create New
            </button>
          </p>
        </>
      }
      setErrors={setErrors}
    />
  );
}
