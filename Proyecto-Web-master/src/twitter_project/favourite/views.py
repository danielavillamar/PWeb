from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from guardian.shortcuts import assign_perm
from django.db.models import F


from . import models
from . import serializers
from permissions.services import APIPermissionClassFactory
from tweet.models import Tweet
from tweet.serializers import TweetSerializer

# Create your views here.

def verify_retrieve(user, obj, request):
    '''Verifies if current user has perm to see favs'''
    return user.has_perm("favourite.view_favourite", obj)

def verify_delete(user, obj, request):
    '''Verifies if current user has perm to see favs'''
    return user.has_perm("favourite.delete_favourite", obj)

class FavouriteTweetViewSet(viewsets.ModelViewSet):
    '''Handles creating, reading, and removing Favourite Tweets'''

    queryset = models.Favourite.objects.all()
    serializer_class = serializers.FavouriteSerializer
    permission_classes = [
        APIPermissionClassFactory(
            name="FavouriteTweetsPermissions",
            permission_configuration={
                'base': {
                    'create': lambda user, req: user.is_authenticated,
                    'list': True,
                    'my_fav_tweets': lambda user, req: user.is_authenticated,
                },
                'instance': {
                    'retrieve': verify_retrieve,
                    'destroy': verify_delete,
                    'update': False,
                    'partial_update': False,
                }
            }
        )
    ]

    def perform_create(self, serializer):
        '''Assign perms when created'''

        favourite = serializer.save()
        user = self.request.user
        assign_perm("favourite.view_favourite", user, favourite)
        assign_perm("favourite.delete_favourite", user, favourite)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def my_fav_tweets(self, request):
        '''Get logged in user fav tweets'''

        user = request.user

        args = {}

        fav_tweets = Tweet.objects.filter(favourite__tweet_id=F('id'), favourite__user_name=user).order_by('tweeted_date')

        for tweet in fav_tweets:
            #Serialize every tweet
            tweet_serializer = TweetSerializer(tweet).data
            args[tweet_serializer['id']] = tweet_serializer

        return Response(args)