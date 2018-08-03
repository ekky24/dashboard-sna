from django import forms
from .models import WorkerAccount, WorkerJobs

class WorkerAccountForm(forms.ModelForm):
	email = forms.EmailField(widget=forms.EmailInput(attrs={'class':'form-control'}), max_length=50)
	consumer_key = forms.CharField(widget=forms.Textarea(attrs={'class':'form-control', 'rows':'2'}))
	consumer_secret = forms.CharField(widget=forms.Textarea(attrs={'class':'form-control', 'rows':'2'}))
	access_token = forms.CharField(widget=forms.Textarea(attrs={'class':'form-control', 'rows':'2'}))
	access_token_secret = forms.CharField(widget=forms.Textarea(attrs={'class':'form-control', 'rows':'2'}))

	class Meta:
		model = WorkerAccount
		fields = ['email', 'consumer_key', 'consumer_secret', 'access_token', 'access_token_secret']

class WorkerJobsForm(forms.ModelForm):
	project_name = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control'}))
	language = forms.CharField(required=False, widget=forms.TextInput(attrs={'class':'form-control', 'id':'language_tag'}))
	follow = forms.CharField(required=False, widget=forms.TextInput(attrs={'class':'form-control', 'id':'follow_tag'}))
	track = forms.CharField(required=False, widget=forms.TextInput(attrs={'class':'form-control', 'id':'track_tag'}))
	location = forms.CharField(required=False, widget=forms.TextInput(attrs={'class':'form-control', 'id':'location_tag'}))
	account = forms.ModelChoiceField(queryset=WorkerAccount.objects.all(), widget=forms.Select(attrs={'class':'form-control'}))
	category = forms.ChoiceField(choices=(('blank', 'Blank'), ('telco', 'Telco'), ('fnb', 'FNB')), widget=forms.Select(attrs={'class':'form-control'}))

	class Meta:
		model = WorkerJobs
		fields = ['project_name', 'language', 'follow', 'track', 'location', 'account', 'collection_name', 'gen_command', 'category']
