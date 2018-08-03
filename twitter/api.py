import pymongo
from pymongo import MongoClient
from django.http import JsonResponse
import json
from bson import json_util

def refresh_data(request, table, limit=10):
	client = MongoClient('localhost', 27017)
	db = client.event_detection
	col = db[table]

	tweet = col.find({}, {'id': 1, 'text':1, 'sentiment': 1, '_id': 0}).sort([('_id', pymongo.DESCENDING)]).limit(int(limit))
	calculate = col.aggregate([{"$group": {"_id": "$sentiment", "count": {"$sum": 1}}}])

	tweet_sentiment = []
	calculate_sentiment = []
	for row in tweet:
		temp = {}
		temp['id'] = str(row['id'])
		temp['text'] = row['text']
		temp['sentiment'] = row['sentiment']
		tweet_sentiment.append(temp)

	for row in calculate:
		temp = {}
		temp['_id'] = row['_id']
		temp['count'] = row['count']
		calculate_sentiment.append(temp)

	response = {
		'get_sentiment': tweet_sentiment,
		'calculate_sentiment': calculate_sentiment,
	}

	return JsonResponse(response)