from tweepy import OAuthHandler
from tweepy import Stream
from .stream_listener import StreamListener
import os
import threading
import sys, getopt
import pymongo
from pymongo import MongoClient

class Main:
    def prepare_table(self, table):
        client = MongoClient('localhost', 27017)
        db = client.event_detection        
        
        if table not in db.collection_names():
            db[table].create_index([("id", pymongo.DESCENDING)], unique=True)

        return

    def stream(self, tweet_method='filter', keywords=None, lan_code=None, locations=None, user_id=None, table=None, consumer_key=None, consumer_secret=None, access_token=None, access_token_secret=None, category='blank'):        
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        if table == None:
            table = 'tweet'
        else :
            self.prepare_table(table)
        
        while True:
            try:
                myStream = Stream(auth, StreamListener(table, category))
                if tweet_method == 'stream':
                    myStream.sample()
                elif tweet_method == 'filter':
                    track_arg = None
                    follow_arg = None
                    locations_arg = None
                    languages_arg = None

                    if keywords != None:
                        track_arg = keywords.split(',')
                    if user_id != None:
                        follow_arg = user_id.split(',')
                    if locations != None:
                        locations = locations.split(';')
                        location_new = []
                        for row in locations:
                            coordinates = row.split(',')
                            for  coor in coordinates:
                                location_new.append(float(coor))
                        locations_arg = location_new
                    if lan_code != None:
                        languages_arg = lan_code

                    myStream.filter(track=track_arg, follow=follow_arg, locations=locations_arg, languages=languages_arg)

            except Exception as e:
                print("Error Occured " + str(e))
                continue

class myThread (threading.Thread):
    def __init__(self, threadID):
        threading.Thread.__init__(self)
        self.threadID = threadID

    def run(self):
        print("Starting " + self.name)
        event = Main()
        event.stream()
        print("Exiting " + self.name)