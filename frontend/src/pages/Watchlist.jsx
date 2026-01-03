import { Link } from 'react-router-dom';

const Watchlist = () => {
    return (
        <div className="min-h-screen bg-[#141414] text-white pt-24 px-4 md:px-12 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">My List</h1>
            <p className="text-gray-400 mb-8">Your watchlist is currently empty.</p>

            <Link to="/movies" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold transition">
                Browse Movies
            </Link>
        </div>
    );
};

export default Watchlist;
