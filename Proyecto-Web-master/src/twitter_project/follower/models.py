import uuid
from django.db import models

from users.models import UserProfile

# Create your models here.

class Followers(models.Model):
    '''Follower Model'''

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_name = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='owner')
    following = models.ManyToManyField(UserProfile, null=True)

    REQUIRED_FIELDS = ['user_name']

    @classmethod
    def follow(cls, user_name, follow_user):
        '''Follow Someone'''

        follow, created = cls.objects.get_or_create(user_name = user_name)
        follow.following.add(follow_user)

    @classmethod
    def unfollow(cls, user_name, follow_user):
        '''Unfollow Someone'''

        follow, created = cls.objects.get_or_create(user_name = user_name)
        follow.following.remove(follow_user)