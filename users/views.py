from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import User
from django.shortcuts import get_object_or_404
from .forms import UserForm
from django.contrib import messages

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def index(request):
	users = User.objects.all()
	context = {'title_page' : 'User Management', 
				'users' : users}

	return render(request, 'users/index.html', context = context)


@login_required()
@user_passes_test(lambda u: u.is_superuser)
def create(request):
	if request.method == 'POST':
		user_form = UserForm(request.POST)
	
		if user_form.is_valid():
			user_form.save()

			messages.success(request, 'User has been registered')
			return redirect('users_index')
	else :
		user_form = UserForm()

	
	context = {'title_page' : 'Create User', 'form' : user_form}
				
	return render(request, 'users/create.html', context = context)

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def edit(request, user_id):
	user = get_object_or_404(User, id=user_id)

	if request.method == 'POST':
		user_form = UserForm(request.POST, instance=user)
	
		if user_form.is_valid():
			user_form.save()

			messages.success(request, 'User has been updated')
			return redirect('users_index')
		else :
			print(user_form.non_field_errors)
	else :
		user_form = UserForm(instance=user)
	

	context = {'title_page' : 'Edit User', 'form' : user_form}
				
	return render(request, 'users/create.html', context = context)

@login_required()
@user_passes_test(lambda u: u.is_superuser)
def edit_user(request, user_form):
	user_form = UserForm(request.POST)

	if user_form.is_valid():
		user = user_form.save()
		print("Huurrah")