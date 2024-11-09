"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  console.log("SignOut button rendered");
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 text-lg transition-colors duration-200 border-2 border-white rounded-xl hover:bg-white hover:text-black"
    >
      Sign Out
    </button>
  );
}
