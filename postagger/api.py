from json import loads
from bson.objectid import ObjectId
from datetime import datetime
from random import randrange

from django.http import JsonResponse, HttpResponse
from .models import Evaluation

from .rule import sanitize_tags

def on_fetch (request, userid):
	response = {"unevaluated":None}
	
	# if there is session with such user id exists already
	if (request.session["user_id"] is not None and request.session["user_id"] == userid):
		# search sentence that is not evaluated by this user yet
		search_criteria = {
			"verify_tag.user_id": { "$ne": userid }
		}
		unevaluated_sentences = Evaluation.objects.mongo_find(search_criteria)
		unevaluated_total = unevaluated_sentences.count()
		
		# if there are unevaluated
		if (unevaluated_total > 0):
			sentence = unevaluated_sentences[randrange(0, unevaluated_total)]
			sentence["_id"] = str(sentence["_id"])
			sanitize_tags(sentence["auto_tag"])
			response["unevaluated"] = sentence
			
	return JsonResponse(response)

def on_submit (request):
	response_code = 404
	if (request.method == "POST"):
		
		response_code = 200
		evaluation_result = loads(request.body.decode('utf-8'))
		Evaluation.objects.mongo_update(
		{
			'_id': ObjectId(evaluation_result['oid'])
		}, 
		{
			'$push': {
				'verify_tag': {
					'user_id': evaluation_result['user'],
					'created_at': datetime.now().isoformat(),
					'tag': evaluation_result['eval']
				}
			}
		})
		
	return HttpResponse(status=response_code)	
	