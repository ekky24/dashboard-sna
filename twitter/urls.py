from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views
from . import api

urlpatterns = [
	url(r'^account/$', views.index_account, name='index_account'),
	url(r'^account/create/$', views.create_account, name='create_account'),
	url(r'^account/(?P<account_id>\d+)/edit$', views.edit_account, name='edit_account'),
	url(r'^account/(?P<account_id>\d+)/delete$', views.delete_account, name='delete_account'),
	url(r'^jobs/$', views.index_jobs, name='index_jobs'),
	url(r'^jobs/create/$', views.create_jobs, name='create_jobs'),
	url(r'^jobs/(?P<jobs_id>\d+)/edit$', views.edit_jobs, name='edit_jobs'),
	url(r'^jobs/(?P<jobs_id>\d+)/delete$', views.delete_jobs, name='delete_jobs'),
	url(r'^refresh_data/(?P<table>.*)/(?P<limit>[0-9]+)/$', api.refresh_data),
	url(r'^refresh_data/(?P<table>.*)/$', api.refresh_data),
	url(r'^monitor/$', views.index_monitor, name='index_monitor'),
	url(r'^refresh_task/$', api.refresh_task),
	url(r'^stop_task/(?P<task_id>.*)/$', api.stop_task),
]