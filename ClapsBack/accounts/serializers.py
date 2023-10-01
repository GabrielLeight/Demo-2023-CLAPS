
from rest_framework import serializers
from django.contrib.auth.models import User

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