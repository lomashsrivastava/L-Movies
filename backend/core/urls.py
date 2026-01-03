from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

def api_root(request):
    return JsonResponse({
        "message": "Welcome to L-MOVIES API",
        "available_endpoints": {
            "movies": "/api/movies/",
            "auth_login": "/api/auth/login/",
            "auth_register": "/api/auth/register/",
            "watchlist": "/api/watchlist/",
            "admin": "/admin/"
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api_root'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/', include('apps.users.urls')), # This brings in register/
    path('api/movies/', include('apps.movies.urls')),
    path('api/watchlist/', include('apps.watchlist.urls')),
    path('api/users/', include('apps.users.urls')),
]
