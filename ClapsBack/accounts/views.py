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
        print(request.body)
        userdata = custom_validation(request.data)
        serializer = registerHallSerializer(data=userdata)
        print(request.data)
        if serializer.is_valid(raise_exception=True):
            print(request.data)
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
            print("a")
            user = serializer.create(userdata)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)    

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def post(self,request):
        data = request.data
        try:
            assert validate_username_login(data)
        except ValidationError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            assert validate_password(data)
        except ValidationError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=False):
            user = serializer.check_user(clean_data=data)
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
    
    def post(self,request):
        serializer = auxQueryShowSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                #print(request.user.username)
                serializer.createShow(request.data,request.user.username)
                return Response({'confirmation':"Show created succesfully"})
            except ObjectDoesNotExist:
                return Response({'Error': 'User does not exist'})
            
class newCrit(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self,request):
        serializer = CritSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.create(request.data,request.user.username)
                return Response({'confirmation':"Review posted succesfully"})
            except ObjectDoesNotExist:
                return Response({'Error': 'User does not exist'})
            
class getShows(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request):
        queryShows = show.objects.all()
        serializer = auxQueryShowSerializer(queryShows, many=True)
        if queryShows:
            return Response(serializer.data)
        else:
            return Response({"None":"no shows found"})
        


