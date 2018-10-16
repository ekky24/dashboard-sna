from tweepy.streaming import StreamListener
from datetime import datetime
import pymongo
from pymongo import MongoClient
import json
import requests
import bson

class StreamListener(StreamListener):
    counter = 0

    def __init__(self, table, category):
        client = MongoClient()
        db = client.event_detection        
        self.col = db[table]

        """self.url = "http://api.informatika.lipi.go.id/7ac49b48-3002-4795-b376-bc06709b3721/sentiment"
        if(category == 'telco'):
            self.url += '/telco'
        elif(category == 'fnb'):
            self.url += '/fnb'
        """

    def on_data(self, data):
        try:            
            tweet = json.loads(data)
        except requests.exceptions.ReadTimeout:
            print("ReadTimeout Occured")
            return

        # print(tweet)
        if "text" in tweet:
            try:
                """r = requests.post(self.url, data = {'content-type': 'application/json', 'sentence': tweet['text'], 'id': tweet['id']})
                sentiment = r.json()['sentiment']

                if(sentiment == 'positive' or sentiment == 'positif'):
                    sentiment = 'positive'
                elif(sentiment == 'neutral' or sentiment == 'netral'):
                    sentiment = 'neutral'
                elif(sentiment == 'negative' or sentiment == 'negatif'):
                    sentiment = 'negative'

                tweet['sentiment'] = sentiment"""
                tweet['timestamp_ms'] = bson.Int64(tweet['timestamp_ms'])
                
                self.col.insert_one(tweet)                
            except pymongo.errors.DuplicateKeyError:
                pass
            except Exception as ex:
                template = "An exception of type {0} occurred. Arguments:\n{1!r}"
                message = template.format(type(ex).__name__, ex.args)
                print(message)

    def on_connect(self):
        self.counter = 0
        self.start_time = datetime.now()

    def on_error(self, status):
        print(status)

    def on_timeout(self):
        print("Timeout Occured")
