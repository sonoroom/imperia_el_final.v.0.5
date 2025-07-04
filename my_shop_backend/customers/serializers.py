from rest_framework import serializers
from .models import Customer

class CustomerRegistrationSerializer(serializers.ModelSerializer):
    # Поле password делаем write_only, чтобы оно не возвращалось в ответе API
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Customer
        # Указываем поля, которые будут использоваться при регистрации
        fields = ('email', 'nickname', 'password')

    def create(self, validated_data):
        # Используем наш кастомный метод create_user для правильного хэширования пароля
        user = Customer.objects.create_user(
            email=validated_data['email'],
            nickname=validated_data['nickname'],
            password=validated_data['password']
        )
        return user