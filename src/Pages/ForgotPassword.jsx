import React, { useState } from "react";
import Input from "../Components/Input";

export default function ForgotPassword() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("Email: ", email);

    try {
      setSubmitting(true);
      const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/forgot-password`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
      });

      const data = await response.json();

      console.log("Data: ", data);
    } catch (error) {
        console.log("Error: ", error.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="h-screen flex justify-center items-center px-5 sm:px-10">
      <div className="shadow-md px-3 sm:px-10 py-5 rounded-lg max-w-[800px] flex-1 flex items-center flex-col sm:flex-row bg-(--bg) gap-8">
        <div className="">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/006/867/161/small/secure-login-reset-password-conceptual-icon-in-gradient-style-vector.jpg"
            alt=""
          />
        </div>
        <div className="flex-1 min-w-[270px]">
          <form action="">
            <Input
              id={"email"}
              label={"Email"}
              error={errors.email}
              type={"email"}
              placeholder={"Enter your registered email"}
              value={email}
              handler={(e) => setEmail(e.target.value)}
            />
            <button
              className={`shadow-sm hover:shadow-md ${
                submitting ? "bg-blue-400/50" : "bg-blue-400"
              } text-white rounded-md px-4 py-2 mt-5 cursor-pointer disabled:cursor-not-allowed`}
              onClick={handleSubmit}
              disabled={submitting}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
