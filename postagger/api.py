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
			'verify_tag.user_id': { 
				'$ne': this_user_id
			}
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
			this_user_id = User.objects.get(username=this_user_id).id
		
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
	