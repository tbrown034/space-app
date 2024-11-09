"use client";

import { signIn, signOut } from "next-auth/react";

const AuthButton = ({ session }) => {
  const isAuthenticated = !!session?.user;

  return (
    <button
      onClick={isAuthenticated ? signOut : signIn}
      className="px-6 py-2 text-lg font-semibold transition-colors border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-black"
    >
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </button>
  );
};

export default AuthButton;
