import Link from "next/link";
import UserName from "./UI/UserName";

export default function Home({ session }) {
  console.log("Home session:", session);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-6">
      {/* Welcome Message */}
      <h1 className="text-4xl font-bold text-teal-300">
        Welcome to Space or Simulation!
      </h1>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link
          href="/play"
          className="px-6 py-3 text-lg font-semibold transition-colors border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-black"
        >
          Play
        </Link>
        <Link
          href="/about"
          className="px-6 py-3 text-lg font-semibold transition-colors border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-black"
        >
          About
        </Link>
        <Link
          href="/admin"
          className="px-6 py-3 text-lg font-semibold transition-colors border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-black"
        >
          Admin
        </Link>
      </div>

      {/* Display User Name if logged in */}
      {session?.user ? (
        <div className="mt-6 text-xl">
          <UserName session={session} />
        </div>
      ) : (
        <p className="mt-6 text-lg text-gray-300">
          Please sign in to see your profile information.
        </p>
      )}
    </div>
  );
}
