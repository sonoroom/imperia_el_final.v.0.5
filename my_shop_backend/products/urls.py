from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, AttributeViewSet

# Создаем маршрутизатор
router = DefaultRouter()

# Регистрируем наши ViewSet'ы. DRF сам создаст все нужные URL'ы.
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'attributes', AttributeViewSet)

# Основной URL-паттерн нашего приложения
urlpatterns = [
    path('', include(router.urls)),
]