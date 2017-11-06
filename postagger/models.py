from djongo import models
from users.models import User

# word and tag pair
class WordTagged(models.Model):
	word = models.CharField(max_length=100)
	tag = models.CharField(max_length=6)
	class Meta:
		abstract = True

# user and word tagged
class POSTagger(models.Model):
	user_id = models.ForeignKey(User)
	tagged = models.ArrayModelField(model_container=WordTagged)
	class Meta:
		abstract = True

# tagged collection		
class Tagged(models.Model):
	source = models.CharField(max_length=30)
	source_id = models.CharField(max_length=100)
	model_name = models.CharField(max_length=10)
	model_version = models.IntegerField()
	
	sentence = models.CharField(max_length=200)
	sentence_idx = models.IntegerField()
	auto_tag = models.ArrayModelField(model_container=WordTagged)
	verify_tag = models.ArrayModelField(model_container=POSTagger)