import React from "react";
import { Link, useNavigate } from "react-router-dom";

function UserHeader() {
  const navigate = useNavigate();
  const logout = () => {
    // Clear session storage and token (adjust this based on your actual implementation)
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");

    // Navigate to the "/signin" route
    navigate("/");
  };
  return (
    <div>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt=""
                className="w-[60px] h-[60px]"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <div className="relative"></div>
            <Link
              to="/todo"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              My Tasks
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div
              href="/"
              className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
              onClick={logout}
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default UserHeader;
