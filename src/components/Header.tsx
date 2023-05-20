"use client";

import { TaskContext } from "@/contexts/TaskContext";
import { TaskContextType } from "@/types";
import {
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { useContext, type ChangeEvent } from "react";
import Image from "next/image";

type HeaderProps = {
  name: string;
  image: string;
};

export default function Header({ name, image }: HeaderProps) {
  const { searchInput, changeSearchInput } = useContext(
    TaskContext
  ) as TaskContextType;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    changeSearchInput(e.target.value);
  };

  return (
    <header className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <label className="sr-only" htmlFor="search">
                {" "}
                Search{" "}
              </label>

              <input
                className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                id="search"
                type="search"
                placeholder="Search Tasks..."
                value={searchInput}
                onChange={handleChange}
              />

              <button
                type="button"
                className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              >
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => signOut()}
              className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
            >
              <span className="sr-only">Sign Out</span>
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>

          <span
            aria-hidden="true"
            className="block h-6 w-px rounded-full bg-gray-200"
          ></span>

          <div className="block shrink-0">
            <span className="sr-only">Profile</span>

            <Image
              src={image}
              alt={"Profile pIcture"}
              height={40}
              width={40}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Welcome Back, <span className="text-red-500">{name}!</span>
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Check out what tasks you have down below!
          </p>
        </div>
      </div>
    </header>
  );
}
