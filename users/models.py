from django.contrib.auth.models import AbstractUser
from django.db import models

from djongo import models as djongo_models

class User(AbstractUser):
    name = models.CharField(max_length=30)
    avatar = models.CharField(max_length=500, blank=True)
    
nosql_collection = djongo_models.DjongoManager()