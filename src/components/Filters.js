import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { Menu } from "@headlessui/react";

function Filters() {
  return (
    <div className="flex items-center my-5 space-x-5">
      <input
        type="text"
        name="find-a-repo"
        id="find-a-repo"
        placeholder="Find a repository..."
        className="text-sm px-3 py-[5px] block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md"
      />
      <div className="flex items-center space-x-2 text-gray-700">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex justify-center items-center w-full px-4 py-[5px] text-sm font-medium bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-md">
              Type
              <ChevronDownIcon
                className="w-4 h-4 ml-2 -mr-1 text-gray-800"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
        </Menu>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex justify-center items-center w-full px-4 py-[5px] text-sm font-medium bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-md">
              Language
              <ChevronDownIcon
                className="w-4 h-4 ml-2 -mr-1 text-gray-800"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
        </Menu>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex justify-center items-center w-full px-4 py-[5px] text-sm font-medium bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-md">
              Sort
              <ChevronDownIcon
                className="w-4 h-4 ml-2 -mr-1 text-gray-800"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
        </Menu>
      </div>
      <a
        href="facebook.com"
        className="flex items-center justify-center px-4 py-[5px] border rounded-md text-white bg-green-600 border-green-600 hover:bg-green-700 gap-2 w-auto text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        New
      </a>
    </div>
  );
}

export default Filters;
