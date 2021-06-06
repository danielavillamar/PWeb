from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager

# Create your models here.

class UserProfileManager(BaseUserManager):
    '''Helps Django to work with our custom model'''

    def create_user(self, user_name, email, name, password=None):
        '''Create a new user profile object.'''

        if not user_name:
            raise ValueError('You must provide a user name.')

        if not email:
            raise ValueError('User must have an email address.')

        email = self.normalize_email(email)
        user = self.model(user_name=user_name, email=email, name=name)

        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, user_name, email, name, password):
        '''Creates and saves new superuser with given details'''

        user = self.create_user(user_name, email, name, password)

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)

        return user

class UserProfile(AbstractBaseUser, PermissionsMixin):
    '''Respents a user profile inside our system'''

    user_name = models.CharField(max_length=50, primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['email', 'name']

    def get_full_name(self):
        '''Get user's full name'''
        return self.name

    def get_short_name(self):
        '''Get user's full name'''
        return self.name

    def __str__(self):
        '''To String'''
        return self.user_name