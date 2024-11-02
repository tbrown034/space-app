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
        {/* so this should 1. generate a random date between 1/1/2022 and whatever is the current date.
         2. Check our database, if there is a database, and see whether there is an entry for that date already. If there is, tell admin alread one and end. 3. If there isn't, do a fetch to nasa's api, get the nasa photo of the day and it's metadata. 3. then send that metadata to Dalle-2 and ask it to make it's version based on the metadata, specifically teh date, description and title. 4. If all that is collected, download the nasa img (it's a url) and the ai (it's a blob or bytea) and send them to my cloud storage. Then save or add to my database an entry with the id, date added, date of the apod, the link or key to the nasa image in my db, the link or key to the ai image in my db, and all the relevant metadata.  */}
      </div>
    </div>
  );
};

export default page;
