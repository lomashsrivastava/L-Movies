import { useLocation } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';

const Movies = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const genre = queryParams.get('genre');

    return (
        <div className="min-h-screen bg-[#141414] text-white pt-24 px-4 md:px-12">
            <h1 className="text-3xl font-bold mb-8 capitalize border-l-4 border-red-600 pl-4">
                {genre ? `${genre} Movies` : 'All Movies'}
            </h1>

            <MovieGrid genre={genre} />

            {!genre && (
                <div className="mt-12 text-center text-gray-500">
                    <p>Showing all available titles.</p>
                </div>
            )}
        </div>
    );
};

export default Movies;
