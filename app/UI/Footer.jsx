import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center p-4">
      <div className="flex gap-4">
        <Link className="p-2 border-2 border-white rounded-xl" href="/">
          Home
        </Link>
        <Link className="p-2 border-2 border-white rounded-xl" href="/play">
          Play
        </Link>
        <Link className="p-2 border-2 border-white rounded-xl" href="/about">
          About
        </Link>
      </div>
      <div className="mt-4">&copy; {currentYear} All rights reserved</div>
    </footer>
  );
};

export default Footer;
