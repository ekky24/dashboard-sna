from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^positive/', views.index_positive, name='index_positive'),
	url(r'^negative/', views.index_negative, name='index_negative'),
	url(r'^netral/', views.index_netral, name='index_netral')
]