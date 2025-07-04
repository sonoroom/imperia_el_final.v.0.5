from django.db import models


class Category(models.Model):
    """Модель категорий товаров (Электроника, Комплектующие и т.д.)"""
    name = models.CharField(max_length=200, verbose_name="Название категории")
    slug = models.SlugField(max_length=200, unique=True)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children',
        verbose_name="Родительская категория"
    )
    # Вот и первая часть магии! Связываем категорию с набором атрибутов,
    # которые должны быть у товаров в этой категории.
    tags = models.ManyToManyField('Tag', blank=True, verbose_name="Теги категорий")
    attributes = models.ManyToManyField('Attribute', blank=True, verbose_name="Атрибуты категории")

    class Meta:
        # Для корректного отображения в админке
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name

class Tag(models.Model):
    """Модель для тегов-характеристик (Изогнутый, HDR, Встроенные колонки и т.д.)"""
    name = models.CharField(max_length=100, unique=True, verbose_name="Название тега")
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"

    def __str__(self):
        return self.name

class Attribute(models.Model):
    """Модель для названий атрибутов/характеристик. Наш "справочник". """
    name = models.CharField(max_length=100, verbose_name="Название атрибута")
    unit = models.CharField(max_length=20, blank=True, null=True,
                            verbose_name="Единица измерения")  # например, "Гц", "дюйм", "мм"

    class Meta:
        verbose_name = "Атрибут"
        verbose_name_plural = "Атрибуты"

    def __str__(self):
        return self.name

class Product(models.Model):
    """Основная модель товара."""
    name = models.CharField(max_length=255, verbose_name="Название товара")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products', verbose_name="Категория")
    is_active = models.BooleanField(default=True, verbose_name="Активен")
    is_new = models.BooleanField(default=False, verbose_name="Новинка")
    is_favorite = models.BooleanField(default=False, verbose_name="Популярный")
    tags = models.ManyToManyField(Tag, blank=True, verbose_name="Теги")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="URL-слаг")

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    """ Модель для хранения изображений. Теперь привязывается напрямую к ТОВАРУ. """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images', verbose_name="Товар")
    image = models.ImageField(upload_to='product_images/', verbose_name="Изображение")
    is_main = models.BooleanField(default=False, verbose_name="Основное изображение")

    class Meta:
        verbose_name = "Изображение товара"
        verbose_name_plural = "Изображения товаров"

    def __str__(self):
        return f"Изображение для {self.product.name}"



class ProductAttribute(models.Model):
    """Модель для хранения конкретных значений атрибутов для конкретных товаров."""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attributes', verbose_name="Товар")
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, verbose_name="Атрибут")
    value = models.CharField(max_length=255, verbose_name="Значение")

    class Meta:
        verbose_name = "Атрибут товара"
        verbose_name_plural = "Атрибуты товаров"
        # Гарантируем, что у одного товара не будет двух одинаковых атрибутов
        unique_together = ('product', 'attribute')

    def __str__(self):
        return f"{self.product.name} - {self.attribute.name}: {self.value}"




