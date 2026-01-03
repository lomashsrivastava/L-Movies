from django.core.management.base import BaseCommand
from apps.movies.models import Movie
from django.utils import timezone
import random

class Command(BaseCommand):
    help = 'Seeds the database with initial movie data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        movies_data = [
            {
                "title": "Inception",
                "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "year": 2010,
                "rating": 8.8,
                "genres": ["Action", "Sci-Fi", "Thriller"],
                "poster_url": "https://image.tmdb.org/t/p/w500/9gk7admal4zlWH9tF5UUy1EuJDg.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=YoHD9XEInc0",
                "trending": True,
                "featured": True
            },
            {
                "title": "Interstellar",
                "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                "year": 2014,
                "rating": 8.6,
                "genres": ["Adventure", "Drama", "Sci-Fi"],
                "poster_url": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=zSWdZVtXT7E",
                "trending": True,
                "featured": False
            },
            {
                "title": "The Dark Knight",
                "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "year": 2008,
                "rating": 9.0,
                "genres": ["Action", "Crime", "Drama"],
                "poster_url": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=EXeTwQWrcwY",
                "trending": True,
                "featured": True
            },
            {
                "title": "Avatar",
                "description": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
                "year": 2009,
                "rating": 7.8,
                "genres": ["Action", "Adventure", "Fantasy"],
                "poster_url": "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=5PSNL1qE6VY",
                "trending": False,
                "featured": False
            },
            {
                "title": "The Matrix",
                "description": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
                "year": 1999,
                "rating": 8.7,
                "genres": ["Action", "Sci-Fi"],
                "poster_url": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
                "trending": True,
                "featured": False
            },
            {
                "title": "Avengers: Endgame",
                "description": "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
                "year": 2019,
                "rating": 8.4,
                "genres": ["Action", "Adventure", "Sci-Fi"],
                "poster_url": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=TcMBFSGVi1c",
                "trending": True,
                "featured": True
            },
             {
                "title": "Spider-Man: Into the Spider-Verse",
                "description": "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
                "year": 2018,
                "rating": 8.4,
                "genres": ["Animation", "Action", "Adventure"],
                "poster_url": "https://image.tmdb.org/t/p/w500/znODHp5dxO350DgE4HCNazG0bfC.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=g4Hbz2jLxvQ",
                "trending": False,
                "featured": False
            },
             {
                "title": "Coco",
                "description": "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
                "year": 2017,
                "rating": 8.4,
                "genres": ["Animation", "Adventure", "Family"],
                "poster_url": "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
                "trailer_url": "https://www.youtube.com/watch?v=Ga6RYezwqKY",
                "trending": False,
                "featured": False
            }
        ]

        for movie_data in movies_data:
            if not Movie.objects.filter(title=movie_data['title']).exists():
                Movie.objects.create(**movie_data)
                self.stdout.write(self.style.SUCCESS(f"Created movie: {movie_data['title']}"))
            else:
                 self.stdout.write(self.style.WARNING(f"Skipped existing movie: {movie_data['title']}"))

        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully.'))
