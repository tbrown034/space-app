import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link className="p-2 text-black border-2 border-black" href="/play">
          Play
        </Link>
      </div>
    </div>
  );
}
