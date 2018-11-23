from django.shortcuts import render
from django.http import HttpResponse
from pymongo import MongoClient
from .models import CleanData
# Create your views here.
def index_positive(request):
	positive = CleanData.objects.all()
	context = {'title_page' : 'Sentiment Positive', 'positive' : positive}
	return render(request, 'positive/index.html', context = context)

def index_negative(request):
	negative = CleanData.objects.all()
	context = {'title_page' : 'Sentiment Negative', 'negative' : negative}
	return render(request, 'negative/index.html', context = context)

def index_netral(request):
	neutral = CleanData.objects.all()
	context = {'title_page' : 'Sentiment Neutral', 'neutral' : neutral}
	return render(request, 'netral/index.html', context = context)

