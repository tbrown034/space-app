import Link from "next/link";
import AuthButton from "./AuthButton";

const Header = ({ session }) => {
  const isAuthenticated = !!session?.user;

  return (
    <div className="flex items-center justify-between py-4">
      {/* Navigation Links */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 text-lg font-semibold transition-colors border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-black"
        >
          Home
        </Link>
        <Link
          href="/random"
          className="px-4 py-2 text-lg font-semibold transition-colors border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-black"
        >
          Random
        </Link>
        <Link
          href="/about"
          className="px-4 py-2 text-lg font-semibold transition-colors border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-black"
        >
          About
        </Link>
      </div>

      {/* Auth Button and Welcome Message */}
      <div className="flex items-center gap-4 mt-1">
        {isAuthenticated && (
          <span className="text-lg font-semibold text-teal-300">
            Hello, {session.user.name}!
          </span>
        )}
        <AuthButton session={session} />
      </div>
    </div>
  );
};

export default Header;
