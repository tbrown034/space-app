import Link from "next/link";
const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 ">
      <h1 className="text-2xl">Play</h1>
      <div className="flex gap-4">
        <Link className="p-2 border-2 border-white rounded-xl" href="/">
          Home
        </Link>
        <Link className="p-2 border-2 border-white rounded-xl" href="/admin">
          Admin
        </Link>
        <Link className="p-2 border-2 border-white rounded-xl" href="/about">
          About
        </Link>
      </div>
    </div>
  );
};

export default page;
