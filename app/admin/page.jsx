import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 ">
      <h1>Admin</h1>
      <div>
        <Link className="p-2 border-2 border-white rounded-xl" href="/admin">
          Home
        </Link>
      </div>
    </div>
  );
};

export default page;
