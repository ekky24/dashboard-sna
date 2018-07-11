from pymongo import *
import time
import redis
import environ
import os

root = environ.Path(__file__) - 3 # three folder back (/a/b/c/ - 3 = /)
env = environ.Env(DEBUG=(bool, False),) # set default values and casting
environ.Env.read_env() # reading .env file

try:
    conn = redis.StrictRedis(
        host='127.0.0.1',
        port=6379,
        password='')
    conn.ping()
    print('Connected!')
except Exception as ex:
    print('Error:', ex)
    exit('Failed to connect, terminating.')

client = MongoClient('localhost', 27017)
db = client.djamongo

postagger = db.postagger_evaluation

all_data = postagger.find({'verify_tag': {'$exists': True},
				'model_name': str(env('MODEL_NAME')), 'model_version': str(env('MODEL_VERSION'))})

true_overall = 0
count_overall = 0
true_iobes = 0
true_pos = 0
total_evaluated = 0

for row in all_data:
	total_evaluated += 1
	for verify in row['verify_tag']:
		for tag_index in range(len(verify['tag'])):
			auto_tag = row['auto_tag'][tag_index]
			verify_tag = verify['tag'][tag_index]

			try:
				iobes_auto = auto_tag['tags'][:1]
				iobes_verify = verify_tag['tags'][:1]
				pos_auto = auto_tag['tags'][2:]
				pos_verify = verify_tag['tags'][2:]
			except(KeyError):
				print("KeyError")
			else:
				""" Overall Calculation """
				if(auto_tag['tags'] == verify_tag['tags']):
					true_overall += 1

				""" IOBES Calculation """
				if(iobes_auto == iobes_verify):
					true_iobes += 1

				""" POS Calculation """
				if(pos_auto == pos_verify):
					true_pos += 1

				count_overall += 1

overall_accuracy = (true_overall / count_overall)
iobes_accuracy = (true_iobes / count_overall)
pos_accuracy = (true_pos / count_overall)

conn.set("total_evaluated", total_evaluated)
conn.set("overall_accuracy", overall_accuracy)
conn.set("iobes_accuracy", iobes_accuracy)
conn.set("pos_accuracy", pos_accuracy)

print("\n\n---------------------------------")
print("Total Evaluated: " + str(total_evaluated))
print("Overall: " + str(overall_accuracy))
print("IOBES: " + str(iobes_accuracy))
print("POS: " + str(pos_accuracy))