import React, { useEffect, useState } from "react";

import Logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/productSlice";

function Navbar({ setSearchText }) {
  const dispatch = useDispatch();

  const dropDown = [
    "Select Category",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const [data, setData] = useState();
  const [seletedCategory, setSeletedCategory] = useState("Select Category");

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("userData"));
    setData(localStorageData);
  }, []);

  const categoryData = (data) => {
    setSeletedCategory(data);
    if (data === "Select Category") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProducts(data));
    }
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 h-[50px]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a className="flex items-center" onClick={() => navigate("/")}>
            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          </a>
          <div className="flex items-center lg:order-2">
            {location.pathname !== "/product" ? (
              <>
                <a
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Login
                </a>
                <a
                  onClick={() => navigate("/SignUp")}
                  className=" cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Sign up
                </a>
              </>
            ) : (
              <>
                <a
                  onClick={() => navigate("/")}
                  className=" cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Log out
                </a>
                <a
                  style={{ fontWeight: "bolder" }}
                  className="cursor-pointer block py-1 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {data?.fullName}
                </a>
              </>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                {location.pathname === "/product" && (
                  <input
                    name="title"
                    onChange={(e) => setSearchText(e.target.value)}
                    id="Search"
                    className="mb-  text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="Search Product"
                  />
                )}
              </li>
              <li>
                <script src="//unpkg.com/alpinejs" defer></script>

                {location.pathname === "/product" && (
                  <div
                    onClick={() => setShowDropDown(!showDropDown)}
                    className="relative inline-block text-left w-64 "
                    x-data="{ open: false }"
                  >
                    <button className="h-[40px] w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded inline-flex justify-between items-center dark:bg-[#20293A] dark:border-slate-700 dark:text-gray-400">
                      <span>
                        {seletedCategory?.toLocaleUpperCase() ||
                          "Select Category"}
                      </span>

                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>

                    {showDropDown && (
                      <div
                        x-show="open"
                        className="absolute z-50 mt-2 w-full rounded-md   shadow-lg bg-white border border-gray-200 dark:bg-[#20293A] dark:border-slate-700"
                      >
                        <div
                          className="py-1 text-gray-700 dark:text-gray-400 text-sm"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {dropDown?.map((item) => {
                            return (
                              <a
                                onClick={() => categoryData(item)}
                                className="block px-4 py-2  hover:bg-gray-100 dark:hover:bg-[#161d2a]"
                                role="menuitem"
                              >
                                {item?.toLocaleUpperCase()}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
              <li>
                <a
                  onClick={() => navigate("/addProduct")}
                  className="mt-2 cursor-pointer block py-1 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Add Product
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
