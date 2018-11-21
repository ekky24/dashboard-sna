from django.db import models

# Create your models here.
class CleanData(models.Model):
	sentence = models.CharField(max_length=5000)
	sentiment = models.CharField(max_length=50)

'''class SentimentNegative(models.Model):
	sentence_negative = models.CharField(max_length=5000)
	sentiment_negative = models.CharField(max_length=50)

class SentimentNeutral(models.Model):
	sentence_neutral = models.CharField(max_length=5000)
	sentiment_neutral = models.CharField(max_length=50)'''


		