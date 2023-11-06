from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework import generics, viewsets, permissions, status
from django.db.models.base import ObjectDoesNotExist
from .validation import *
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        userdata = custom_validation(request.data)
        serializer = registercommonUserSerializer(data=userdata)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(userdata)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)    
        
class companyRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        userdata = custom_validation(request.data)
        serializer = registerHallSerializer(data=userdata)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(userdata)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)    

class TeatroRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        userdata = custom_validation(request.data)
        serializer = registerTeatroSerializer(data=userdata)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(userdata)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)    

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def post(self,request):
        data = request.data
        assert validate_username(data)
        assert validate_password(data)
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            #login(request, user)
            refresh = RefreshToken.for_user(user)
            return JsonResponse(
                {
                    'refresh':str(refresh),
                    'access':str(refresh.access_token)
                }
            )
        return Response(status=status.HTTP_400_BAD_REQUEST) 
    

class UserLogout(APIView):
    def post(self,request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
        #return JsonResponse({
        #    "allowance":'allowed'
        #})
class newShowView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    
    def post(self,request):
        serializer = auxQueryShowSerializer(request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                q = clapsUser.objects.get(username=request.user)
                Response({'data': q.data}, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'Error': 'User does not exist'})
            

