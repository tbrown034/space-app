// app/about/page.jsx
"use client";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 text-white">
      <h1 className="mb-8 text-4xl font-bold text-teal-400">About</h1>

      <div className="flex flex-col max-w-3xl gap-10 mx-auto">
        {/* About the Project */}
        <section>
          <h2 className="text-3xl font-semibold text-teal-300">
            About the Project
          </h2>
          <p className="mt-3 text-lg text-gray-200">
            This app is built using the Next.js framework, integrating a
            PostgreSQL database and OpenAI's API for generating AI-mimicked
            versions of NASA’s Astronomy Picture of the Day (APOD) images. It
            features secure login with Google Authentication and offers a unique
            gameplay experience where users guess between real and AI-generated
            images.
          </p>
        </section>

        {/* Why the Project */}
        <section>
          <h2 className="text-3xl font-semibold text-teal-300">
            Why the Project
          </h2>
          <p className="mt-3 text-lg text-gray-200">
            The rapid advancements in AI raise concerns about misinformation. As
            a former journalist, I wanted to create an interactive tool to help
            users become more aware of how AI can be used to generate highly
            convincing but fake images. This project aims to be a fun yet
            educational way to engage with the issue.
          </p>
        </section>

        {/* About NASA APOD */}
        <section>
          <h2 className="text-3xl font-semibold text-teal-300">
            About NASA APOD
          </h2>
          <p className="mt-3 text-lg text-gray-200">
            NASA's Astronomy Picture of the Day (APOD) features stunning images
            of the universe, providing both a visual feast and educational
            insights. It’s a popular resource for anyone interested in the
            cosmos, offering a new image every day along with detailed
            explanations from professional astronomers.
          </p>
        </section>

        {/* About the Developer */}
        <section>
          <h2 className="text-3xl font-semibold text-teal-300">
            About the Developer
          </h2>
          <p className="mt-3 text-lg text-gray-200">
            Hi, I’m Trevor Brown, a web developer with a focus on full-stack
            projects. I enjoy creating engaging experiences that blend
            technology and creativity. Learn more about my work on my website:{" "}
            <a
              href="https://trevorthewebdeveloper.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-600"
            >
              trevorthewebdeveloper.com
            </a>
          </p>
        </section>

        {/* Privacy and Terms of Service */}
        <section>
          <h2 className="text-3xl font-semibold text-teal-300">
            Privacy and Terms of Service
          </h2>
          <p className="mt-3 text-lg text-gray-200">
            This app uses Google OAuth for secure login. We only collect your
            name, email, and profile picture for account creation. Your data is
            not shared or sold to third parties, and is used solely for
            providing access to the app. If you have concerns about your data,
            contact me at{" "}
            <a
              href="mailto:trevorbrown.web@gmail.com"
              className="text-blue-400 underline hover:text-blue-600"
            >
              trevorbrown.web@gmail.com
            </a>
            .
          </p>
          <p className="mt-3 text-lg text-gray-200">
            By using this app, you agree to its terms of service. Manage or
            revoke your permissions at{" "}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-600"
            >
              Google Account Permissions
            </a>
            .
          </p>
          <p className="mt-4 text-lg text-gray-400">
            Last updated: November 2024
          </p>
        </section>
      </div>
    </div>
  );
}
