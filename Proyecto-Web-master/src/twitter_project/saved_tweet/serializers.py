from rest_framework import serializers

from . import models

class SavedTweetSerializer(serializers.ModelSerializer):
    '''Serializer for Favourie Tweet Object'''

    class Meta:
        model = models.SavedTweet
        fields = (
            "id",
            "tweet_id",
            "user_name",
        )