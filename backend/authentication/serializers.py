from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # for any additional fields you'd like to add to the JWT sent back in response
        # add below using the token["field name"] = user.name_of_property
        # token["is_student"] = user.is_student

        token["username"] = user.username
        token["first_name"] = user.first_name
        token["is_cs"] = user.is_cs
        token["is_sales"] = user.is_sales
        token["is_customer"] = user.is_customer
        token["address"] = user.adress
        token["number"] = user.number

        return token


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
        UniqueValidator(queryset=User.objects.all())])

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    is_cs = serializers.BooleanField(default=False)
    is_sales = serializers.BooleanField(default=False)
    is_customer = serializers.BooleanField(
        default=True)  # Default value for new users
    address = serializers.CharField(max_length=255, required=False)
    number = serializers.CharField(max_length=20, required=False)

    class Meta:
        model = User
        fields = ['email', 'password', 'is_cs',
                  'is_sales', 'is_customer', 'address', 'number']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            is_cs=validated_data["is_cs"]
        )
        user.is_cs = validated_data.get('is_cs', False)
        user.is_sales = validated_data.get('is_sales', False)
        user.is_customer = validated_data.get('is_customer', True)
        user.address = validated_data.get('address', '')
        user.number = validated_data.get('number', '')
        user.save()
        return user
