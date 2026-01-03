from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from .models import Movie
from .serializers import MovieSerializer

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-created_at')
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'genres']
    ordering_fields = ['year', 'rating', 'created_at']
    
    @action(detail=False, methods=['get'], url_path='fetch-metadata')
    def fetch_metadata(self, request):
        title = request.query_params.get('title')
        if not title:
            return Response({'error': 'Title is required'}, status=400)
        
        from .utils import fetch_movie_data
        data = fetch_movie_data(title)
        
        if data:
            return Response(data)
        return Response({'error': 'Movie not found'}, status=404)

    def get_queryset(self):
        queryset = super().get_queryset()
        genre = self.request.query_params.get('genre')
        if genre:
            # Attempting to filter by genre presence in the JSON list
            queryset = queryset.filter(genres__icontains=genre)
        
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            queryset = queryset.filter(featured=True)
            
        trending = self.request.query_params.get('trending')
        if trending == 'true':
            queryset = queryset.filter(trending=True)
            
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search) | 
                models.Q(description__icontains=search) |
                models.Q(genres__icontains=search)
            )

        return queryset
