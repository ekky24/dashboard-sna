from djongo import models

class WordTag(models.Model):
	word = models.CharField(max_length=50)
	tags = models.CharField(max_length=6)

	class Meta:
		abstract = True
	
class UserTag(models.Model):
	user_id = models.CharField(max_length=20)
	created_at = models.DateTimeField()
	tag = models.ArrayModelField(model_container=WordTag)	
	class Meta:
		abstract = True

# postagger_evaluation collection
class Evaluation(models.Model):
	source = models.CharField(max_length=10)
	model_name = models.CharField(max_length=20)
	model_version = models.CharField(max_length=6)
	sentence = models.CharField(max_length=200)
	status = models.CharField(max_length=10)
	auto_tag = models.ArrayModelField(model_container=WordTag)
	verify_tag = models.ArrayModelField(model_container=UserTag)
	
	objects = models.DjongoManager()
	