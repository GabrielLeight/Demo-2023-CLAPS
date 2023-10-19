from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class clapsUserManager(BaseUserManager):
    def create_teatro(self, email, company_name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('User must have a password')
        user = self.model(email=self.normalize_email(email), company_name=company_name)
        user.first_name='NA'
        user.last_name='NA'
        user.is_teatro=True
        user.is_commonUser=False
        user.set_password(password)
        user.save()
        return user

class Teatro(clapsUser):
    company_name=models.CharField(max_length=40)
    
    REQUIRED_FIELDS = ['email','company_name']

    def __str__(self):
        return self.email
