"use client";
import { tmdbApi } from '@/services/tmdbApi';
import React, { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface Genre {
  id: number;
  name: string;
}

interface FilterBarProps {
  onChange: (filters: { genre: string; year: string }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onChange }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await tmdbApi.getGenres();
        if (data && Array.isArray(data.genres)) {
          setGenres(data.genres);
        } else {
          setGenres([]);
        }
      } catch (error) {
        console.error('Failed to fetch genres:', error);
        setGenres([]);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    onChange({ genre: selectedGenre, year: selectedYear });
  }, [selectedGenre, selectedYear]);

  return (
    <div className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-md border border-gray-600 rounded-xl p-5 flex flex-wrap items-center gap-4 shadow-lg">
      <div className="flex items-center gap-2 text-white text-lg font-semibold mb-2">
        <SlidersHorizontal className="h-5 w-5 text-blue-400" />
        <span>Filter Movies</span>
      </div>

      <div className="flex gap-4 flex-wrap w-full sm:w-auto">
        {/* Genre Dropdown */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Genres</option>
          {genres?.length > 0 &&
            genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
        </select>

        {/* Year Dropdown */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Years</option>
          {Array.from({ length: 20 }, (_, i) => {
            const year = `${2025 - i}`;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
