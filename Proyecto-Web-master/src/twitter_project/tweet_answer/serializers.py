from rest_framework import serializers

from . import models

class AnswerTweetSerializer(serializers.ModelSerializer):
    '''Answer Tweet Serializer'''

    class Meta:
        model = models.TweetAnswer
        fields = (
            "id",
            "tweet_id",
            "user_id",
            "answerd_tweeted_date",
            "tweet_answer"
        )