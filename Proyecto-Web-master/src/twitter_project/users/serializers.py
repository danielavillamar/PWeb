from rest_framework import serializers

from . import models

class UserSerializer(serializers.ModelSerializer):
    '''Serializer for user object'''

    class Meta:
        model = models.UserProfile
        fields = (
            'user_name',
            'email',
            'name',
            'password'
        )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        '''Create and return a new user'''
        
        user = models.UserProfile(
            user_name=validated_data['user_name'],
            email=validated_data['email'],
            name=validated_data['name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user