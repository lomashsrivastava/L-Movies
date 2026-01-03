import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPlus, FaThumbsUp, FaDownload, FaStar, FaTimes } from 'react-icons/fa';

// Placeholder generator using existing logic
const generatePlaceholders = (count) => Array.from({ length: count }).map((_, i) => ({
    id: `static-${i}`,
    title: `Cyber Movie ${i + 1}`,
    year: 2024 + Math.floor(Math.random() * 2),
    rating: (Math.random() * 2 + 8).toFixed(1),
    match: `${Math.floor(Math.random() * 20 + 80)}% Match`,
    img: `https://picsum.photos/300/450?random=${i + 100}`,
    genres: ['Sci-Fi'],
    isStatic: true
}));

const MovieGrid = ({ genre, filterType, searchQuery }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:8001/api/movies/';
                const params = new URLSearchParams();

                if (genre) params.append('genre', genre);

                // Logic for filters
                if (searchQuery) {
                    params.append('search', searchQuery);
                } else {
                    if (filterType === 'trending') {
                        params.append('trending', 'true');
                    } else if (filterType === 'featured') {
                        params.append('featured', 'true');
                    }
                }

                // If filterType is 'new', we rely on default ordering (created_at desc) which the view already does.

                const response = await axios.get(`${url}?${params.toString()}`);

                const apiMovies = response.data.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    year: movie.year,
                    rating: movie.rating,
                    description: movie.description,
                    match: `${Math.floor(movie.rating * 10)}% Match`,
                    img: movie.poster_url,
                    genres: movie.genres && movie.genres.length > 0 ? movie.genres : ['Unknown'],
                    downloadLink: movie.download_url,
                    trailer: movie.trailer_url,
                    screenshots: [
                        movie.screenshot_1,
                        movie.screenshot_2,
                        movie.screenshot_3,
                        movie.screenshot_4,
                        movie.screenshot_5
                    ].filter(Boolean)
                }));

                setMovies(apiMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [genre, filterType, searchQuery]);

    if (loading) {
        return <div className="text-white text-center py-10 animate-pulse">Loading Movies...</div>;
    }

    if (movies.length === 0) {
        return <div className="text-gray-500 text-center py-10">No movies found.</div>;
    }

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                {movies.map((movie, i) => (
                    <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedMovie(movie)}
                    >
                        <div className="relative aspect-[2/3] rounded-md md:rounded-lg overflow-hidden shadow-lg border border-transparent group-hover:border-red-500/50 transition-all">
                            <img
                                loading="lazy"
                                src={movie.img}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Simple gradient for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <h3 className="text-white text-sm font-bold truncate">{movie.title}</h3>
                                <div className="flex items-center justify-between text-[10px] text-gray-300 mt-1">
                                    <span className="text-green-400">{movie.match}</span>
                                    <span>{movie.year}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* RESPONSIVE MOVIE DETAILS MODAL */}
            <AnimatePresence>
                {selectedMovie && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/90 backdrop-blur-sm p-0 md:p-4"
                        onClick={() => setSelectedMovie(null)}
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-[#181818] w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-xl shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Mobile Close Indicator */}
                            <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
                                <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
                            </div>

                            {/* Close Button (Desktop) */}
                            <button
                                onClick={() => setSelectedMovie(null)}
                                className="hidden md:flex absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 rounded-full items-center justify-center text-white hover:bg-red-600 transition"
                            >
                                <FaTimes />
                            </button>

                            {/* Banner Image */}
                            <div className="relative h-64 md:h-96 w-full">
                                <img src={selectedMovie.screenshots?.[0] || selectedMovie.img} alt="Backdrop" className="w-full h-full object-cover opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                                    <h2 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">{selectedMovie.title}</h2>
                                    <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 font-medium">
                                        <span className="text-green-500 font-bold">{selectedMovie.match}</span>
                                        <span>{selectedMovie.year}</span>
                                        <span className="border border-white/20 px-2 rounded">{selectedMovie.genres[0]}</span>
                                        <span className="flex items-center gap-1 text-yellow-400"><FaStar /> {selectedMovie.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                                    <div>
                                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                                            {selectedMovie.description || "No synopsis available."}
                                        </p>

                                        <div className="flex flex-wrap gap-4">
                                            {selectedMovie.downloadLink && (
                                                <a
                                                    href={selectedMovie.downloadLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white text-lg font-bold px-8 py-3 rounded-lg shadow-lg shadow-red-600/20 transition-transform active:scale-95"
                                                >
                                                    <FaDownload /> Download
                                                </a>
                                            )}
                                            {selectedMovie.trailer && (
                                                <a
                                                    href={selectedMovie.trailer}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white text-lg font-bold px-8 py-3 rounded-lg backdrop-blur-sm transition-transform active:scale-95"
                                                >
                                                    <FaPlay /> Trailer
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Screenshot Grid */}
                                {selectedMovie.screenshots && selectedMovie.screenshots.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3">Gallery</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {selectedMovie.screenshots.map((shot, idx) => (
                                                <img
                                                    key={idx}
                                                    src={shot}
                                                    alt={`Scene ${idx}`}
                                                    className="w-full h-40 object-cover rounded-lg border border-white/10 hover:border-white/30 transition"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
export default MovieGrid;
