import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm px-6">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          Newsletter Hub
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>

        <Link href="/newsletters" className="btn btn-ghost">
          Newsletters
        </Link>
      </div>

      <div className="navbar-end gap-2">
        <Link href="/login" className="btn btn-ghost">
          Login
        </Link>

        <Link href="/register" className="btn btn-primary">
          Register
        </Link>
      </div>
    </div>
  );
}