import json
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers
from permissions.services import APIPermissionClassFactory
from guardian.shortcuts import assign_perm
from follower.models import Followers
from tweet.models import Tweet

def verify_delete(user, obj, request):
    '''When someone whants to delete a tweet'''
    
    return user.has_perm('tweet.delete_tweet', obj)

def verify_update(user, obj, request):
    '''When someone whants to update a tweet'''

    return user.has_perm('tweet.change_tweet', obj)

class TweetViewSet(viewsets.ModelViewSet):
    '''Handles creating, reading and updating tweets'''

    queryset = models.Tweet.objects.all()
    serializer_class = serializers.TweetSerializer
    permission_classes = [
        APIPermissionClassFactory(
            name='TweetsPermissions',
            permission_configuration={
                'base': {
                    'create': lambda user, req: user.is_authenticated,
                    'list': True,
                    'my_tweets': lambda user, req: user.is_authenticated,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': verify_delete,
                    'update': verify_update,
                    'partial_update': verify_update,
                    'get_following_tweets': True,
                }
            }
        )
    ]

    def perform_create(self, serializer):
        '''Assign perms when created'''
        
        tweet = serializer.save()
        user = self.request.user
        assign_perm('tweet.change_tweet', user, tweet)
        assign_perm('tweet.delete_tweet', user, tweet)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_following_tweets(self, request):
        '''Gets specific tweets of people who you are following'''
        
        #Gets following list of current user
        following_list = Followers.objects.get(user_name=request.user).following.all()

        args = {}

        for following in following_list:
            #Gets tweets of each user you follow
            tweets = Tweet.objects.filter(user_id=following)
            for tweet in tweets:
                #Serialize evrey tweet
                tweet_serializer = serializers.TweetSerializer(tweet).data
                args[tweet_serializer['id']] = tweet_serializer

        return Response(args)
    
    @action(detail=False, methods=['GET'])
    def my_tweets(self, request):
        '''Get logged in user tweets'''

        user = request.user

        args = {}

        tweets = Tweet.objects.filter(user_id=user).order_by('tweeted_date')

        for tweet in tweets:
            #Serialize every tweet
            tweet_serializer = serializers.TweetSerializer(tweet).data
            args[tweet_serializer['id']] = tweet_serializer

        return Response(args)
