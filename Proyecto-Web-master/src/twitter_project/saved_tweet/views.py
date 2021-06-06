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
    return user.has_perm("saved_tweet.view_savedtweet", obj)

def verify_delete(user, obj, request):
    '''Verifies if current user has perm to see favs'''
    return user.has_perm("saved_tweet.delete_savedtweet", obj)

class SavedTweetViewSet(viewsets.ModelViewSet):
    '''Handles creating, reading, and removing SavedTweets'''

    queryset = models.SavedTweet.objects.all()
    serializer_class = serializers.SavedTweetSerializer
    permission_classes = [
        APIPermissionClassFactory(
            name="SavedTweetsPermissions",
            permission_configuration={
                'base': {
                    'create': lambda user, req: user.is_authenticated,
                    'list': True,
                    'my_saved_tweets': lambda user, req: user.is_authenticated,
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

        saved_tweet = serializer.save()
        user = self.request.user
        assign_perm("saved_tweet.view_savedtweet", user, saved_tweet)
        assign_perm("saved_tweet.delete_savedtweet", user, saved_tweet)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def my_saved_tweets(self, request):
        '''Get logged in user saved tweets'''

        user = request.user

        args = {}

        saved_tweets = Tweet.objects.filter(savedtweet__tweet_id=F('id'), savedtweet__user_name=user).order_by('tweeted_date')

        for tweet in saved_tweets:
            #Serialize every tweet
            tweet_serializer = TweetSerializer(tweet).data
            args[tweet_serializer['id']] = tweet_serializer

        return Response(args)