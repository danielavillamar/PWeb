"""twitter_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from users.views import UserViewSet
from tweet.views import TweetViewSet
from tweet_answer.views import AnswerTweetViewSet
from favourite.views import FavouriteTweetViewSet
from retweet.views import RetweetTweetViewSet
from saved_tweet.views import SavedTweetViewSet
from follower.views import FollowViewSet

router = DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'tweets', TweetViewSet)
router.register(r'answers', AnswerTweetViewSet)
router.register(r'favourites', FavouriteTweetViewSet)
router.register(r'retweets', RetweetTweetViewSet)
router.register(r'saved-tweets', SavedTweetViewSet)
router.register(r'follower', FollowViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/', include(router.urls)),
    path(r'api/auth-token', obtain_jwt_token),
    path(r'api/refresh-token', refresh_jwt_token),
]
