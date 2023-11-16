import React, { useState, useRef, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const LOGIN_URL = "/token/";

function Login(): JSX.Element {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      };
      console.log(user);
      const { data } = await axios.post(LOGIN_URL, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(data));
      const accessToken = data?.access;
      const refreshToken = data?.refresh;
      setAuth({ accessToken, refreshToken });
      console.log(auth);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.message);
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 max-w-4xl mx-auto">
      <h1 className="mx-auto w-full text-center text-5xl">🫱🏼‍🫲🏿</h1>
      <h2 className="m-10 text-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-white">
        Sign in to your account
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto flex flex-col gap-5 items-left text-2xl sm:text-3xl"
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            ref={usernameRef}
            placeholder="Enter your username"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white "
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Enter your password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white"
            ref={passwordRef}
          />
        </div>

        <button
          type="submit"
          className="w-full mx-auto rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
