"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const linkClasses = (path: string) =>
    `block px-3 py-2 font-medium transition-colors ${
      isActive(path) ? "text-green-700" : "text-gray-700 hover:text-green-700"
    }`;

  return (
    <nav
      className={`fixed top-0 w-full bg-white z-50 transition-all duration-300 ${
        isScrolled ? " shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold text-green-700">BBA Gen</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link href="/about" className={linkClasses("/about")}>
              About
            </Link>
            <Link href="/students" className={linkClasses("/students")}>
              Students
            </Link>
            <Link href="/achievements" className={linkClasses("/achievements")}>
              Achievements
            </Link>
            <Link
              href="/member/login"
              className="px-6 py-2 rounded-lg font-medium text-white transition-all bg-green-700 hover:bg-green-800"
            >
              Member
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 text-green-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-4 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={linkClasses("/")}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className={linkClasses("/about")}
          >
            About
          </Link>
          <Link
            href="/students"
            onClick={() => setIsMenuOpen(false)}
            className={linkClasses("/students")}
          >
            Students
          </Link>
          <Link
            href="/achievements"
            onClick={() => setIsMenuOpen(false)}
            className={linkClasses("/achievements")}
          >
            Achievements
          </Link>
          <Link
            href="/member/login"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 px-6 py-2 text-center rounded-lg font-medium text-white bg-green-700 hover:bg-green-800 transition-all"
          >
            Member
          </Link>
        </div>
      </div>
    </nav>
  );
}
