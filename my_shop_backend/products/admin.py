from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Category, Product, Attribute, ProductAttribute, Tag, ProductImage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'slug')
    # Автоматически заполняет поле 'slug' на основе поля 'name'
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Attribute)
class AttributeAdmin(admin.ModelAdmin):
    list_display = ('name', 'unit')
    search_fields = ('name',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

# --- Самая интересная часть ---

# Создаем "встроенный" редактор для атрибутов товара.
# Это позволит редактировать атрибуты прямо на странице товара.
class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    # Количество пустых форм для добавления новых атрибутов
    extra = 1


# --- 2. НОВЫЙ КЛАСС ДЛЯ ИЗОБРАЖЕНИЙ ---
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1  # Количество пустых слотов для загрузки
    readonly_fields = ('image_preview',)  # Добавляем поле для превью

    def image_preview(self, obj):
        # Эта функция создает HTML для отображения миниатюры
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="100" />')
        return "Нет изображения"

    image_preview.short_description = "Превью"

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_active', 'is_new', 'is_favorite')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'description')
    filter_horizontal = ('tags',)
    inlines = [ProductAttributeInline, ProductImageInline]
    prepopulated_fields = {'slug': ('name',)}



# Модель ProductAttribute нам больше не нужна как отдельный пункт в админке,
# так как мы управляем ей через страницу Товара.
# Если хотите оставить ее видимой, раскомментируйте строку ниже.
# admin.site.register(ProductAttribute)
# Register your models here.
