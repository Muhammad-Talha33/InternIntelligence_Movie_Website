"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Film } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/search", label: "Search" },
    { path: "/about", label: "About" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-xl"
          >
            <Film className="h-8 w-8 text-blue-500" />
            <span className=" sm:block">CineVault</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-lg font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search Icon */}
          <Link
            href="/search"
            className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white transition-transform duration-300 ease-in-out"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {/* Animate icon rotate & scale */}
            {isMenuOpen ? (
              <X
                className={`h-6 w-6 transform transition-transform duration-300 ${
                  isMenuOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"
                }`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 transform transition-transform duration-300 ${
                  !isMenuOpen ? "rotate-0 scale-100" : "rotate-180 scale-110"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="py-4 border-t border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-lg font-medium transition-colors duration-300 ${
                  isActive(item.path)
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
