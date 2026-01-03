from rest_framework import serializers
from .models import Watchlist
from apps.movies.serializers import MovieSerializer

class WatchlistSerializer(serializers.ModelSerializer):
    movie_details = MovieSerializer(source='movie', read_only=True)
    
    class Meta:
        model = Watchlist
        fields = ['id', 'user', 'movie', 'movie_details', 'added_at']
        extra_kwargs = {
            'user': {'read_only': True}
        }
