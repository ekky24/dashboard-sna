from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
	url(r'^$', views.index),
	url(r'^detail/(?P<doc_id>[a-zA-Z0-9]+)/', views.detail, name='dashboard-detail'),
	url(r'^login/', auth_views.login, {'template_name': 'dashboard/login.html'}, name='dashboard_login'),
    url(r'^logout/', auth_views.logout, name="dashboard_logout"),
 	url(r'^users/', include('users.urls')),
 	url(r'^pos_tagger/', include('postagger.urls')),
]