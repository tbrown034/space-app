"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      onClick={() => signIn()}
      className="p-2 transition-colors duration-200 border-2 border-white rounded-xl hover:bg-white hover:text-black"
    >
      Sign In
    </button>
  );
}
