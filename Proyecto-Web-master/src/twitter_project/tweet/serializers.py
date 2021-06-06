from rest_framework import serializers

from . import models

class TweetSerializer(serializers.ModelSerializer):
    '''Serializer for Tweet Object'''

    class Meta:
        model = models.Tweet
        fields = (
            "id",
            "user_id",
            "tweeted_date",
            "tweet",
            "retweets",
            "favs",
        )
