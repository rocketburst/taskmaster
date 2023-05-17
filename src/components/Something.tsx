"use client";
import { signIn, signOut } from "next-auth/react";

const Something = () => {
  return (
    <div>
      <h1 onClick={() => signIn("google")}>Sign In</h1>
      <h1 onClick={() => signOut()}>Sign Out</h1>
    </div>
  );
};

export default Something;
