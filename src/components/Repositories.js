import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query getRepositories {
    viewer {
      repositories(first: 100) {
        nodes {
          name
          description
          visibility
          primaryLanguage {
            name
            color
          }
          pushedAt
          stargazerCount
          isArchived
          viewerHasStarred
          id
        }
      }
    }
  }
`;

const ADD_STAR = gql`
  mutation AddStarPayload($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation RemoveStarPayload($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

function Repositories() {
  const { data } = useQuery(GET_REPOSITORIES);
  const [addStar] = useMutation(ADD_STAR);
  const [removeStar] = useMutation(REMOVE_STAR);

  const getDate = (date) => {
    let markDate = new Date();
    markDate.setDate(markDate.getDate() - 30);

    let repoDate = new Date(date);

    let today = new Date();

    var newToday = new Date(today.toLocaleDateString("en-US"));
    var newRepoDate = new Date(repoDate.toLocaleDateString("en-US"));

    var Difference_In_Time = newToday.getTime() - newRepoDate.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if (repoDate < markDate) {
      if (repoDate.getFullYear() === today.getFullYear())
        return `on ${repoDate.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })}`;
      else {
        return `on ${repoDate.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}`;
      }
    } else {
      if (Difference_In_Days > 0) {
        return `${Difference_In_Days} days ago`;
      } else {
        let repoDate = new Date(date);

        var seconds = Math.floor((new Date() - repoDate) / 1000);
        var interval = seconds / 31536000;

        interval = seconds / 3600;
        if (interval > 1) {
          if (interval === 1) return Math.floor(interval) + " hour ago";
          else return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
          if (interval === 1) return Math.floor(interval) + " minute ago";
          else return Math.floor(interval) + " minutes ago";
        }
        if (seconds === 1) return Math.floor(seconds) + " second ago";
        else return Math.floor(seconds) + " seconds ago";
      }
    }
  };

  const addStarRepo = (id) => {
    addStar({
      variables: { starrableId: id },
      refetchQueries: [{ query: GET_REPOSITORIES }],
    });
  };

  const removeStarRepo = (id) => {
    removeStar({
      variables: { starrableId: id },
      refetchQueries: [{ query: GET_REPOSITORIES }],
    });
  };

  return (
    <div className="border-t-2">
      {data &&
        data.viewer.repositories.nodes
          .map((repo, id) => {
            return (
              <div
                key={id}
                className="border-b-2 py-6 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <h1 className="font-semibold text-blue-700 text-xl">
                      {repo.name}
                    </h1>
                    <p className="font-medium text-gray-600 text-sm border rounded-full px-2 border-gray-400">
                      {repo.visibility === "PRIVATE" ? "Private" : "Public"}{" "}
                      {repo.isArchived ? "Archive" : ""}
                    </p>
                  </div>
                  <div className="mt-2 text-gray-600">{repo.description}</div>
                  <div className="flex flex-row text-gray-500 font-normal text-sm mt-5 space-x-5">
                    {repo.primaryLanguage !== null ? (
                      <p className="flex space-x-1 items-center">
                        <span
                          className="p-[7px] border-1 rounded-full"
                          style={{
                            background: repo.primaryLanguage.color,
                          }}
                        ></span>
                        <span>{repo.primaryLanguage.name}</span>
                      </p>
                    ) : (
                      <></>
                    )}
                    {repo.stargazerCount > 0 ? (
                      <p className="flex gap-1">
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
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        {repo.stargazerCount}
                      </p>
                    ) : (
                      <></>
                    )}
                    <p>Updated {getDate(repo.pushedAt)}</p>
                  </div>
                </div>
                <div className="border border-gray-400 rounded-md flex">
                  {repo.viewerHasStarred ? (
                    <button
                      onClick={() => removeStarRepo(repo.id)}
                      className="bg-gray-100 hover:bg-gray-200 flex items-center space-x-[5px] text-gray-600 px-3 py-[5px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="#EAC44E"
                        viewBox="0 0 24 24"
                        stroke="none"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      <p className="text-sm font-medium">Starred</p>
                    </button>
                  ) : (
                    <button
                      onClick={() => addStarRepo(repo.id)}
                      className="bg-gray-100 hover:bg-gray-200 flex items-center space-x-[5px] text-gray-600 px-3 py-[5px]"
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
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      <p className="text-sm font-medium">Star</p>
                    </button>
                  )}
                  <button className="bg-gray-100 hover:bg-gray-200 border-l border-gray-400 px-3 py-[5px] text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
          .reverse()}
    </div>
  );
}

export default Repositories;
