
from rest_framework import serializers
#from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from .models import clapsUser
from rest_framework.validators import UniqueValidator

User = get_user_model()

''' 
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only = True,
        min_length = 8,
        error_messages={
            "min_length": "contraseña debe tener al menos 8 caracteres"
        }
    )

    password2 = serializers.CharField(
        write_only = True,
        min_length = 8,
        error_messages={
            "min_length": "contraseña debe tener al menos 8 caracteres"
        }
    )

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {"password": {"error_messages": {"required": "Give yourself a username"}}}

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("las contraseñas no coinciden")
        return super().validate(data)
        
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email = validated_data["email"],
            first_name=validated_data["first_name"],
            last_name = validated_data["last_name"],
            is_active=validated_data["is_active"]
        )

        user.set_password(validated_data["password"])
        user.save()

        return user
'''
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
            is_hall=False,
            is_commonUser=True
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class registerTeatroSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    direction = serializers.CharField(max_length=120)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password], min_length=8)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = clapsUser
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'direction')
        
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
            direction=validated_data['direction'],
            is_teatro=True,
            is_hall=False,
            is_commonUser=False
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class registerHallSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=clapsUser.objects.all())])
    direction = serializers.CharField(max_length=120)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password], min_length=8)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = clapsUser
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name','direction')
        
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
            direction=validated_data['direction'],
            is_teatro=False,
            is_hall=True,
            is_commonUser=False
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise serializers.ValidationError('user not found')
        return user 
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = clapsUser
        fields = ["email", "username", "first_name", "last_name", "is_teatro", "is_hall", "is_commonUser"]


#DON'T USE, THIS WAS A TEST
class customUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only = True,
        min_length = 8,
        error_messages={
            "min_length": "contraseña debe tener al menos 8 caracteres"
        }
    )
    class Meta:
        model = clapsUser
        fields = "__all__"
        extra_kwargs = {"password": {"error_messages": {"required": "Give yourself a username"}}}

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email = validated_data["email"],
            first_name=validated_data["first_name"],
            last_name = validated_data["last_name"],
            is_active=validated_data["is_active"]
        )

        user.set_password(validated_data["password"])
        user.save()

        return user

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("las contraseñas no coinciden")
        return super().validate(data)