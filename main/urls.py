from django.urls import path
from . import views
urlpatterns = [
    path('', views.home, name='home'),
    path('tsunami', views.tsunami, name='tsunami'),
    path('weather', views.weather, name='weather'),
    path('tsunami/res', views.search_res, name='tsunami_res'),
    path('earthquake', views.earthquake, name='earthquake'),
    path('temperature_dash', views.temperature_dash, name='temperature_dash'),
    path('earthquake_dash', views.earthquake_dash, name='earthquake_dash'),

]
