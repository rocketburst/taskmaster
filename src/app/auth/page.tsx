"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

import GoogleIcon from "@/components/ui/icons/GoogleIcon";

export default function LoginPage() {
  return (
    <main className="flex h-screen flex-col justify-center overflow-y-scroll bg-gray-100 pb-12 sm:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo.png"
          alt="Logo"
          height={48}
          width={48}
          className="mx-auto w-auto"
        />

        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign In to your <span className="text-red-500">TaskMaster</span>{" "}
          account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg bg-white px-4 py-8 shadow-sm sm:px-10">
          <div
            className="flex cursor-pointer items-center space-x-3 rounded-md border border-red-500 p-3"
            onClick={() => signIn("google")}
          >
            <GoogleIcon />
            <span className="font-semibold text-red-500">
              Sign In With Google
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
