from djongo import models
from django.utils import timezone
from django.utils.timezone import utc
from datetime import datetime as dt

class WorkerAccount(models.Model):
    email = models.CharField(max_length=50, unique=True)
    consumer_key = models.CharField(max_length=100)
    consumer_secret = models.CharField(max_length=100)
    access_token = models.CharField(max_length=100)
    access_token_secret = models.CharField(max_length=100)

    def __str__(self):
         return self.email
    def get_dev_account(self):
        return [self.consumer_key, self.consumer_secret, self.access_token, self.access_token_secret]

class WorkerJobs(models.Model):
    project_name = models.CharField(max_length=50)
    language = models.CharField(max_length=100, blank=True)
    follow = models.CharField(max_length=100, blank=True)
    track = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=100, blank=True)
    account = models.ForeignKey(WorkerAccount)
    collection_name = models.CharField(max_length=100, blank=True)
    gen_command = models.CharField(max_length=400, blank=True)
    category = models.CharField(max_length=20)
    task_id = models.CharField(max_length=50, blank=True)
    task_status = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(default=timezone.now)