import "./globals.css";
import { auth } from "../auth.js";
import Header from "./UI/Header";
import Footer from "./UI/Footer";

export const metadata = {
  title: "Space or Simulation Game",
  description:
    "Test your ability to spot real NASA images against AI-generated ones.",
  keywords:
    "Next.js, Prisma, PostgreSQL, DALL-E, NASA APOD, AI images, space game",
  author: "Trevor Brown",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen p-4 text-white bg-gradient-to-b from-indigo-950 via-blue-800 to-indigo-800">
        <Header session={session} />
        <main className="flex-grow">
          <div session={session}>{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
