from django.conf.urls import url
from . import front_views

urlpatterns = [
	url(r'^$', front_views.index),
]