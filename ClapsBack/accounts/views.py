from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework import generics, viewsets, permissions, status
from .validation import *
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
        
class HallRegister(APIView):
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
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST) 
    

class UserLogout(APIView):
    def post(self,request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


#DON'T USE, JUST FOR LEARNING PURPOSES
'''
class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    def get(self,request,*args,**kwargs):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = registerSerializer


class CurrentUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = customUserSerializer
'''