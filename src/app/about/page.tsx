"use client";
import React from "react";
import { Film, Code, Palette, Zap } from "lucide-react";

const About = () => {
  const technologies = [
    {
      name: "Next.js",
      description: "React-based framework for server-side rendering and SEO-friendly apps.",
      icon: "🌐",
    },
    {
      name: "TypeScript",
      description: "Strongly typed scripting to ensure seamless and secure performance.",
      icon: "📘",
    },
    {
      name: "Tailwind CSS",
      description: "Design system that styles CineVault with elegance and precision.",
      icon: "🎨",
    },
    {
      name: "TMDB API",
      description: "Gateway to real-time movie data, cast info, posters, and more.",
      icon: "🎬",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16">
      <div className="container mx-auto px-6 py-12">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Film className="h-16 w-16 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CineVault
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dive into the world of cinema with CineVault — your ultimate movie companion.
            Discover trending films, explore hidden gems, and get lost in the magic of storytelling.
            From timeless classics to the latest blockbusters, CineVault brings the reel world to your screen.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why CineVault?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Code className="h-8 w-8 text-blue-500" />
                <h3 className="text-xl font-semibold text-white">
                  Real-Time Movie Insights
                </h3>
              </div>
              <p className="text-gray-300">
                Get the latest ratings, cast details, trailers, and plot summaries — all updated live from TMDB.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="h-8 w-8 text-purple-500" />
                <h3 className="text-xl font-semibold text-white">
                  Cinematic UI Experience
                </h3>
              </div>
              <p className="text-gray-300">
                A visually immersive design inspired by streaming platforms — responsive, elegant, and user-first.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-yellow-500" />
                <h3 className="text-xl font-semibold text-white">
                  Blazing Fast Navigation
                </h3>
              </div>
              <p className="text-gray-300">
                Built for speed using modern frontend tools for seamless browsing and performance.
              </p>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Behind the Screens
          </h2>
          <p className="text-center text-gray-400 mb-10">
            Built with love, speed, and modern tools that power today’s web — just like the movies, every frame matters.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{tech.icon}</span>
                  <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                </div>
                <p className="text-gray-300 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Section */}
        <div className="text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">
            Meet the Creator
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            CineVault was crafted by a passionate developer who loves both code and cinema.
            This project blends cutting-edge web development with a deep appreciation for film.
            From UI polish to API integration — every feature is a tribute to the art of storytelling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
