from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class clapsUserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('User must have a password')
        user = self.model(email=self.normalize_email(email), name=name)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('User must have a password')
        user = self.model(email=self.normalize_email(email), name=name)
        user.is_superuser = True
        user.set_password(password)
        user.save()
        return user

class clapsUser(AbstractBaseUser):
    email = models.EmailField(max_length=60,unique=True)
    username = models.CharField(max_length=40,unique=True)
    date_joined =  models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_teatro = models.BooleanField(default=False)
    is_commonUser = models.BooleanField(default=True)
    is_hall = models.BooleanField(default=False)


    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','first_name','last_name']

    objects = clapsUserManager()

    def __str__(self):
        return self.email