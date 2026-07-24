import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-red-600 hover:bg-red-700 font-semibold rounded-xl transition text-white no-underline"
      >
        Back to Home
      </Link>
    </div>
  );
}
