from rest_framework import serializers

from . import models

class FavouriteSerializer(serializers.ModelSerializer):
    '''Serializer for Favourite Tweet Object'''

    class Meta:
        model = models.Favourite
        fields = (
            "id",
            "tweet_id",
            "user_name",
        )