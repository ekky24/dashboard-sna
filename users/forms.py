from django import forms
from users.models import User

class UserForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ['name', 'email', 'username', 'is_superuser']
        #labels = {'first_name' : 'Name'}

    '''
    def clean(self):
        if (self.cleaned_data.get('password') !=
            self.cleaned_data.get('verify_password')):

            raise ValidationError(
                "Password must match."
            )

        return self.cleaned_data

    def save(self, commit=True):
    	self.cleaned_data = dict([ (k,v) for k,v in self.cleaned_data.items() if v != "" ])
    	return super(UserForm, self).save(commit=commit)
    '''