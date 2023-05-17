"use client";

import { signIn } from "next-auth/react";
import { GoogleIcon } from "./Icons";

type AuthBoxProps = {
  name: string;
  id: string;
};

export default function AuthBox({ id, name }: AuthBoxProps) {
  return (
    <div
      className="flex cursor-pointer items-center space-x-3 rounded-md border border-red-500 p-3"
      key={id}
      onClick={() => signIn(id)}
    >
      <GoogleIcon />
      <span className="font-semibold text-red-500">Sign In With {name}</span>
    </div>
  );
}
