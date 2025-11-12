import React, { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpModal({
  openSignUp: isOpen,
  setOpenSignUp: setIsOpen,
  setOpenLogin,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});
  const [signingUp, setSigningUp] = useState(false);

  const navigate = useNavigate();

  function isAtLeast12YearsOld(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 12;
    }
    return age >= 12;
  }

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
    console.log(formData);
    const validationResult = validateForm(formData);
    console.log("validation result: ", validationResult);
    if (Object.entries(validationResult).length) {
      return;
    }

    try {
      setSigningUp(true);
      const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          mobileNumber: formData.mobileNumber,
          dateOfBirth: formData.dateOfBirth,
        }),
      });

      const data = await response.json();

      console.log("Data: ", data);
      const user = data?.data?.user;

      navigate("/login");

      alert(`${data.message}, Please login now`);
    } catch (error) {
      console.log("Error in registering user: ", error.message);
    } finally {
      setSigningUp(false);
    }
    // setFormData({
    //   username: "",
    //   email: "",
    //   password: "",
    //   mobileNumber: "",
    //   dateOfBirth: "",
    // });
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={"Sign Up"}
      content={
        <form action="">
          <Input
            id={"username"}
            error={errors.username}
            value={formData.username}
            label={"Username"}
            type={"text"}
            placeholder={"Enter Username..."}
            handler={(e) => {
              setFormData({ ...formData, username: e.target.value });
              setErrors({});
            }}
          />

          <Input
            id={"email"}
            error={errors.email}
            value={formData.email}
            label={"Email"}
            type={"email"}
            placeholder={"Enter Your Email..."}
            handler={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({});
            }}
          />

          <Input
            id={"password"}
            error={errors.password}
            value={formData.password}
            label={"Password"}
            type={"password"}
            placeholder={"Enter Password..."}
            handler={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({});
            }}
          />

          <Input
            id={"mobile"}
            error={errors.mobileNumber}
            value={formData.mobileNumber}
            label={"Mobile Number"}
            type={"tel"}
            placeholder={"Enter Your Mobile Number..."}
            handler={(e) => {
              setFormData({ ...formData, mobileNumber: e.target.value });
              setErrors({});
            }}
          />

          <Input
            id={"dob"}
            error={errors.dateOfBirth}
            value={formData.dateOfBirth}
            label={"Date Of Birth"}
            type={"date"}
            placeholder={"Enter Your Date Of Birth..."}
            handler={(e) => {
              setFormData({ ...formData, dateOfBirth: e.target.value });
              setErrors({});
            }}
          />

          <div className="flex justify-center">
            <button
      type="submit"
      onClick={handleSubmit}
      disabled={signingUp}
      className={`flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60`}
      aria-busy={signingUp || undefined}
    >
      {signingUp && (
        <svg
          className="w-4 h-4 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      )}

      <span>{signingUp ? "Submitting…" : "Sign up"}</span>

      {/* Visually hidden status for screen readers */}
      {signingUp && <span className="sr-only">Submitting your registration</span>}
    </button>
          </div>
        </form>
      }
      footer={
        <p>
          Already have an account?{" "}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              setErrors({});
              setOpenLogin(true);
            }}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </button>
        </p>
      }
      setErrors={setErrors}
    />
  );
}
