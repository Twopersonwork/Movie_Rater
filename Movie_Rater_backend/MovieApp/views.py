from rest_framework import viewsets,status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Movie,Rating
from .serializers import MovieSerializer,UserSerializer,RatingSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import action



class MovieViewset(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = (AllowAny,)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    # print("before")
    @action(detail=True,methods=['POST'])
    def rateMovie(self,request,pk=None):
        print("after",pk)

        if 'stars' in request.data:
            movie = Movie.objects.get(id=pk)
            stars = request.data['stars']
            user = request.user

            # we are fetching the user and movie and
            # giving it the stars.
            # we put it in a try in case of any error and
            # in except we are creating the new rating.
            try:
                rating=Rating.objects.get(user=user.id,movie=movie.id)
                rating.stars=stars
                rating.save()

                serializer = RatingSerializer(rating,many=False)
                print(serializer.data)
                response = {'message':'update','result':serializer.data}
                return Response(response,status=status.HTTP_200_OK)

            except:
                rating=Rating.objects.create(user=user,movie=movie,stars=stars)
                serializer=RatingSerializer(rating,many=False)
                response = {'message':'created','result':serializer.data}
                return Response(response,status=status.HTTP_201_CREATED)

        else:
            response={'message':'you must provide stars'}
            return Response(response,status=status.HTTP_400_BAD_REQUEST)


class RatingViewset(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

