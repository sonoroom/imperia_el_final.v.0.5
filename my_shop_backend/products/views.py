from rest_framework import viewsets
from .models import Product, Category, Attribute
from .serializers import ProductSerializer, CategorySerializer, AttributeSerializer
from django_filters.rest_framework import DjangoFilterBackend


# Представление для Товаров
class ProductViewSet(viewsets.ModelViewSet):
    """
    API эндпоинт для просмотра и редактирования товаров.
    Предоставляет все действия: list, retrieve, create, update, destroy.
    """
    # 1. Какие "юниты" мы используем? Все активные товары.
    queryset = Product.objects.filter(is_active=True)
    # 2. Какой "переводчик" мы используем для этих юнитов?
    serializer_class = ProductSerializer
    # Всё! DRF сделает остальное.
    lookup_field = 'slug'
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('category__slug',)


# Представление для Категорий
class CategoryViewSet(viewsets.ModelViewSet):
    """
    API эндпоинт для просмотра и редактирования категорий.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# Представление для Атрибутов
class AttributeViewSet(viewsets.ModelViewSet):
    """
    API эндпоинт для просмотра и редактирования атрибутов (нашего справочника).
    """
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer


from django.shortcuts import render

# Create your views here.
