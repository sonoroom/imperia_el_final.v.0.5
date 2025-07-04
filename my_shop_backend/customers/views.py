from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Customer
from .serializers import CustomerRegistrationSerializer


class RegistrationView(generics.CreateAPIView):
    """
    API эндпоинт для регистрации новых пользователей.
    Доступен всем (AllowAny).
    """
    queryset = Customer.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CustomerRegistrationSerializer


from django.shortcuts import render

# Create your views here.
