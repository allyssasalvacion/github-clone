import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USER = gql`
  query {
    user(login: "allyssasalvacion") {
      avatarUrl
      bio
      name
      login
      followers {
        totalCount
      }
      following {
        totalCount
      }
      location
      websiteUrl
    }
  }
`;

function Sidebar() {
  const { data } = useQuery(GET_USER);

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="flex lg:flex-col flex-row lg:gap-0 gap-6 lg:mt-0 mt-6">
          <img
            className="rounded-full lg:w-full w-32 h-auto lg:-mt-10 object-cover border
        border-gray-400 bg-white"
            src={data && data.user.avatarUrl}
            alt=""
          />
          <div>
            <h1 className="mt-6 font-bold text-2xl text-gray-800">
              {data && data.user.name}
            </h1>
            <p className="mt-0 text-gray-600 text-xl">
              {data && data.user.login}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-lg mt-5">{data && data.user.bio}</p>
        <a
          href="facebook.com"
          className="flex items-center justify-center px-4 py-[5px] rounded-md mt-6 font-medium bg-gray-100 hover:bg-gray-200 border border-gray-400 w-auto text-sm"
        >
          Edit Profile
        </a>
        <div className="flex items-center mt-5 space-x-1">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span className="font-bold pr-1">
            {data && data.user.followers.totalCount}
          </span>
          followers •
          <span className="font-bold pr-1">
            {data && data.user.following.totalCount}
          </span>
          following
        </div>
        <p className="flex items-center gap-2 mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {data && data.user.location}
        </p>
        <p className="flex items-center gap-2 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <a
            href={data && data.user.websiteUrl}
            target="_blank"
            className="hover:text-blue-600 hover:underline"
            rel="noreferrer"
          >
            {data && data.user.websiteUrl}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
