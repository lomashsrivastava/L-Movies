import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUser, FaCaretDown, FaTools } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isGenreOpen, setIsGenreOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const genres = ["Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", "Horror", "Sci-Fi", "Thriller"];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#141414]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5' : 'bg-gradient-to-b from-black/90 to-transparent py-5'}`}>
            <div className="container mx-auto px-4 md:px-12 flex items-center justify-between h-16">
                <div className="flex items-center gap-8 md:gap-12">
                    <Link to="/" className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 text-3xl font-extrabold tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(229,9,20,0.8)] hover:scale-105 transition-transform">
                        L-Movies
                    </Link>

                    <ul className="hidden lg:flex gap-6 text-sm font-medium text-gray-300 items-center">
                        <li>
                            <Link to="/" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition duration-300">Home</Link>
                        </li>
                        <li>
                            <Link to="/movies" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition duration-300">TV Shows</Link>
                        </li>
                        <li>
                            <Link to="/movies" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition duration-300">Movies</Link>
                        </li>

                        {/* Dropdown for Categories */}
                        <li
                            className="relative group"
                            onMouseEnter={() => setIsGenreOpen(true)}
                            onMouseLeave={() => setIsGenreOpen(false)}
                        >
                            <button className="flex items-center gap-1 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition duration-300">
                                Categories <FaCaretDown />
                            </button>

                            <AnimatePresence>
                                {isGenreOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-gray-700 rounded-md shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden"
                                    >
                                        <div className="grid grid-cols-1 p-2">
                                            {genres.map(genre => (
                                                <Link
                                                    key={genre}
                                                    to={`/movies?genre=${genre}`}
                                                    className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                                                >
                                                    {genre}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        <li>
                            <Link to="/watchlist" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition duration-300">My List</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center gap-6 text-white">
                    <div className="hidden md:flex items-center gap-2">
                        <a href={`${import.meta.env.VITE_API_URL}/admin`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-red-600 px-3 py-1.5 rounded-full border border-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                            <FaTools /> ADMIN PANEL
                        </a>
                    </div>

                    <FaSearch className="w-5 h-5 cursor-pointer hover:text-red-500 transition hover:scale-110" />
                    <FaBell className="w-5 h-5 cursor-pointer hover:text-red-500 transition hover:scale-110" />

                    <Link to="/login" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition group">
                        <div className="w-9 h-9 rounded bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg group-hover:ring-2 ring-white/50 transition-all">
                            <FaUser size={14} />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Placeholder - simplistic for now, but ensures functionality */}
            <div className="lg:hidden flex justify-evenly py-2 bg-black/90 border-t border-white/10 text-xs text-gray-400">
                <Link to="/" className="flex flex-col items-center gap-1 active:text-white">Home</Link>
                <Link to="/movies" className="flex flex-col items-center gap-1 active:text-white">Browse</Link>
                <Link to="/watchlist" className="flex flex-col items-center gap-1 active:text-white">My List</Link>
                <a href={`${import.meta.env.VITE_API_URL}/admin`} className="flex flex-col items-center gap-1 active:text-white text-red-500">Admin</a>
            </div>
        </nav>
    );
};
export default Navbar;
