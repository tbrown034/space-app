import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 ">
      <h1 className="text-2xl">Admin</h1>
      <div className="flex gap-4">
        <Link className="p-2 border-2 border-white rounded-xl" href="/">
          Home
        </Link>
        <Link className="p-2 border-2 border-white rounded-xl" href="/play">
          Play
        </Link>
        {/* <Link>Get Random Pair</Link> */}
        {/* so this should 1. generate a random date between 1/1/2022 and whatever is the current date.  2.. Check our database, if there is a database, and see whether there is an entry for that date already. If there is, tell admin alread do a fetch to nasa's api, get the nasa photo of the day and it's metadata, then it should */}
      </div>
    </div>
  );
};

export default page;
