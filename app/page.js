import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl">Home</h1>
      <div className="flex gap-4">
        <Link className="p-2 border-2 border-white rounded-xl" href="/play">
          Play
        </Link>
        <Link className="p-2 border-2 border-white rounded-xl" href="/about">
          About
        </Link>
        <Link className="p-2 border-2 border-white rounded-xl" href="/play">
          Admin
        </Link>
      </div>
    </div>
  );
}
