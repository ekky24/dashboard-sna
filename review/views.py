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
			auth_login(request, user)
			return redirect("review-index")
		else:
			message = "Please check your username and password again"
			return render(request, "review/login.html", context={'message': message})
	
	return render(request, "review/login.html")
	
def index(request):

	if (not	request.user.is_authenticated()):
		user_id = get_random_string(length=14)
		request.session.set_expiry(settings.SESSION_EXPIRED)
		request.session["user_id"] = "guest"+user_id

	return render(request, "review/index.html")