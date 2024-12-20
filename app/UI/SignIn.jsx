"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  console.log("SignIn button rendered");
  return (
    <button
      onClick={() => signIn()}
      className="px-4 py-2 text-lg transition-colors duration-200 border-2 border-white rounded-xl hover:bg-white hover:text-black"
    >
      Sign In
    </button>
  );
}
