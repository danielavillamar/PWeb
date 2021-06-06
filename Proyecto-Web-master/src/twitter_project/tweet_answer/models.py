import uuid
from django.db import models
from users.models import UserProfile
from tweet.models import Tweet

# Create your models here.

class TweetAnswer(models.Model):
    '''Tweet Answer Model'''

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tweet_id = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    answerd_tweeted_date = models.DateField()
    tweet_answer = models.CharField(max_length = 280)

    REQUIRED_FIELDS = ['tweet_id', 'userd_id', 'tweet_answer']

    def __str__(self):
        return 'AnswerId: {0}, BaseTweetId: {1}, UserId: {2}, AnswerTweet: {3}'.format(self.id, self.tweet_id, self.user_id, self.tweet_answer)