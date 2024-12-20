import Link from "next/link";
import AuthButton from "./UI/AuthButton";
import { auth } from "../auth.js"; // Adjust the path as necessary

export default async function Home() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-6">
      {/* Welcome Message */}
      <h1 className="text-4xl font-bold text-teal-300">
        Welcome to Space or Simulation!
      </h1>
      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link
          href="/random"
          className="px-6 py-3 text-lg font-semibold transition-colors border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-black"
        >
          Random
        </Link>

        <Link
          href="/admin"
          className="px-6 py-3 text-lg font-semibold transition-colors border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-black"
        >
          Admin
        </Link>
      </div>
      {/* Greeting Message */}
      <div className="mt-4 text-center ">
        {isAuthenticated ? (
          <>
            <p className="text-xl font-semibold text-teal-300">
              Hello, {session.user.name}!
            </p>
            <div className="mt-4">
              <AuthButton session={session} />
            </div>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-300">
              Please sign in to access your profile information.
            </p>
            <div className="mt-4">
              <AuthButton session={session} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
