import React from "react";
import { Tab } from "@headlessui/react";

import Container from "../components/Container";
import Filters from "../components/Filters";
import Repositories from "../components/Repositories";
import Sidebar from "../components/Sidebar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Profile() {
  let tabs = ["Overview", "Repositories", "Projects", "Packages", "Stars"];

  return (
    <Container>
      <div className="relative bg-white py-6 mb-20">
        <div className="border-b border-gray-400">
          <Tab.Group defaultIndex={1}>
            <Tab.List className="flex space-x-2 items-center justify-center">
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    classNames(
                      "flex gap-2 justify-center items-center px-4 py-2.5 text-md leading-8 font-normal text-gray-700 rounded-none w-auto",
                      selected
                        ? "border-b-2 border-red-400 font-semibold"
                        : "hover:text-gray-500"
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                  {tab}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-8 gap-10">
            <div className="col-span-2">
              <Sidebar />
            </div>
            <div className="col-span-6 border-b border-gray-400">
              <Filters />
              <Repositories />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
