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
from django.db import transaction

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
    permission_classes = (permissions.AllowAny,)

    def post(self,request):
        print(request.user)
        serializer = CritSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.create(request.data,request.user.username)
                return Response({'confirmation':"Review posted succesfully"})
            except ObjectDoesNotExist:
                return Response({'Error': 'User does not exist'})

class deleteCrit(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self,request):
        critSelected = critica.objects.get(id=request.data.id)
        user = clapsUser.objects.get(username=user)
        #serializer = CritSerializer(critSelected)
        if ((critSelected.author_id == request.user) or user.is_teatro):
            critSelected.delete()
            return Response({'confirmation':"Erased Succesfully"})
        else:
            return Response({'Error':'user not authorized to delete this review'})
        

class getShows(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request):
        print(request.user)
        queryShows = show.objects.all().order_by('-fecha_show')
    
        serializer = ShowSerializer(queryShows, many=True)
        if queryShows:
            return Response(serializer.data)
        else:
            return Response({"None":"no shows found"})
        
class deleteShow(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        queryUser = clapsUser.objects.get(username=request.user)
        if (queryUser.is_superuser):
            data = request.data
            q = show.objects.get(id_show=data['id_show'])
            if (q):
                q.delete()
                print("delete")
            return Response({'confirmation':'Show removed succesfully'})
        else:
            return Response({'Error':'User not allowed to do this'})
        
class deleteUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post (self, request):
        user = self.request.user
        user.delete()

        return Response({'confirmation':'User removed succesfully'})

class updateUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post (self,request):
        try:
            data = request.data 
            assert validate_username_reg(data)
            assert validate_email(data)
            queryNewUser = clapsUser.objects.filter(username=data['username'])
            queryEmail = clapsUser.objects.filter(email=data['email'])
            if (queryNewUser):
                return Response({'Error':'Username already exists'})
            if (queryEmail):
                return Response({'Error':'Email already in user'})
            queryUser = clapsUser.objects.filter(username=request.user)
            if (queryUser):
                with transaction.atomic():
                    queryUser.update(
                        username=data['username'],
                        email=data['email']
                    )
                    queryShow = show.objects.filter(company_id=request.user)
                    if (queryShow):
                        for shows in queryShow:
                            shows.update(
                                company_id=data['username']
                            )
                    queryShow2 = show.objects.filter(teatro_id=request.user)
                    if (queryShow2):
                        for shows in queryShow2:
                            shows.update(
                                teatro_id=data['username']
                            )
                    critica.objects.filter(author_id=request.user).update(author_id=data['username'])
                return Response({'User information updated succesfully'})
        except ValidationError:
            return Response({'Error':'information is not valid'})