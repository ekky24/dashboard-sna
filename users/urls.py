from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
	url(r'^$', views.index, name='users_index'),
	url(r'^create$', views.create, name='users_create'),
	url(r'^(?P<user_id>\d+)/edit$', views.edit, name='users_edit'),
]