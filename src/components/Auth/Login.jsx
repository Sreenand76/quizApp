import React, { useContext, useState } from "react";
import { loginUser } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from 'react-toastify';
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    console.log(success)
    if (success) {
      const token = success.token;
      handleLogin(token);
      navigate("/");
      toast.success(`Login successfull`)
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <div className="flex  justify-center min-h-[90vh] bg-gray-200">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 mx-4 max-h-[53vh] mt-20">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMessage}
          </div>
        )}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={login.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={login.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mt-3"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
          </span>
          <Link
            to="/register"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
