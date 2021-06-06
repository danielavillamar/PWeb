from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers
from permissions.services import APIPermissionClassFactory

# Create your views here.

class AnswerTweetViewSet(viewsets.ModelViewSet):
    '''Handles creating and reading tweets answers'''

    queryset = models.TweetAnswer.objects.all()
    serializer_class = serializers.AnswerTweetSerializer
    permission_classes = [
        APIPermissionClassFactory(
            name="TweetsAnswersPermissions",
            permission_configuration={
                'base': {
                    'create': lambda user, req: user.is_authenticated,
                    'list': True,
                },
                'instance': {
                    'retrieve': True,
                    'destroy': False,
                    'update': False,
                    'partial_update': False,
                }
            }
        )
    ]