from rest_framework import serializers

from . import models

class FollowSerializer(serializers.ModelSerializer):
    '''Serializer for follow object'''

    class Meta:
        model = models.Followers
        fields = (
            "id",
            "user_name",
            "following"
        )