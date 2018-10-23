import pymongo
from pymongo import MongoClient
from django.http import JsonResponse
import json
from bson import json_util
from celery.result import AsyncResult
from djamongo.tasks import crawl_data
from celery.task.control import revoke
from djamongo.celery import app

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
		#'calculate_sentiment': 0,
	}

	return JsonResponse(response)

def refresh_task(request):
	client = MongoClient('localhost', 27017)
	db = client.djamongo
	col = db['twitter_workerjobs']

	data = col.find()
	print(data)

	tasks = []
	for row in data:
		task_data = {}
		result = crawl_data.AsyncResult(row['task_id'])
		col.update_one({'_id':row['_id']}, {"$set": {'task_status': result.state}}, upsert=False)
		task_data = {
			'id': row['task_id'],
			'status': result.state
		}
		tasks.append(task_data)

	response = {
		'result': tasks,
	}

	return JsonResponse(response)

def stop_task(request, task_id):
	result = crawl_data.AsyncResult(task_id)
	result.revoke(terminate=True, signal='QUIT')
	app.control.revoke(task_id ,terminate=True)
	app.control.shutdown()

	response = {
		'result': 'success',
	}

	return JsonResponse(response)