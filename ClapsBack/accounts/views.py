from django.shortcuts import render

from rest_framework import viewsets

from django.contrib.auth.models import User

from .serializers import UserSerializer
#from .models import clapsBasicUser
from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
)
from rest_framework.viewsets import GenericViewSet

from .models import Usuario


class UserViewset(GenericViewSet,  # generic view functionality
                     CreateModelMixin,  # handles POSTs
                     RetrieveModelMixin,  # handles GETs for 1 Company
                     UpdateModelMixin,  # handles PUTs and PATCHes
                     ListModelMixin):  # handles GETs for many Companies

      serializer_class = UserSerializer
      queryset = Usuario.objects.all()
#class UserViewset(viewsets.ModelViewSet):
#   queryset = User.objects.all()
#  serializer_class = UserSerializer
# Create your views here.
