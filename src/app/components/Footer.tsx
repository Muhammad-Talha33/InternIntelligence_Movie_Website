import { Film } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className=" bg-gradient-to-b from-gray-900 to-black backdrop-blur-md border-b border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="flex gap-2">
              <Film className="h-8 w-8 text-blue-500" />
              <h3 className="text-xl font-bold mb-4">CineVault</h3>
            </span>
            <p>
              Explore movies, watch trailers, and get full details all in one place.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 md:space-y-0 md:flex md:gap-4  md:items-center ">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-blue-400 transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 CineVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
