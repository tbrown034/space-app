import Link from "next/link";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Header = ({ session }) => {
  const isAuthenticated = !!session?.user;

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/play" className="hover:underline">
          Play
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
      </div>

      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-lg font-semibold">{session.user.name}</span>
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
};

export default Header;
