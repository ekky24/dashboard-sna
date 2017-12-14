from pymongo import MongoClient
from random import choices
from numpy import random, unique
from string import ascii_uppercase, ascii_lowercase, digits
from datetime import datetime 

MATCHED_TAG_PROBABILITY = 0.76
UNMATCHED_TAG_PROBABILITY = (1 - MATCHED_TAG_PROBABILITY) / 27

tags = 	['CC', 'CD', 'OD', 'DT', 'FW', 'IN', 'JJ', 'MD', 'NEG', 'NN', 'NNP', 'NND',
		'PR', 'PRP', 'RB', 'RP', 'SC', 'SYM', 'UH', 'VB', 'WH', 'X', 'Z', 'AT',
		'DISC', 'HASH', 'URL', 'EMO'] 

# make probability dictionary
probability_dict = dict((tag, [UNMATCHED_TAG_PROBABILITY] * 28) for tag in tags)
for t in range(0, len(tags)):
	probability_dict[tags[t]][t] = MATCHED_TAG_PROBABILITY

# create guest users
users = []
for u in range(0,10):
	users.append('user' + ''.join(choices(ascii_lowercase + ascii_uppercase + digits, k=14)))

# fill review
client = MongoClient('192.168.228.163', 27017)
db = client['djamongo']

evaluation_collection = db.postagger_evaluation
evaluations = evaluation_collection.find()

for evaluation in evaluations:
	auto_tagged = evaluation['auto_tag']
	sentence_review_results = []
	
	for user in users:
		user_review = {
			'user_id': user,
			'created_at': datetime.now().isoformat(),
			'tag': None
		}
		user_tagged = []
		
		for word_tag in auto_tagged:
			user_tagged.append({
				'word': word_tag['word'],
				'tags': word_tag['tags'][:2] + random.choice(tags, 1, p=probability_dict[word_tag['tags'][2:]])[0]
			})
			
		user_review['tag'] = user_tagged
		sentence_review_results.append(user_review)
	
	oid = evaluation['_id']
	evaluation_collection.update({
		'_id': oid
	},
	{
		'$push': {
			'verify_tag': {
				'$each': sentence_review_results
			}
		}
	})
	
# query to remove verify_tag field
# db.postagger_evaluation.update({verify_tag:{$exists: true}},{$unset:{verify_tag: 1}},{multi: true})	