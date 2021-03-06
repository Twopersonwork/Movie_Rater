from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.core.validators import MaxValueValidator, MinValueValidator


# This model is for store the movies in the database
class Movie(models.Model):
    Poster=models.CharField(max_length=300)
    Title=models.CharField(max_length=70)
    Actors=models.CharField(max_length=150)
    imdbID=models.CharField(max_length=20)
    Runtime=models.CharField(max_length=15)
    imdbRating = models.FloatField()
    Genre=models.CharField(max_length=100)
    Language=models.CharField(max_length=100)
    Director=models.CharField(max_length=100)
    Released= models.CharField(max_length=60)
    Awards=models.CharField(max_length=100)
    Type=models.CharField(max_length=50)
    Writer=models.CharField(max_length=300)
    imdbVotes=models.CharField(max_length=15)
    Country=models.CharField(max_length=50)
    Box_office=models.CharField(max_length=50)


    def no_of_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        print(len(ratings))
        return len(ratings)

    def avg_rating(self):
        sum = 0
        ratings = Rating.objects.filter(movie=self)
        for rating in ratings:
            sum+= rating.stars
        if len(ratings)>0:
            return sum/len(ratings)
        else:
            return 0


# Store the rating which user gives on particular movie.
class Rating(models.Model):
    stars=models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    movie=models.ForeignKey(Movie,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)

    class Meta:
        # unique_together means same user can not rate the same movie more than one
        unique_together = (('user', 'movie'),)
        index_together = (('user', 'movie'),)
