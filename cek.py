from celery.result import AsyncResult
from djamongo.tasks import crawl_data
from celery.task.control import revoke

result = crawl_data.AsyncResult('5ac247e3-7995-41b9-97f0-323147ad1a06')
#revoke(result.id, terminate=True)
print(result.state)