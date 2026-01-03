from django.contrib import admin
from django import forms
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Movie

class MovieAdminForm(forms.ModelForm):
    # Predefined Genres List
    GENRE_CHOICES = [
        ('Action', 'Action'),
        ('Adventure', 'Adventure'),
        ('Animation', 'Animation'),
        ('Comedy', 'Comedy'),
        ('Crime', 'Crime'),
        ('Documentary', 'Documentary'),
        ('Drama', 'Drama'),
        ('Family', 'Family'),
        ('Fantasy', 'Fantasy'),
        ('History', 'History'),
        ('Horror', 'Horror'),
        ('Music', 'Music'),
        ('Mystery', 'Mystery'),
        ('Romance', 'Romance'),
        ('Sci-Fi', 'Sci-Fi'),
        ('Thriller', 'Thriller'),
        ('War', 'War'),
        ('Western', 'Western'),
        ('Web Series', 'Web Series'),
        ('TV Show', 'TV Show'),
    ]

    GENRE_CHOICES.sort() # Keep them sorted alphabetically

    # Predefined Languages List
    LANGUAGE_CHOICES = [
        ('Hindi', 'Hindi'),
        ('Dual Audio', 'Dual Audio'),
        ('English', 'English'),
        ('Chinese', 'Chinese'),
        ('South', 'South'),
        ('Malayalam', 'Malayalam'),
        ('Japanese', 'Japanese'),
        ('Korean', 'Korean'),
    ]

    genres = forms.MultipleChoiceField(
        choices=GENRE_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        help_text="Select one or more genres.",
        required=False
    )

    languages = forms.MultipleChoiceField(
        choices=LANGUAGE_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        help_text="Select one or more languages.",
        required=False
    )

    class Meta:
        model = Movie
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Pre-select existing genres and languages
        if self.instance and self.instance.pk:
            if isinstance(self.instance.genres, list):
                self.initial['genres'] = self.instance.genres
            if hasattr(self.instance, 'languages') and isinstance(self.instance.languages, list):
                self.initial['languages'] = self.instance.languages

    def clean_genres(self):
        return self.cleaned_data['genres']

    def clean_languages(self):
        return self.cleaned_data['languages']

# Custom Filter for Assets
class AssetStatusFilter(admin.SimpleListFilter):
    title = 'Asset Status'
    parameter_name = 'asset_status'

    def lookups(self, request, model_admin):
        return (
            ('missing_download', 'Missing Download Link'),
            ('missing_poster', 'Missing Poster'),
            ('complete', 'Complete (Ready)'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'missing_download':
            return queryset.filter(models.Q(download_url__isnull=True) | models.Q(download_url__exact=''))
        if self.value() == 'missing_poster':
            return queryset.filter(models.Q(poster_url__isnull=True) | models.Q(poster_url__exact=''))
        if self.value() == 'complete':
            return queryset.exclude(download_url__isnull=True).exclude(download_url__exact='').exclude(poster_url__isnull=True).exclude(poster_url__exact='')
        return queryset

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    form = MovieAdminForm
    
    # ADVANCED: Quick Edit from List View
    list_display = ('display_poster_small', 'title', 'year', 'rating', 'featured', 'trending', 'has_download', 'delete_action')
    list_editable = ('rating', 'featured', 'trending') # Edit these directly in the list!
    
    # ADVANCED: Filters
    list_filter = ('featured', 'trending', AssetStatusFilter, 'year', 'created_at')
    
    search_fields = ('title', 'description')
    ordering = ('-created_at',)
    save_on_top = True # Save button at top too
    actions = ['make_trending', 'unmake_trending', 'make_featured', 'unmake_featured']

    # Inject custom JS for auto-fill
    class Media:
        js = ('admin/js/auto_fill_movie.js',)

    # Simple, clean layout
    fieldsets = (
        ('Reference', {
            'fields': ('title', 'year', 'rating', 'genres', 'languages', 'description')
        }),
        ('Downloads & Media', {
            'fields': ('download_url', 'poster_url', 'trailer_url'),
            'description': "Add your download links and images here."
        }),
        ('Screenshots', {
            'fields': ('screenshot_1', 'screenshot_2', 'screenshot_3', 'screenshot_4', 'screenshot_5'),
            'description': "Add up to 5 screenshot URLs to display on the movie detail popup."
        }),
        ('Visibility', {
            'fields': ('featured', 'trending'),
            'description': "Quickly toggle where this movie appears."
        }),
    )

    def has_download(self, obj):
        return bool(obj.download_url)
    has_download.boolean = True
    has_download.short_description = "DL Ready"

    def display_poster_small(self, obj):
        if obj.poster_url:
            return format_html('<img src="{}" style="width: 30px; height: 45px; object-fit: cover; border-radius: 2px;" />', obj.poster_url)
        return ""
    display_poster_small.short_description = "Img"

    def delete_action(self, obj):
        delete_url = reverse('admin:movies_movie_delete', args=[obj.pk])
        return format_html('<a class="button" href="{}" style="background-color: #ba2121; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-size: 11px;">DELETE</a>', delete_url)
    delete_action.short_description = "Actions"
    delete_action.allow_tags = True

    # Custom Actions
    def make_trending(self, request, queryset):
        rows_updated = queryset.update(trending=True)
        self.message_user(request, f"{rows_updated} movies marked as trending.")
    make_trending.short_description = "Mark selected as Trending"

    def unmake_trending(self, request, queryset):
        rows_updated = queryset.update(trending=False)
        self.message_user(request, f"{rows_updated} movies removed from trending.")
    unmake_trending.short_description = "Remove selected from Trending"

    def make_featured(self, request, queryset):
        rows_updated = queryset.update(featured=True)
        self.message_user(request, f"{rows_updated} movies marked as featured.")
    make_featured.short_description = "Mark selected as Featured"

    def unmake_featured(self, request, queryset):
        rows_updated = queryset.update(featured=False)
        self.message_user(request, f"{rows_updated} movies removed from featured.")
    unmake_featured.short_description = "Remove selected from Featured"

