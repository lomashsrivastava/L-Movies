import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const Banner = () => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies/?featured=true`);
                const movies = response.data;
                if (movies.length > 0) {
                    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                    setMovie(randomMovie);
                } else {
                    throw new Error("No featured movies");
                }
            } catch (error) {
                console.error("Error fetching banner movie, using fallback:", error);
                // Fallback Banner
                setMovie({
                    title: "L-Movies Original",
                    description: "Experience the best cinematic universe with our curated collection of box office hits and exclusive premieres.",
                    year: "2025",
                    rating: 9.8,
                    poster_url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
                    screenshot_1: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
                });
            }
        };

        fetchFeatured();
    }, []);

    if (!movie) return null;

    // Use screenshot_1 for the wide banner look, fallback to poster
    const backImage = movie.screenshot_1 || movie.poster_url;

    return (
        <header
            className="relative h-[70vh] md:h-[80vh] w-full bg-cover bg-center flex items-center transition-all duration-1000"
            style={{ backgroundImage: `url('${backImage}')` }}
        >

            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />

            <div className="container mx-auto px-4 md:px-12 relative z-10 max-w-2xl pt-20">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl text-white tracking-tight">
                    {movie.title}
                </h1>

                <div className="flex items-center gap-4 mb-6 text-sm md:text-base text-gray-300 font-medium">
                    <span className="text-green-400 font-bold">{Math.floor(movie.rating * 10)}% Match</span>
                    <span>{movie.year}</span>
                    <span className="bg-red-600/80 px-2 py-0.5 rounded text-white text-xs">FEATURED</span>
                </div>

                <p className="text-base md:text-lg text-gray-200 mb-8 line-clamp-3 md:line-clamp-4 drop-shadow-md leading-relaxed pr-4">
                    {movie.description}
                </p>

                <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded hover:bg-opacity-80 transition font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <FaPlay /> Play
                    </button>
                    {movie.trailer_url && (
                        <a
                            href={movie.trailer_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gray-500/50 backdrop-blur-sm text-white px-6 py-2 md:px-8 md:py-3 rounded hover:bg-gray-500/30 transition font-bold active:scale-95"
                        >
                            <FaInfoCircle /> Trailer
                        </a>
                    )}
                </div>
            </div>
        </header>
    )
}
export default Banner;
