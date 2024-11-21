import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col items-center min-h-[90vh] bg-indigo-100">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 mt-10">
        Admin Panel
      </h1>
      <div className="flex flex-col sm:flex-row gap-6">
      <button
          className="px-4 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => navigate("/manage-questions")}
        >
          Manage Questions
        </button>
        <button
          className="px-4 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => navigate("/manage-users")}
        >
          Manage Users
        </button>
      </div>
    </div>
  );
};

export default Admin;

