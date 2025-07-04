from rest_framework import serializers
from .models import Product, Category, Attribute, ProductAttribute, ProductImage, Tag

# Сначала определим сериализаторы для "вложенных" частей

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'slug']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # Добавляем 'parent' в список полей
        fields = ['id', 'name', 'slug', 'parent']# Показываем только нужные поля категории

class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ['name', 'unit'] # Показываем название и ед. измерения атрибута

class ProductAttributeSerializer(serializers.ModelSerializer):
    # Включаем информацию из связанной модели Attribute
    attribute = AttributeSerializer(read_only=True)

    class Meta:
        model = ProductAttribute
        fields = ['attribute', 'value'] # Нас интересует сам атрибут и его значение

# А теперь главный сериализатор для Продукта!

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image', 'is_main']

class ProductSerializer(serializers.ModelSerializer):
    # Говорим ему: "Когда будешь сериализовать поле 'category',
    # используй для этого CategorySerializer".
    category = CategorySerializer(read_only=True)

    # А для поля 'attributes' (related_name из модели ProductAttribute),
    # используй ProductAttributeSerializer. many=True означает, что их будет много.
    attributes = ProductAttributeSerializer(many=True, read_only=True)

    # Добавляем сериализацию изображений
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        # Указываем все поля, которые хотим видеть в итоговом JSON
        fields = [
            'id',
            'name',
            'description',
            'price',
            'category',   # <-- Сюда подставятся данные из CategorySerializer
            'attributes',  # <-- А сюда - список из ProductAttributeSerializer
            'tags',
            'is_favorite',
            'is_new',
            'slug',
            'images',
        ]
