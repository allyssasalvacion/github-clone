import React from "react";
import { useQuery, gql } from "@apollo/client";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { Menu, Popover } from "@headlessui/react";

const GET_USER = gql`
  query {
    user(login: "allyssasalvacion") {
      avatarUrl
    }
  }
`;

function Header() {
  const { data } = useQuery(GET_USER);

  return (
    <Popover className="relative bg-gray-800 border-b-2 border-gray-100">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-center lg:justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start items-center space-x-6">
            <div className="flex justify-start space-x-6">
              <a
                className="Header-link "
                href="https://github.com/"
                data-hotkey="g d"
                aria-label="Homepage"
                data-turbo="false"
                data-analytics-event='{"category":"Header","action":"go to dashboard","label":"icon:logo"}'
              >
                <svg
                  height="32"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="32"
                  data-view-component="true"
                  className="fill-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
              </a>
              <input
                type="text"
                name="find-a-repo"
                id="find-a-repo"
                placeholder="Search or jump to..."
                className="hidden lg:block text-sm px-3 py-[3px] shadow-sm sm:text-sm border-gray-100 border-[1px] rounded-md bg-transparent w-72 text-white"
              />
            </div>
            <Popover.Group as="nav" className="hidden lg:flex space-x-10">
              <a
                href="facebook.com"
                className="text-base font-medium text-white hover:text-gray-200"
              >
                Pull requests
              </a>
              <a
                href="facebook.com"
                className="text-base font-medium text-white hover:text-gray-200"
              >
                Issues
              </a>
              <a
                href="facebook.com"
                className="text-base font-medium text-white hover:text-gray-200"
              >
                Marketplace
              </a>
              <a
                href="facebook.com"
                className="text-base font-medium text-white hover:text-gray-200"
              >
                Explore
              </a>
            </Popover.Group>
          </div>
          <div className="hidden lg:flex items-center justify-end md:flex-1 lg:w-0 space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex justify-center items-center w-full text-sm font-medium text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <ChevronDownIcon
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
            </Menu>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex justify-center items-center w-full text-sm font-medium text-white">
                  <img
                    className="rounded-full w-6 h-6 object-cover"
                    src={data && data.user.avatarUrl}
                    alt=""
                  />
                  <ChevronDownIcon
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </Popover>
  );
}

export default Header;
