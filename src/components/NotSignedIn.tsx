import * as React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router';

const NotSignedIn = () => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 hover:from-blue-100 hover:via-purple-100 hover:to-pink-100 border border-gray-200/50 hover:border-blue-300/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <FaUserCircle className='w-7 h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200' />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {open && (
        <div className="absolute bg-white/95 backdrop-blur-xl right-0 mt-3 w-64 rounded-3xl shadow-2xl border border-gray-100/50 py-3 z-50 transform transition-all duration-300 ease-out scale-100 opacity-100">
          <div className="px-4 py-2 border-b border-gray-100/50">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Jib Stores
            </h3>
            <p className="text-sm text-gray-500">Sign in to access your account</p>
          </div>
          
          <div className="py-2">
            <Link
              to="/login"
              onClick={handleClose}
              className="flex items-center px-6 py-4 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 rounded-xl flex items-center justify-center mr-4 transition-all duration-200">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">Sign In</p>
                <p className="text-xs text-gray-500 group-hover:text-blue-500">Access your account</p>
              </div>
            </Link>
            
            <Link
              to="/register"
              onClick={handleClose}
              className="flex items-center px-6 py-4 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-200 group-hover:from-purple-200 group-hover:to-pink-300 rounded-xl flex items-center justify-center mr-4 transition-all duration-200">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">Sign Up</p>
                <p className="text-xs text-gray-500 group-hover:text-purple-500">Create new account</p>
              </div>
            </Link>
          </div>
          
          <div className="px-6 py-3 border-t border-gray-100/50">
            <p className="text-xs text-gray-500 text-center">
              Join thousands of happy customers
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotSignedIn