from .models import WorkerAccount, WorkerJobs
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from .forms import WorkerAccountForm, WorkerJobsForm
from django.contrib import messages
import time
import hashlib
from djamongo.tasks import crawl_data
from django.utils.timezone import localtime
from pymongo import MongoClient
import pymongo
from celery.result import AsyncResult

language_code = {
	'af': 'Afrikaans',
	'am': 'Amharic',
	'an': 'Aragonese',
	'ar': 'Arabic',
	'as': 'Assamese',
	'av': 'Avaric',
	'ay': 'Aymara',
	'az': 'Azerbaijani',
	'ba': 'Bashkir',
	'be': 'Belarusian',
	'bg': 'Bulgarian',
	'bh': 'Bihari languages',
	'bi': 'Bislama',
	'bm': 'Bambara',
	'bn': 'Bengali',
	'bo': 'Tibetan',
	'br': 'Breton',
	'bs': 'Bosnian',
	'ca': 'Catalan',
	'ce': 'Chechen',
	'ch': 'Chamorro',
	'co': 'Corsican',
	'cr': 'Cree',
	'cs': 'Czech',
	'cv': 'Chuvash',
	'cy': 'Welsh',
	'da': 'Danish',
	'de': 'German',
	'dv': 'Divehi; Dhivehi; Maldivian',
	'dz': 'Dzongkha',
	'ee': 'Ewe',
	'el': 'Greek',
	'en': 'English',
	'eo': 'Esperanto',
	'es': 'Spanish; Castilian',
	'et': 'Estonian',
	'eu': 'Basque',
	'fa': 'Persian',
	'ff': 'Fulah',
	'fi': 'Finnish',
	'fj': 'Fijian',
	'fo': 'Faroese',
	'fr': 'French',
	'fy': 'Western Frisian',
	'ga': 'Irish',
	'gd': 'Gaelic; Scottish Gaelic',
	'gl': 'Galician',
	'gn': 'Guarani',
	'gu': 'Gujarati',
	'gv': 'Manx',
	'ha': 'Hausa',
	'he': 'Hebrew',
	'hi': 'Hindi',
	'ho': 'Hiri Motu',
	'hr': 'Croatian',
	'ht': 'Haitian; Haitian Creole',
	'hu': 'Hungarian',
	'hy': 'Armenian',
	'hz': 'Herero',
	'in': 'Indonesian',
	'ie': 'Interlingue; Occidental',
	'ig': 'Igbo',
	'ii': 'Sichuan Yi; Nuosu',
	'ik': 'Inupiaq',
	'io': 'Ido',
	'is': 'Icelandic',
	'it': 'Italian',
	'iu': 'Inuktitut',
	'ja': 'Japanese',
	'jv': 'Javanese',
	'ka': 'Georgian',
	'kg': 'Kongo',
	'ki': 'Kikuyu; Gikuyu',
	'kj': 'Kuanyama; Kwanyama',
	'kk': 'Kazakh',
	'kl': 'Kalaallisut; Greenlandic',
	'km': 'Central Khmer',
	'kn': 'Kannada',
	'ko': 'Korean',
	'kr': 'Kanuri',
	'ks': 'Kashmiri',
	'ku': 'Kurdish',
	'kv': 'Komi',
	'kw': 'Cornish',
	'ky': 'Kirghiz; Kyrgyz',
	'la': 'Latin',
	'lb': 'Luxembourgish; Letzeburgesch',
	'lg': 'Ganda',
	'li': 'Limburgan; Limburger; Limburgish',
	'ln': 'Lingala',
	'lo': 'Lao',
	'lt': 'Lithuanian',
	'lu': 'Luba-Katanga',
	'lv': 'Latvian',
	'mg': 'Malagasy',
	'mh': 'Marshallese',
	'mi': 'Maori',
	'mk': 'Macedonian',
	'ml': 'Malayalam',
	'mn': 'Mongolian',
	'mr': 'Marathi',
	'ms': 'Malay',
	'mt': 'Maltese',
	'my': 'Burmese',
	'na': 'Nauru',
	'ne': 'Nepali',
	'ng': 'Ndonga',
	'nl': 'Dutch; Flemish',
	'nn': 'Norwegian Nynorsk; Nynorsk, Norwegian',
	'no': 'Norwegian',
	'nr': 'Ndebele, South; South Ndebele',
	'nv': 'Navajo; Navaho',
	'ny': 'Chichewa; Chewa; Nyanja',
	'oj': 'Ojibwa',
	'om': 'Oromo',
	'or': 'Oriya',
	'pi': 'Pali',
	'pl': 'Polish',
	'ps': 'Pushto; Pashto',
	'pt': 'Portuguese',
	'qu': 'Quechua',
	'rm': 'Romansh',
	'rn': 'Rundi',
	'ro': 'Romanian; Moldavian; Moldovan',
	'ru': 'Russian',
	'rw': 'Kinyarwanda',
	'sa': 'Sanskrit',
	'sc': 'Sardinian',
	'sd': 'Sindhi',
	'se': 'Northern Sami',
	'sg': 'Sango',
	'si': 'Sinhala; Sinhalese',
	'sk': 'Slovak',
	'sl': 'Slovenian',
	'sm': 'Samoan',
	'sn': 'Shona',
	'so': 'Somali',
	'sq': 'Albanian',
	'sr': 'Serbian',
	'ss': 'Swati',
	'st': 'Sotho, Southern',
	'su': 'Sundanese',
	'sv': 'Swedish',
	'sw': 'Swahili',
	'ta': 'Tamil',
	'te': 'Telugu',
	'tg': 'Tajik',
	'th': 'Thai',
	'ti': 'Tigrinya',
	'tk': 'Turkmen',
	'tl': 'Tagalog',
	'tn': 'Tswana',
	'tr': 'Turkish',
	'ts': 'Tsonga',
	'tt': 'Tatar',
	'tw': 'Twi',
	'ty': 'Tahitian',
	'uk': 'Ukrainian',
	'ur': 'Urdu',
	'uz': 'Uzbek',
	've': 'Venda',
	'vi': 'Vietnamese',
	'yo': 'Yoruba',
	'za': 'Zhuang; Chuang',
	'zh': 'Chinese',
	'zu': 'Zulu',
}

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def index_account(request):
	accounts = WorkerAccount.objects.all()
	context = {'title_page' : 'Twitter Account Management', 
				'accounts' : accounts}

	return render(request, 'account/index.html', context = context)

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def index_jobs(request):
	jobs = WorkerJobs.objects.all().order_by('-created_at')

	client = MongoClient('localhost', 27017)
	db = client.event_detection
	jobs_final = []

	for job in jobs:
	    count_data = db[job.collection_name].count()
	    jobs_final.append([job, count_data])

	context = {'title_page' : 'Twitter Jobs Management', 
				'jobs' : jobs_final}
	
	return render(request, 'jobs/index.html', context = context)

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def index_monitor(request):
	monitor = WorkerJobs.objects.all().order_by('-created_at')
	context = {'title_page' : 'Twitter Monitoring', 
				'monitor' : monitor}

	return render(request, 'monitor/index.html', context = context)

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def create_account(request):
	if request.method == 'POST':
		account_form = WorkerAccountForm(request.POST)
	
		if account_form.is_valid():
			account_form.save()

			messages.success(request, 'Account has been registered')
			return redirect('index_account')
	else:
		account_form = WorkerAccountForm()
		
	context = {'title_page' : 'Create Account', 'form': account_form}

	return render(request, 'account/create.html', context=context)

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def edit_account(request, account_id):
	account = get_object_or_404(WorkerAccount, id=account_id)
	if request.method == 'POST':
		account_form = WorkerAccountForm(request.POST, instance=account)
	
		if account_form.is_valid():
			account_form.save()

			messages.success(request, 'Account has been update')
			return redirect('index_account')
	else:
		account_form = WorkerAccountForm(instance=account)
		
	context = {'title_page' : 'Edit Account', 'form': account_form}

	return render(request, 'account/create.html', context=context)

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def delete_account(request, account_id):
	account = get_object_or_404(WorkerAccount, id=account_id)
	account.delete()

	messages.success(request, 'Account has been deleted')
	return redirect('index_account')

def generate_data(data, collection_name=None):
	tweet_method = "filter"
	keywords = None
	lan_code = None
	locations = None
	user_id = None
	table = None
	consumer_key = None
	consumer_secret = None
	access_token = None
	access_token_secret = None

	gen_command = "collect_tweet.py"
	account_id = data['account']
	dev_account = WorkerAccount.objects.get(pk=account_id).get_dev_account()

	if(collection_name == None):
		millis = int(round(time.time() * 1000))
		collection_name = "tweet_" + hashlib.md5(str(millis).encode('utf-8')).hexdigest()
	
	keyword = ""
	if data['track'] != "":
		keyword += '-k "' + data['track'] + '" '
		keywords = data['track']
	if (data['language'] != ""):
		keyword += '-l "' + data['language'] + '" '
		lan_code = data['language']
	if (data['follow'] != ""):
		keyword += '-u "' + data['follow'] + '" '
		user_id = data['follow']
	if (data['location'] != ""):
		keyword += '-n "' + data['location'] + '" '
		locations = data['location']
	
	gen_command += ' -m filter ' + keyword + '-t ' + collection_name
	
	gen_command += " -c " + dev_account[0]
	gen_command += " -s " + dev_account[1]
	gen_command += " -a " + dev_account[2]
	gen_command += " -o " + dev_account[3]

	table = collection_name

	consumer_key = dev_account[0]
	consumer_secret = dev_account[1]
	access_token = dev_account[2]
	access_token_secret = dev_account[3]

	data['gen_command'] = gen_command
	data['collection_name'] = collection_name
	category = data['category']

	params = [tweet_method, keywords, lan_code, locations, user_id, table, consumer_key, consumer_secret, access_token, access_token_secret, category]
	crawl_task = crawl_data.delay(params)
	data['task_id'] = crawl_task.id
	data['task_status'] = crawl_task.status

	return data, params

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def create_jobs(request):
	if request.method == 'POST':
		jobs_form = WorkerJobsForm(request.POST)
	
		if jobs_form.is_valid():
			language_iso = ""

			data = request.POST.copy()
			data_language = data['language'].split(',')
			for row in data_language:
				for key, value in language_code.items():
					if(row == value):
						language_iso += key + ","

			data['language'] = language_iso[0:len(language_iso)-1]
			
			request.POST, params = generate_data(data)
			
			WorkerJobsForm(request.POST).save()

			messages.success(request, 'Jobs has been registered')
			return redirect('index_jobs')
		else:
			print(jobs_form.errors)
	else:
		jobs_form = WorkerJobsForm()
		
	context = {'title_page' : 'Create Jobs', 'form': jobs_form}

	return render(request, 'jobs/create.html', context=context)

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def edit_jobs(request, jobs_id):
	jobs = get_object_or_404(WorkerJobs, id=jobs_id)
	if request.method == 'POST':
		jobs_form = WorkerJobsForm(request.POST, instance=jobs)
		collection_name = jobs.collection_name
		if jobs_form.is_valid():
			language_iso = ""

			data = request.POST.copy()
			data_language = data['language'].split(',')
			for row in data_language:
				for key, value in language_code.items():
					if(row == value):
						language_iso += key + ","

			data['language'] = language_iso[0:len(language_iso)-1]

			request.POST, params = generate_data(data, collection_name=collection_name)

			WorkerJobsForm(request.POST, instance=jobs).save()
			
			messages.success(request, 'Jobs has been update')
			return redirect('index_jobs')
		else:
			print(jobs_form.errors)
	else:
		client = MongoClient('localhost', 27017)
		db = client.event_detection
		col = db[jobs.collection_name]
		raw_data = col.find().sort([('_id', pymongo.DESCENDING)])
		raw_data_count = raw_data.count()

		language_iso = ""
		data_language = jobs.language.split(',')
		for row in data_language:
			for key, value in language_code.items():
				if(row == key):
					language_iso += value + ","
		jobs.language = language_iso[0:len(language_iso)-1]
		jobs_form = WorkerJobsForm(instance=jobs)

		tweet_data = []
		count_positive = 0
		count_neutral = 0
		count_negative = 0
		persen_positive = 0
		persen_neutral = 0
		persen_negative = 0

		for count, row in enumerate(raw_data):
			if(count < 10):
				tweet_data.append(row)
			'''if(row['sentiment'] == 'positive'):
				count_positive += 1
			elif(row['sentiment'] == 'neutral'):
				count_neutral += 1
			elif(row['sentiment'] == 'negative'):
				count_negative += 1'''

		'''if(raw_data_count > 0):
			total = count_positive + count_negative + count_neutral
			persen_positive = count_positive / total * 100
			persen_neutral = count_neutral / total * 100
			persen_negative = count_negative / total * 100'''

	'''context = {'title_page' : 'Edit Jobs', 'form': jobs_form, 'tweet_data': tweet_data, 'collection_name': jobs.collection_name, 
		'sentiment': [count_positive, count_neutral, count_negative, persen_positive, persen_neutral, persen_negative]}'''
	context = {'title_page' : 'Edit Jobs', 'form': jobs_form, 'tweet_data': tweet_data, 'collection_name': jobs.collection_name, 
		'sentiment': [0, 0, 0, 0, 0, 0]}

	return render(request, 'jobs/edit.html', context=context)

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def delete_jobs(request, jobs_id):
	jobs = get_object_or_404(WorkerJobs, id=jobs_id)
	jobs.delete()

	messages.success(request, 'Jobs has been deleted')
	return redirect('index_jobs')
