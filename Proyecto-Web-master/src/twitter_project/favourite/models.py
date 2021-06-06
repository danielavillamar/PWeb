import uuid
from django.db import models

from tweet.models import Tweet
from users.models import UserProfile

# Create your models here.

class Favourite(models.Model):
    '''Favourite Model'''

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tweet_id = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    user_name = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    REQUIRED_FIELDS = ["tweet_id", "user_name"]

    def __str__(self):
        return 'TweetId: {0} UserName: {1}'.format(self.tweet_id, self.user_name)