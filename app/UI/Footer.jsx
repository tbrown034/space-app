// app/UI/Footer.jsx
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center p-6 text-gray-200">
      {/* Navigation Links */}
      <div className="flex gap-6 mb-4">
        <Link
          href="/"
          className="px-4 py-2 text-lg font-semibold transition-colors duration-200 border-2 border-teal-400 rounded-lg hover:bg-teal-400 hover:text-black"
        >
          Home
        </Link>
        <Link
          href="/random"
          className="px-4 py-2 text-lg font-semibold transition-colors duration-200 border-2 border-teal-400 rounded-lg hover:bg-teal-400 hover:text-black"
        >
          Play
        </Link>
        <Link
          href="/about"
          className="px-4 py-2 text-lg font-semibold transition-colors duration-200 border-2 border-teal-400 rounded-lg hover:bg-teal-400 hover:text-black"
        >
          About
        </Link>
        <Link
          href="/admin"
          className="px-4 py-2 text-lg font-semibold transition-colors duration-200 border-2 border-teal-400 rounded-lg hover:bg-teal-400 hover:text-black"
        >
          Admin
        </Link>
      </div>

      {/* Divider Line */}
      <div className="w-full max-w-md h-[1px] bg-gray-600 mb-4"></div>

      {/* Copyright Text */}
      <div className="text-sm text-gray-400">
        &copy; {currentYear} Trevor Brown. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
