from rest_framework import serializers

from . import models

class RetweetSerializer(serializers.ModelSerializer):
    '''Serializer for Favourie Tweet Object'''

    class Meta:
        model = models.Retweet
        fields = (
            "id",
            "tweet_id",
            "user_name",
        )