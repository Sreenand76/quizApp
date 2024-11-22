import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser ,FaCog } from 'react-icons/fa';
import { useAuth } from '../Auth/AuthProvider';

const Navbar = () => {
  const { state, handleLogin, handleLogout } = useAuth();
  const { isLoggedIn } = state;
  const userRole = localStorage.getItem("role");
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };
  
  useEffect(() => {
    setShowAccount(false);
  }, [isLoggedIn]);

  return (
    <nav className="bg-indigo-700 bg-opacity-80 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">        
        <Link to="/" className="flex items-center space-x-2 text-gray-200 font-semibold text-2xl">
          <div className='bg-gradient-to-r from-slate-100 to-pink-500 bg-clip-text text-transparent  text-3xl font-bold transition-all duration-300 hover:opacity-100'>Quizmo</div>
        </Link>
        {/* Account Dropdown */}
        <div className="relative">
        
          <button
            onClick={handleAccountClick}
            className="text-gray-200 flex items-center space-x-2 hover:text-gray-400 transition-all duration-300"
          >
            <span>Account</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${showAccount ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showAccount && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-50 rounded-lg shadow-xl p-2">
              <ul className="space-y-2">
                {!isLoggedIn ? (
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200"
                      onClick={() => {
                        handleLogin();
                        handleAccountClick();
                      }}
                    >
                      <FaSignInAlt className="inline mr-2" />
                      Login
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200"
                      >
                        <FaUser className="inline mr-2" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      {isLoggedIn && userRole === 'ROLE_ADMIN' && (
                        <Link to="/admin" className="text-gray-700 hover:bg-gray-200 transition-all duration-200">
                          <FaCog className='inline ml-4 mr-2'/>
                          Admin Panel
                        </Link>
                      )}
                    </li>
                    <li>
                      <Link
                        to={"/logout"}
                        onClick={handleAccountClick}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200"
                      >
                        <FaSignOutAlt className="inline mr-2" /> Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;






