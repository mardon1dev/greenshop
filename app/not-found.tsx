import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Sorry, the page you are looking for doesn&#39;t exist.</p>
      <Link href="/">
        <p className="text-blue-500 underline">Go back to Home</p>
      </Link>
    </div>
  );
}
