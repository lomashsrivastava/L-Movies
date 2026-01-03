import { useState } from 'react';
import Banner from '../components/Banner';
import MovieGrid from '../components/MovieGrid';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="bg-[#141414] min-h-screen pb-20 relative">
            {/* Header with Search */}
            <div className="absolute top-0 left-0 w-full z-50 p-6 flex flex-col md:flex-row justify-between items-center bg-gradient-to-b from-black/90 to-transparent gap-4">
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                    <h1 className="text-4xl font-extrabold text-red-600 tracking-tighter cursor-pointer" onClick={() => window.location.reload()}>L-MOVIES</h1>

                    {/* Admin Link (Desktop) */}
                    <a href={`${import.meta.env.VITE_API_URL}/admin`} target="_blank" rel="noopener noreferrer" className="hidden md:block text-gray-300 hover:text-white text-xs font-bold border border-gray-500 px-3 py-1 rounded hover:bg-white/10 transition">
                        ADMIN
                    </a>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="w-full bg-black/50 border border-gray-600 text-white px-4 py-2 rounded-full focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition backdrop-blur-md pl-10 placeholder-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            {/* Show Banner only when NOT searching */}
            {!searchQuery && <Banner />}

            <div className={`container mx-auto px-4 md:px-12 ${searchQuery ? 'mt-32' : 'mt-[-100px]'} relative z-20 space-y-12 transition-all duration-500`}>

                {searchQuery ? (
                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-red-600 pl-4">Results for "{searchQuery}"</h2>
                        <MovieGrid searchQuery={searchQuery} />
                    </section>
                ) : (
                    <>
                        {/* Featured Collection Row */}
                        <section>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 hover:text-red-500 transition duration-300 w-fit flex items-center gap-2">
                                <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                                Featured Collection
                            </h2>
                            <MovieGrid filterType="featured" />
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 hover:text-red-500 transition duration-300 w-fit flex items-center gap-2">
                                Trending Now
                            </h2>
                            <MovieGrid filterType="trending" />
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 hover:text-red-500 transition duration-300 w-fit flex items-center gap-2">
                                New Releases
                            </h2>
                            <MovieGrid filterType="new" />
                        </section>
                    </>
                )}
            </div>
        </div>
    )
}
export default Home;
