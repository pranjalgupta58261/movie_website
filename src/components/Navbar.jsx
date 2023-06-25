import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/movie/${search}`);
      setSearch("");
    }
  };

  return (
    <header>
      <nav className="border-gray-200 px-2 mb-3">
        <div className="container mx-auto flex flex-wrap items-center align-center justify-between w-100 pt-3 pr-2">
          <Link to="/" className="flex">
            <img
              className="w-10 h-10 mr-3 md:w-20 lg:w-20 lg:h-15 logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="Icon"
            />
          </Link>
          <div className="relative ml-auto mr-auto md:flex md:items-center md:justify-end flex-grow">
            <input
              type="text"
              id="email-adress-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mt-2 md:mt-0 md:text-lg md:mr-10 md:ml-10"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              value={search}
            />
          </div>

          <div>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-8 h-8 ${
                  isMobileMenuOpen ? "hidden" : ""
                } text-white`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`w-8 h-8 ${
                  isMobileMenuOpen ? "" : "hidden"
                } text-white`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "" : "hidden"
            } md:flex justify-between items-center w-full md:w-auto md:order-1`}
            id="mobile-menu-3"
          >
            <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-lg md:font-medium">
              <li>
                <Link
                  to="/movies/popular"
                  className="text-white-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                >
                  Popular
                </Link>
              </li>
              <li>
                <Link
                  to="/movies/top_rated"
                  className="text-white-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  to="/movies/upcoming"
                  className="text-white-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                >
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
