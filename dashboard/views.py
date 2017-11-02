from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, user_passes_test


@login_required()
@user_passes_test(lambda u: u.is_superuser)
def index(request):
	context = {'title_page' : 'Dashboard'}
	return render(request, 'index.html', context = context)
