const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;

const makeRequest = async (
  endpoint: string,
  params: Record<string, string> = {}
) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const tmdbApi = {
  getTrending: () => makeRequest("/trending/movie/week"),
  getNowPlaying: () => makeRequest("/movie/now_playing"),
  getPopular: () => makeRequest("/movie/popular"),
  getUpcoming: () => makeRequest("/movie/upcoming"),
  getMovieDetails: (id: string) => makeRequest(`/movie/${id}`),
  getMovieCredits: (id: string) => makeRequest(`/movie/${id}/credits`),
  getMovieVideos: (id: string) => makeRequest(`/movie/${id}/videos`),
  searchMovies: (query: string) => makeRequest("/search/movie", { query }),
  getWatchProviders: (id: string) =>
    makeRequest(`/movie/${id}/watch/providers`),
  getGenres: () => makeRequest("/genre/movie/list"),
  discoverMovies: (params: Record<string, string>) =>
    makeRequest("/discover/movie", params),
};

export const getImageUrl = (path: string, size: string = "w500") => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/placeholder.svg";
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};
