import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-base-200">
      <section className="hero min-h-[80vh]">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">
              Welcome to Newsletter Hub
            </h1>

            <p className="py-6 text-lg">
              Discover interesting newsletters,
              share your ideas, and connect
              with other writers.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/newsletters"
                className="btn btn-primary"
              >
                Explore Newsletters
              </Link>

              <Link
                href="/register"
                className="btn btn-outline"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}