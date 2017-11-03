import environ
import os

root = environ.Path(__file__) - 3 # three folder back (/a/b/c/ - 3 = /)
env = environ.Env(DEBUG=(bool, False),) # set default values and casting
environ.Env.read_env() # reading .env file

SITE_ROOT = root()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
	'dashboard',
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'users',
	'widget_tweaks',
	'postagger'
]

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware'
]

ROOT_URLCONF = 'djamongo.urls'

TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [TEMPLATE_DIR],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
				'django.template.context_processors.static',
			],
		},
	},
]

WSGI_APPLICATION = 'djamongo.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
	'default': {
		'ENGINE': env('DB_ENGINE'),
		'NAME': env('DB_NAME'),
		'HOST': env('DB_HOST')
	}
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = 'users.User'


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATIC_DIR = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [STATIC_DIR, ]


LOGIN_REDIRECT_URL = '/dashboard'
LOGIN_URL = '/dashboard/login/'
LOGOUT_REDIRECT_URL = '/dashboard/login/'



if DEBUG:
   INTERNAL_IPS = ('127.0.0.1', 'localhost',)
   MIDDLEWARE += (
	   'debug_toolbar.middleware.DebugToolbarMiddleware',
   )

   INSTALLED_APPS += (
	   'debug_toolbar',
   )

   DEBUG_TOOLBAR_PANELS = [
	   'debug_toolbar.panels.versions.VersionsPanel',
	   'debug_toolbar.panels.timer.TimerPanel',
	   'debug_toolbar.panels.settings.SettingsPanel',
	   'debug_toolbar.panels.headers.HeadersPanel',
	   'debug_toolbar.panels.request.RequestPanel',
	   'debug_toolbar.panels.sql.SQLPanel',
	   'debug_toolbar.panels.staticfiles.StaticFilesPanel',
	   'debug_toolbar.panels.templates.TemplatesPanel',
	   'debug_toolbar.panels.cache.CachePanel',
	   'debug_toolbar.panels.signals.SignalsPanel',
	   'debug_toolbar.panels.logging.LoggingPanel',
	   'debug_toolbar.panels.redirects.RedirectsPanel',
   ]

   DEBUG_TOOLBAR_CONFIG = {
	   'INTERCEPT_REDIRECTS': False,
   }
   