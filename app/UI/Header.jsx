import Link from "next/link";

const Header = () => {
  return (
    <div>
      <div className="flex justify-center gap-4">
        <Link href="/">Home </Link>
        <Link href="/play">Play </Link>
        <Link href="/about">About </Link>
      </div>
    </div>
  );
};

export default Header;
