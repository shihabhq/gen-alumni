import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon/Text */}
        <div className="mb-8">
          <div
            className="text-8xl font-black mb-4"
            style={{ color: "#006747" }}
          >
            404
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: "#1e293b" }}>
            Page Not Found
          </h1>
          <p className="text-base mb-8" style={{ color: "#64748b" }}>
            The page you are looking for does not exist or has been moved. Let&apos;s
            get you back on track.
          </p>
        </div>

        {/* Illustration placeholder */}
        <div
          className="h-48 rounded-lg mb-8 flex items-center justify-center"
          style={{ backgroundColor: "#e0f2fe" }}
        >
          <div className="text-center">
            <div className="text-6xl mb-3" style={{ color: "#007f8c" }}>
              🔍
            </div>
            <p className="text-sm" style={{ color: "#007f8c" }}>
              Page lost in the network
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white"
            style={{ backgroundColor: "#006747" }}
          >
            Back to Home
          </Link>
          <Link
            href="/students"
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            style={{ backgroundColor: "#a3e635", color: "#1e293b" }}
          >
            View Students
          </Link>
        </div>
      </div>
    </main>
  );
}
