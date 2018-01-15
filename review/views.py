from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.utils.crypto import get_random_string
from django.conf import settings

def login_user(request):
	response = None
	if (request.method == "POST"):
		uname = request.POST["username"]
		passw = request.POST["password"]
		
		user = authenticate(username=uname, password=passw)
		if (user is not None):
			
			request.session.set_expiry(settings.SESSION_EXPIRED)
			request.session['user_id'] = user.username
			request.session['user_number_id'] = user.id

			return redirect("review-index")
		
		message = "Please check your username and password again"
		return render(request, "review/login.html", context={'message': message})
			
	# if this user is not guest and this user wants to go to login page, redirect back to index 
	if ('user_number_id' in request.session):
		return redirect("review-index")
	
	return render(request, "review/login.html")
	
def logout_user(request):
	del request.session['user_id'], request.session['user_number_id']
	return render(request, "review/login.html")
	
def index(request):

	if ('user_id' not in request.session):
		user_id = get_random_string(length=14)
		request.session.set_expiry(settings.SESSION_EXPIRED)
		request.session["user_id"] = "guest"+user_id

	return render(request, "review/index.html")