from json import loads
from bson.objectid import ObjectId
from datetime import datetime
from random import randrange

from django.http import JsonResponse, HttpResponse
from users.models import User
from .models import Evaluation
from .rule import sanitize_tags
import environ
import redis

root = environ.Path(__file__) - 2 # three folder back (/a/b/c/ - 3 = /)
env = environ.Env(DEBUG=(bool, False),) # set default values and casting
environ.Env.read_env(root('djamongo/.env')) # reading .env file

def on_fetch (request, userid):
	response = {'unevaluated':None}
	
	# if there is session with such user id exists already
	if ('user_id' in request.session):
		# get user id
		this_user_id = request.session['user_id']
		if (request.user.is_authenticated()):
			this_user_id = User.objects.get(username=userid).id
		
		# search sentence that is not evaluated by this user yet
		search_criteria = {
			'$or': [{
				'verify_tag': {'$exists': False}
			}, {
				'$and': [
					{ 'verify_tag': {'$exists': True} }, 
					{ 'verify_tag.user_id': { 
						'$ne': this_user_id
					}},
					{'$where':'this.verify_tag.length<10'}
				]
			}]
		}
		
		unevaluated_sentences = Evaluation.objects.mongo_find(search_criteria)
		unevaluated_total = unevaluated_sentences.count()
		
		# if there are unevaluated
		if (unevaluated_total > 0):
			sentence = unevaluated_sentences[randrange(0, unevaluated_total)]
			sentence['_id'] = str(sentence['_id'])
			sanitize_tags(sentence['auto_tag'])
			response['unevaluated'] = sentence
			
	return JsonResponse(response)

def on_submit (request):
	response_code = 404
	if (request.method == 'POST'):
		response_code = 200
		
		evaluation_result = loads(request.body.decode('utf-8'))
		this_user_id = evaluation_result['user']
		if (request.user.is_authenticated()):
			this_user_id = request.session['user_number_id']
		
		Evaluation.objects.mongo_update({
			'_id': ObjectId(evaluation_result['oid'])
		}, 
		{
			'$push': {
				'verify_tag': {
					'user_id': this_user_id,
					'created_at': datetime.now().isoformat(),
					'tag': evaluation_result['eval']
				}
			}
		})
		
	return HttpResponse(status=response_code)	
	
def on_overview_requested (request):
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

	response = {
		"evaluated_total": float(conn.get('total_evaluated')),
		"accuracy_pos": float(conn.get('pos_accuracy')),
		"accuracy_iobes": float(conn.get('iobes_accuracy')),
		"accuracy_total": float(conn.get('overall_accuracy')),
		"model_name": str(env('MODEL_NAME')),
		"model_version": str(env('MODEL_VERSION'))
	}

	return JsonResponse(response)
	'''

def on_search_id(request, searchid):
	print(searchid)
	all_matched = Evaluation.objects.mongo_find({'verify_tag': {'$exists': True}, '_id': ObjectId(searchid)})
	sentence = ""
	for row in all_matched:
		sentence = row['sentence']
		auto_tag = row['auto_tag']
		verify_tag = row['verify_tag']
	average_sentence = 0
	acsentence = 0
	# calculate accuracy for each word
	for t in range(0, len(auto_tag)):
		right_tag = sum([1 for a in range(0, len(verify_tag)) if auto_tag[t]['tags'] == verify_tag[a]['tag'][t]['tags']])
		auto_tag[t]['accuracy'] = right_tag / len(verify_tag)
		acsentence += auto_tag[t]['accuracy']
		average_sentence = acsentence / len(auto_tag)

	#calculate accuracy for IOBES
	average_iobes = 0
	aciobes = 0
	for u in range(0, len(auto_tag)):
		right_tag1 = sum([1 for b in range(0, len(verify_tag)) if auto_tag[u]['tags'][:1] == verify_tag[b]['tag'][u]['tags'][:1]])
		auto_tag[u]['accuracy_iobes'] = right_tag1 / len(verify_tag)
		aciobes += auto_tag[u]['accuracy_iobes']
		average_iobes = aciobes / len(auto_tag)

	#calculate accuracy for POS
	average_pos = 0
	acpos = 0
	for v in range(0, len(auto_tag)):
		right_tag2 = sum([1 for c in range(0, len(verify_tag)) if auto_tag[v]['tags'][2:] == verify_tag[c]['tag'][v]['tags'][2:]])
		auto_tag[v]['accuracy_pos'] = right_tag2 / len(verify_tag)
		acpos += auto_tag[v]['accuracy_pos']
		average_pos = acpos / len(auto_tag)


	response = {
		'sentence': sentence,
		'auto_tag': auto_tag,
		'verify_tag': verify_tag,
		'accuracy': average_sentence,
		'accuracy_iobes': average_iobes,
		'accuracy_pos': average_pos
	}

	return JsonResponse(response)

	
def on_search_requested (request, searchkey, status, page):
	
	search_criteria = {
		'$and': [
			{'sentence': {'$exists': True}}
		]
	}

	if (searchkey != ''):
		search_criteria['$and'][0]['sentence'] = {
			'$regex': '.*' + searchkey.replace("%20", " ") + '.*', 
			'$options': 'i'
		}
	
	if (status in ('pending','completed')):
		search_criteria['$and'].append({'status': status})
	
	sentences_per_page = 10
	response = {
		'matched': list(),
		'max_page': 0,
		'accuracy': list(),
	}
	
	all_matched = Evaluation.objects.mongo_find(search_criteria)
	response['max_page'] = (all_matched.count() // sentences_per_page) + 1
	sentences_searched = all_matched.skip((int(page) - 1) * sentences_per_page).limit(sentences_per_page)
	
	for sentence in sentences_searched:
		sentence['_id'] = str(sentence['_id'])
		response['matched'].append(sentence)
		auto_tagged = sentence['auto_tag']
		
		if 'verify_tag' not in sentence:
			continue
			
		reviews = sentence['verify_tag']

		# calculate accuracy for each word
		calsentence = 0
		averagetagged = 0
		for t in range(0, len(auto_tagged)):
			right_tag = sum([1 for a in range(0, len(reviews)) if auto_tagged[t]['tags'] == reviews[a]['tag'][t]['tags']])
			auto_tagged[t]['accuracy'] = right_tag / len(reviews)
			calsentence += auto_tagged[t]['accuracy']
			averagetagged = calsentence / len(auto_tagged)

		response['accuracy'].append(averagetagged)
		#del sentence['verify_tag']
		
	return JsonResponse(response)