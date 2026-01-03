from imdb import Cinemagoer
import requests
import re

def fetch_movie_data(title):
    print(f"Searching for: {title}")
    data = None
    ia = Cinemagoer()

    # Check if input is an IMDb ID or URL
    imdb_id_match = re.search(r'tt\d{7,8}', title)
    
    if imdb_id_match:
        imdb_id = imdb_id_match.group(0)[2:] # Remove 'tt'
        print(f"Detected IMDb ID: {imdb_id}")
        try:
            movie = ia.get_movie(imdb_id)
            ia.update(movie, info=['main', 'plot', 'vote details'])
            
            description = ''
            if movie.get('plot'):
                description = movie.get('plot')[0].split('::')[0] 
            elif movie.get('plot summary'):
                description = movie.get('plot summary')[0]
                
            data = {
                'title': movie.get('title'),
                'year': movie.get('year'),
                'rating': movie.get('rating'),
                'description': description,
                'poster_url': movie.get('cover url'),
                'genres': movie.get('genres', []),
                'languages': movie.get('languages', []),
            }
            return data
        except Exception as e:
            print(f"IMDb ID lookup failed: {e}")

    # Priority 1: IMDb Search (Cinemagoer)
    try:
        search_results = ia.search_movie(title)
        
        if search_results:
            movie = search_results[0]
            print(f"Found on IMDb: {movie['title']} ({movie.get('year')})")
            
            ia.update(movie, info=['main', 'plot', 'vote details'])
            
            description = ''
            if movie.get('plot'):
                description = movie.get('plot')[0].split('::')[0] 
            elif movie.get('plot summary'):
                description = movie.get('plot summary')[0]
                
            data = {
                'title': movie.get('title'),
                'year': movie.get('year'),
                'rating': movie.get('rating'),
                'description': description,
                'poster_url': movie.get('cover url'),
                'genres': movie.get('genres', []),
                'languages': movie.get('languages', []),
            }
            return data
    except Exception as e:
        print(f"IMDb search failed: {e}")

    # Priority 2: OMDb (Fallback)
    try:
        print("Falling back to OMDb...")
        api_key = 'trilogy'
        url = f"http://www.omdbapi.com/?t={title}&apikey={api_key}"
        
        response = requests.get(url, timeout=5)
        omdb_data = response.json()
        
        if omdb_data.get('Response') == 'True':
            print(f"Found on OMDb: {omdb_data.get('Title')}")
            data = {
                'title': omdb_data.get('Title'),
                'year': omdb_data.get('Year', '').split('–')[0],
                'rating': omdb_data.get('imdbRating'),
                'description': omdb_data.get('Plot'),
                'poster_url': omdb_data.get('Poster'),
                'genres': [g.strip() for g in omdb_data.get('Genre', '').split(',')],
                'languages': [l.strip() for l in omdb_data.get('Language', '').split(',')],
            }
            
            if data['poster_url'] == 'N/A': data['poster_url'] = ''
            if data['rating'] == 'N/A': data['rating'] = 0.0
            
            return data
    except Exception as e:
        print(f"OMDb search failed: {e}")

    return None
