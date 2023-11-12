
from rest_framework import serializers
#from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from .models import *
from .utils import get_geocod
from rest_framework.validators import UniqueValidator
from django.db.models import Avg
User = get_user_model()

class registercommonUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password], min_length=8)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = clapsUser
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
        'first_name': {'required': True},
        'last_name': {'required': True}
        }
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
            {"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_teatro=False,
            is_company=False,
            is_commonUser=True
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class registerTeatroSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    direction = serializers.CharField(max_length=120, required=True)
    city = serializers.CharField(max_length=100, required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password], min_length=8)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = clapsUser
        fields = ('username', 'password', 'password2', 'email', 'direction','city')
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
            {"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        lat,lng = get_geocod(validated_data['direction'] + ", " + validated_data['city'])
        print(lat,lng)
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            direction=validated_data['direction'],
            latit = lat,
            longit = lng,
            is_teatro=True,
            is_company=False,
            is_commonUser=False
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class registerHallSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password], min_length=8)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = clapsUser
        fields = ('username', 'password', 'password2', 'email')
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
            {"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            is_teatro=False,
            is_company=True,
            is_commonUser=False
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    class Meta:
        model = clapsUser
        fields = ['username', 'password']

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise serializers.ValidationError('user or password wrong')
        return user 
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = clapsUser
        fields = ["email", "username", "first_name", "last_name", "is_teatro", "is_company", "is_commonUser"]

class auxQueryShowSerializer(serializers.ModelSerializer):
    titulo = serializers.CharField()
    teatro = serializers.CharField()
    sinopsis = serializers.CharField()
    trailer_url = serializers.CharField()
    fecha_show = serializers.DateTimeField()

    class Meta:
        model = show
        fields = ["titulo","teatro","sinopsis","trailer_url","fecha_show"]
    def createShow(self, validated_data,username):
        queryTeatro = clapsUser.objects.get(username=validated_data["teatro"])
        queryCompany = clapsUser.objects.get(username=username)
        print(queryCompany)
        if (queryTeatro and queryCompany):
            newshow = show.objects.create(
                titulo = validated_data["titulo"],
                teatro = queryTeatro,
                company = queryCompany,
                sinopsis = validated_data["sinopsis"],
                trailer_url = validated_data["trailer_url"],
                fecha_show = validated_data["fecha_show"],
                avg_rating = 0
            )
            newshow.save()

class CritSerializer(serializers.ModelSerializer):
    cuerpo_crit = serializers.CharField()
    rating = serializers.IntegerField()
    
    class Meta:
        model = critica
        fields = ['cuerpo_crit', 'rating', 'id_show']

    def create(self, validated_data,username):
        queryUser = clapsUser.objects.get(username=username)
        queryShow = show.objects.get(id_show=validated_data["id_show"])
        
        if (queryUser):
            newCrit = critica.objects.create(
                cuerpo_crit = validated_data["cuerpo_crit"],
                rating = validated_data["rating"],
                id_show = queryShow,
                author = queryUser
            )
            newCrit.save()
            queryCrits = critica.objects.all().filter(id_show=validated_data["id_show"])
            avg = queryCrits.aggregate(Avg("rating", default=0))['rating__avg']
            print(avg)
            queryShow.avg_rating = avg
            queryShow.save(update_fields=['avg_rating'])

