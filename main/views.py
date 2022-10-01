from django.shortcuts import render
from csv import DictReader
# Create your views here.
file_handle = open('main/tsunami_dataset.csv', 'r', encoding='utf8')
csv_reader = DictReader(file_handle)


def home(request):
    return render(request, 'home.html')


def search_res(request):
    query = request.GET.get('query')
    ones =[]
    if query:
        for row in csv_reader:
            if row['YEAR'] == query:
                ones.append(row)
    data = {'ones': ones}
    return render(request, 'search_res.html', data)


def tsunami(request):
    return render(request, 'tsunami.html')


def weather(request):
    return render(request, 'weather.html')


def earthquake(request):
    return render(request, 'earthquake.html')

    
def temperature_dash(request):
    return render(request, 'temperature_dash/earthquake_dash.html')

def earthquake_dash(request):
    return render(request, 'earthquake_dash/earthquake_dash.html')