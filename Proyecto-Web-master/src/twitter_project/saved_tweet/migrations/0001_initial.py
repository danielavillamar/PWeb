# Generated by Django 3.0.6 on 2021-04-14 23:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tweet', '0002_tweet_user_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='SavedTweet',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('tweet_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet.Tweet')),
                ('user_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
