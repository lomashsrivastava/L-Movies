from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255, help_text="The name of the movie")
    description = models.TextField(help_text="Short summary of the plot", blank=True)
    genres = models.JSONField(default=list, help_text="List of genres e.g. ['Action', 'Sci-Fi']") 
    languages = models.JSONField(default=list, help_text="List of available languages e.g. ['Hindi', 'English']") 
    rating = models.FloatField(default=0.0, help_text="IMDb rating (0-10)")
    year = models.IntegerField(help_text="Release year")
    
    # Media
    poster_url = models.URLField(help_text="Link to the poster image")
    trailer_url = models.URLField(help_text="Link to YouTube trailer or video file", blank=True, null=True)
    download_url = models.URLField(help_text="Direct download link for the movie file", blank=True, null=True)

    # Screenshots
    screenshot_1 = models.URLField(blank=True, null=True, help_text="Screenshot URL 1")
    screenshot_2 = models.URLField(blank=True, null=True, help_text="Screenshot URL 2")
    screenshot_3 = models.URLField(blank=True, null=True, help_text="Screenshot URL 3")
    screenshot_4 = models.URLField(blank=True, null=True, help_text="Screenshot URL 4")
    screenshot_5 = models.URLField(blank=True, null=True, help_text="Screenshot URL 5")
    
    # Status
    featured = models.BooleanField(default=False, help_text="Show in the big banner?")
    trending = models.BooleanField(default=False, help_text="Show in 'Trending Now'?")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
