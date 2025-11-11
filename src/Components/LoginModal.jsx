import React, { useContext, useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import ButtonSpinner from "./ButtonSpinner";
import { AuthContext } from "../Contexts/AuthContext";

export default function LoginModal({
  openLogin: isOpen,
  setOpenLogin: setIsOpen,
  setOpenSignUp
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [responseErrors, setResponseErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const {setUser} = useContext(AuthContext);

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
            value={formData.username}
            label={"Username"}
            type={"text"}
            placeholder={"Enter Username..."}
            handler={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <Input
            id={"login-email"}
            value={formData.email}
            label={"Email"}
            type={"email"}
            placeholder={"Enter Your Email..."}
            handler={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            id={"login-password"}
            value={formData.password}
            label={"Password"}
            type={"password"}
            placeholder={'Enter Password...'}
            handler={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <div className="flex justify-center">
            <button
              className="py-1 px-4 rounded-md shadow-xs hover:shadow-md font-semibold bg-(--bg) text-(--text) mt-3 cursor-pointer"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <ButtonSpinner /> : 'Login'}
            </button>
          </div>
        </form>
      }
      footer={
        <p>
          Don't have an account?{" "}
          <button onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
            setOpenSignUp(true);
          }} className="text-blue-500 hover:underline cursor-pointer">
            Create New
          </button>
        </p>
      }
      setErrors={setErrors}
    />
  );
}
