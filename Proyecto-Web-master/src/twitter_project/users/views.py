from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers
from permissions.services import APIPermissionClassFactory
from follower.models import Followers

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    '''Handles creating, reading and updating user profiles'''

    queryset = models.UserProfile.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [
        APIPermissionClassFactory(
            name='UserPermissions',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': lambda user, req: user.is_authenticated,
                },
                'instance': {
                    'retrieve': lambda user,  obj, req: user.is_authenticated,
                    'destroy': True,
                    'update': False,
                    'partial_update': False,
                }
            }
        )
    ]
