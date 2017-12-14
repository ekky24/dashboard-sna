# this file's purpose is to define routing for /review route
from django.conf.urls import url
from django.contrib.auth.views import logout
from . import views

urlpatterns = [
	url(r'^$', views.index, name='review-index'), # /review will use index.html from template
	url(r'^login/$', views.login_user, name='review-login'),
	url(r'^logout/$', views.logout_user, name='review-logout')
]