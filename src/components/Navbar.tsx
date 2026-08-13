"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/students", label: "Students" },
  { href: "/achievements", label: "Achievements" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  const linkClasses = (path: string) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive(path)
        ? "bg-emerald-50 text-emerald"
        : "text-body hover:bg-emerald-50/60 hover:text-emerald"
    }`;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-surface/85 shadow-nav backdrop-blur-md"
          : "border-b border-transparent bg-surface"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald to-teal text-base font-bold text-white shadow-sm">
              B
            </span>
            <span className="font-display text-lg font-bold text-ink">
              BBA <span className="text-emerald">Gen</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
                {link.label}
              </Link>
            ))}
            <Link
              href="/member/login"
              className="ml-3 rounded-full bg-emerald px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-dark"
            >
              Member
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 text-emerald md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-border bg-surface transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/member/login"
            className="mt-2 rounded-full bg-emerald px-5 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-emerald-dark"
          >
            Member
          </Link>
        </div>
      </div>
    </nav>
  );
}
