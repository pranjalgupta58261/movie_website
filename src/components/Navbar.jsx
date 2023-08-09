import { React, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BsList, BsX } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllMovies } from "../features/movies/moviesSlice";

const navigation = [
  { name: "Popular", href: "/movies/popular", current: false },
  { name: "Top Rated", href: "/movies/top_rated", current: false },
  { name: "Upcoming", href: "/movies/upcoming", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const movies = useSelector(getAllMovies);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (search != "") {
        navigate(`/search/movie/${search}`);
        setSearch("");
      }
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white z-20">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <BsX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BsList className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="cursor-pointer">
                    <img
                      className="h-8 w-auto md-hidden md-ml-3"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* SEarch */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <input
                      type="text"
                      id="email-adress-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 mt-2 md:mt-0 md:text-lg md:mr-5 md:ml-5"
                      placeholder="Search..."
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={handleKeyDown}
                      value={search}
                    />
                  </div>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button
                key="Home"
                as="a"
                href="/"
                className={classNames(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                Home
              </Disclosure.Button>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
