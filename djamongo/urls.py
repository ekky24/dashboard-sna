from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings

urlpatterns = [
	url(r'^dashboard/', include('dashboard.urls')),
	url(r'^pos_tagger/', include('postagger.front_urls'))
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns