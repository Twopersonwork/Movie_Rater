from rest_framework import serializers
from .models import Movie,Rating
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status


# This is for MovieSerializer it means how many fields from movie table you want to show or access
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [field.name for field in model._meta.fields]
        fields.append('no_of_ratings')
        fields.append('avg_rating')



# Here we customizer UserSerializers for creating the new user and generate the token of the new user and
# store into the database

class UserSerializer(serializers.ModelSerializer):


    # for validate user email
    def validate_email(self,value):
        lower_email = value.lower()
        if User.objects.filter(email=lower_email).exists():
            raise serializers.ValidationError("Email already exists")
        return lower_email

    class Meta:
        model = User
        fields = ['id', 'username','email', 'password']
        # extra_kwargs for validation on some fields.
        extra_kwargs = {'password': {'write_only': True, 'required': True},'email':{'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)  # create user
        Token.objects.create(user=user)                     # create token for particular user
        return user


# RatingSerializer and we want to acces all the fields .
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
