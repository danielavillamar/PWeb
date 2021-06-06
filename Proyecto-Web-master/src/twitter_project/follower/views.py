from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


from . import models
from . import serializers
from permissions.services import APIPermissionClassFactory
from guardian.shortcuts import assign_perm
from users.models import UserProfile
from users.serializers import UserSerializer

class FollowViewSet(viewsets.ModelViewSet):
    '''Handles following and unfollowing someone'''

    queryset = models.Followers.objects.all()
    serializer_class = serializers.FollowSerializer
    permission_classes = [
        APIPermissionClassFactory(
            name='TweetsPermissions',
            permission_configuration={
                'base': {
                    'create': lambda user, req: user.is_authenticated,
                    'list': True,
                    'follow': True,
                    'get_following_list': lambda user, req: user.is_authenticated,
                    'get_followers_list': lambda user, req: user.is_authenticated,
                    'get_follow_recomendations': lambda user, req: user.is_authenticated,
                },
                'instance': {
                    'follow': True,
                    'unfollow': True,
                    'destroy': True,
                }
            }
        )
    ]

    @action(detail=True, methods=['POST'])
    def follow(self, request, pk=None):
        '''Change follow state (Follow/Unfollow)'''

        try:
            #Current User Following Users List
            following_list = models.Followers.objects.get(user_name=request.user.user_name)

            #User you will follow
            follow = UserProfile.objects.get(user_name=pk)
            following_list.follow(request.user, follow)

            msg = "You follow the user {}".format(pk)

            return Response({'message': msg})

        except:
            
            return Response({'message': "The user does not exists"})
    
    @action(detail=True, methods=['POST'])
    def unfollow(self, request, pk=None):
        '''Change follow state (Follow/Unfollow)'''
        #URL pattern: ^follow/{pk}/unfollow/$

        try:
            #Current User Following Users List
            following_list = models.Followers.objects.get(user_name=request.user.user_name)

            #User you will follow
            follow = UserProfile.objects.get(user_name=pk)
            following_list.unfollow(request.user, follow)

            msg = "You unfollow the user {}".format(pk)

            return Response({'message': msg})
        except:
            
            return Response({'message': "The user does not exists"})

    @action(detail=False, methods=['GET'])
    def get_following_list(self, request):
        '''Get logged in user following list'''

        current_user = request.user

        args = {}

        current_user_following = models.Followers.objects.get(user_name=current_user)

        following_list = current_user_following.following.all()

        for following in following_list:
            #Serialize every following user
            follow_serializer = UserSerializer(following).data
            args[follow_serializer['user_name']] = follow_serializer

        return Response(args)

    @action(detail=False, methods=['GET'])
    def get_followers_list(self, request):
        '''Get logged in user followers list'''

        current_user = request.user

        args = {}

        current_user_followers = models.Followers.objects.filter(following=current_user).values('user_name')

        for follower in current_user_followers:
            args[follower['user_name']] = follower

        return Response(args)

    @action(detail=False, methods=['GET'])
    def get_follow_recomendations(self, request):
        '''Get recomendations to follow for logged in user'''

        current_user = request.user

        args ={}

        current_user_recommendation = UserProfile.objects.exclude(user_name__in = models.Followers.objects.get(user_name=current_user).following.all()).exclude(user_name=current_user)

        for recomendation in current_user_recommendation:
            recomendation_serializer = UserSerializer(recomendation).data
            args[recomendation_serializer['user_name']] = recomendation_serializer

        return Response(args)