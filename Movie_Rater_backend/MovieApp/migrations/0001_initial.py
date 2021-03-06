# Generated by Django 3.2 on 2021-04-23 11:06

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Poster', models.CharField(max_length=300)),
                ('Title', models.CharField(max_length=70)),
                ('Actors', models.CharField(max_length=150)),
                ('imdbID', models.CharField(max_length=20)),
                ('Runtime', models.CharField(max_length=15)),
                ('imdbRating', models.FloatField()),
                ('Genre', models.CharField(max_length=100)),
                ('Language', models.CharField(max_length=100)),
                ('Director', models.CharField(max_length=100)),
                ('Released', models.CharField(max_length=50)),
                ('Awards', models.CharField(max_length=100)),
                ('Type', models.CharField(max_length=50)),
                ('Writer', models.CharField(max_length=300)),
                ('imdbVotes', models.CharField(max_length=15)),
                ('Country', models.CharField(max_length=50)),
                ('Box_office', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stars', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='MovieApp.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'movie')},
                'index_together': {('user', 'movie')},
            },
        ),
    ]
