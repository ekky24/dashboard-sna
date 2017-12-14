from json import loads
from bson.objectid import ObjectId
from datetime import datetime
from random import randrange

from django.http import JsonResponse, HttpResponse
from users.models import User
from .models import Evaluation
from .rule import sanitize_tags

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
					{'verify_tag.length': {
						'$lt': 10
					}}
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
	sentences_evaluated = Evaluation.objects.mongo_find({'verify_tag': {'$exists': True}})
	response = {
		"evaluated_total": sentences_evaluated.count(),
		"accuracy_pos": 0,
		"accuracy_iobes": 0,
		"accuracy_total": 0
	}
	
	right_pos, right_iobes, right_iobes_pos, total_word_reviewed = 0, 0, 0, 0
	
	for document in sentences_evaluated:
		auto_tagged = document['auto_tag']
		reviews = document['verify_tag']
		total_word_reviewed += len(auto_tagged) * len(reviews)
		
		for review in reviews:
			tag_review = review['tag']
			
			# calculate how many is auto tag is equal to user proposed tag
			right_iobes_pos += sum([1 for a in range(0, len(tag_review)) if tag_review[a]['tags'] == auto_tagged[a]['tags'] ])
			right_iobes += sum([1 for a in range(0, len(tag_review)) if tag_review[a]['tags'][:1] == auto_tagged[a]['tags'][:1] ])
			right_pos += sum([1 for a in range(0, len(tag_review)) if tag_review[a]['tags'][2:] == auto_tagged[a]['tags'][2:] ])
			
	# calculate accuracy
	response['accuracy_pos'] = right_pos / max(1, total_word_reviewed)
	response['accuracy_iobes'] = right_iobes / max(1, total_word_reviewed)
	response['accuracy_total'] = right_iobes_pos / max(1, total_word_reviewed)
	
	return JsonResponse(response)
	
def on_search_requested (request, searchkey, status, page):
	search_criteria = {
		'$and': [
			{'sentence': {'$exists': True}},
			{'status': {'$exists': True}}
		]
	}

	if (searchkey != ''):
		search_criteria['$and'][0]['sentence'] = {'$regex': '.*' + searchkey + '.*'}
	
	if (status in ('pending','completed')):
		search_criteria['$and'][1]['status'] = status

	response = {"matched": list()}
	sentences_searched = Evaluation.objects.mongo_find(search_criteria).skip((int(page) - 1) * 10).limit(10)
	
	for sentence in sentences_searched:
		sentence['_id'] = str(sentence['_id'])
		response['matched'].append(sentence)
		auto_tagged = sentence['auto_tag']
		
		if 'verify_tag' not in sentence:
			continue
			
		reviews = sentence['verify_tag']
		
		# calculate accuracy for each word
		for t in range(0, len(auto_tagged)):
			right_tag = sum([1 for a in range(0, len(reviews)) if auto_tagged[t]['tags'] == reviews[a]['tag'][t]['tags']])
			auto_tagged[t]['accuracy'] = right_tag / len(reviews)
		
	return JsonResponse(response)