import Link from "next/link";
const page = () => {
  return (
    <div>
      <h1>Play</h1>
      <div>
        <Link className="p-2 text-black border-2 border-black" href="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default page;
