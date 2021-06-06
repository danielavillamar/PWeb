from django.db import models
from users.models import UserProfile

# Create your models here.

class Tweet(models.Model):
    '''Tweet Model'''

    id = models.AutoField(primary_key = True)
    user_id = models.ForeignKey(UserProfile, on_delete = models.CASCADE)
    tweeted_date = models.DateField()
    tweet = models.CharField(max_length = 280)
    retweets = models.PositiveIntegerField(default = 0)
    favs = models.PositiveIntegerField(default = 0)

    REQUIRED_FIELDS = ['user_id', 'tweet']

    def __str__(self):
        return 'TweetId: {0}, UserId: {1}, TweetDate: {2}, Tweet: {3}'.format(self.id, self.user_id, self.tweeted_date, self.tweet)

    