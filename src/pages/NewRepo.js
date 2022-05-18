import React, { useState } from "react";
import Container from "../components/Container";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import { GET_REPOSITORIES } from "../components/Repositories";

const GET_USER = gql`
  query {
    user(login: "allyssasalvacion") {
      avatarUrl
      login
      id
    }
  }
`;

const ADD_REPO = gql`
  mutation createRepository(
    $name: String!
    $visibility: RepositoryVisibility!
    $ownerId: ID
    $description: String
  ) {
    createRepository(
      input: {
        name: $name
        visibility: $visibility
        ownerId: $ownerId
        description: $description
      }
    ) {
      repository {
        name
        createdAt
        url
      }
    }
  }
`;

function NewRepo() {
  const navigate = useNavigate();
  const { data } = useQuery(GET_USER);
  const [createRepository] = useMutation(ADD_REPO);
  const [repoName, setRepoName] = useState("");
  const [selectedType, setSelectedType] = useState("PUBLIC");
  const [description, setDescription] = useState("");

  const createNewRepository = () => {
    createRepository({
      variables: {
        name: repoName,
        visibility: selectedType,
        ownerId: "MDQ6VXNlcjc5MjA3NDA0",
        description: description,
      },
      refetchQueries: [{ query: GET_REPOSITORIES }],
    });
    navigate("/");
  };

  return (
    <Container>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="pt-12 pb-24 px-12">
            <h1 className="text-2xl text-gray-800">Create a new repository</h1>
            <h3 className="text-gray-500 mt-1">
              A repository contains all project files, including the revision
              history. Already have a project repository elsewhere?{" "}
              <a
                href="https://github.com/new/import"
                className="text-blue-600 hover:underline"
              >
                Import a repository.
              </a>
            </h3>
            <hr className="text-gray-400 border-t-2 my-5" />
            <div className="flex flex-row items-center pt-5">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="owner"
                  className="block text-md font-semibold text-gray-700"
                >
                  Owner
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Menu as="div" className="relative inline-block text-left mt-2">
                  <div>
                    <Menu.Button className="flex justify-center items-center w-full text-md font-medium text-gray-800 space-x-2 bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-md px-4 py-[5px]">
                      <img
                        className="rounded-full w-6 h-6 object-cover"
                        src={data && data.user.avatarUrl}
                        alt=""
                      />
                      <p>{data && data.user.login}</p>
                      <ChevronDownIcon
                        className="w-4 h-4 text-gray-800"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                </Menu>
              </div>
              <span className="mt-6 mx-3 text-2xl">/</span>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="repo-name"
                  className="block text-md font-semibold text-gray-700"
                >
                  Repository name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="text-sm mt-2 px-3 py-[7px] block w-60 bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-md"
                />
              </div>
            </div>
            <p className="mt-3">
              Great repository names are short and memorable. Need inspiration?
              How about{" "}
              <span
                className="text-green-700 font-semibold cursor-pointer"
                onClick={() => setRepoName("bug-free-system")}
              >
                bug-free-system
              </span>
              ?
            </p>
            <div className="col-span-6 sm:col-span-3 mt-5">
              <label
                htmlFor="repo-name"
                className="block text-md font-semibold text-gray-700"
              >
                Description
                <span className="text-gray-500 ml-1 font-semibold text-sm">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                className="text-sm mt-2 px-3 py-[7px] block w-full bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-md"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <hr className="text-gray-400 border-t-2 my-5" />
            <div>
              <div className="flex items-center">
                <input
                  id="public"
                  name="repo-type"
                  type="radio"
                  value={selectedType}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 mr-2"
                  defaultChecked
                  onClick={() => setSelectedType("PUBLIC")}
                />
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <label
                      htmlFor="push-everything"
                      className="block text-md font-semibold text-gray-700"
                    >
                      Public
                    </label>
                    <p className="text-sm text-gray-500">
                      Anyone on the internet can see this repository. You choose
                      who can commit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="private"
                  name="repo-type"
                  type="radio"
                  value={selectedType}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 mr-2"
                  onClick={() => setSelectedType("PRIVATE")}
                />
                <div className="flex space-x-2 mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <label
                      htmlFor="push-everything"
                      className="block text-md font-semibold text-gray-700"
                    >
                      Private
                    </label>
                    <p className="text-sm text-gray-500">
                      You choose who can see and commit to this repository.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="text-gray-400 border-t-2 my-5" />
            <p className="text-md font-semibold text-gray-700">
              Initialize this repository with:
            </p>
            <p className="text-gray-500">
              Skip this step if you’re importing an existing repository.
            </p>
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 -mt-1">
                <label
                  htmlFor="comments"
                  className="font-semibold text-md text-gray-700"
                >
                  Add a README file
                </label>
                <p className="text-gray-500 text-sm">
                  This is where you can write a long description for your
                  project.{" "}
                  <a
                    href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more.
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="comments"
                className="font-semibold text-md text-gray-700"
              >
                Add .gitignore
              </label>
              <p className="text-gray-500 text-sm">
                Choose which files not to track from a list of templates.{" "}
                <a
                  href="https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more.
                </a>
              </p>
            </div>
            <Menu as="div" className="relative inline-block text-left mt-3">
              <div>
                <Menu.Button className="flex justify-center items-center w-full px-4 py-[5px] text-sm bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-md">
                  <p className="font-normal text-gray-700 mr-1">
                    .gitignore template:
                  </p>
                  <p className="font-medium">None</p>
                  <ChevronDownIcon
                    className="w-4 h-4 ml-1 -mr-1 text-gray-800"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
            </Menu>
            <div className="mt-5">
              <label
                htmlFor="comments"
                className="font-semibold text-md text-gray-700"
              >
                Choose a license
              </label>
              <p className="text-gray-500 text-sm">
                A license tells others what they can and can't do with your
                code.{" "}
                <a
                  href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more.
                </a>
              </p>
            </div>
            <Menu as="div" className="relative inline-block text-left mt-3">
              <div>
                <Menu.Button className="flex justify-center items-center w-full px-4 py-[5px] text-sm bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-md">
                  <p className="font-normal text-gray-700 mr-1">License:</p>
                  <p className="font-medium">None</p>
                  <ChevronDownIcon
                    className="w-4 h-4 ml-1 -mr-1 text-gray-800"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
            </Menu>
            <hr className="text-gray-400 border-t-2 my-5" />
            <p className="text-gray-600 flex flex-row gap-1 items-center">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              You are creating a public repository in your personal account.
            </p>
            <hr className="text-gray-400 border-t-2 my-5" />
            <button
              className="flex items-center justify-center px-4 py-[7px] border  font-semibold rounded-md text-white bg-green-600 border-green-600 hover:bg-green-700 gap-2 w-max text-md disabled:opacity-60 disabled:pointer-events-none"
              disabled={repoName === ""}
              onClick={createNewRepository}
            >
              Create repository
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default NewRepo;
