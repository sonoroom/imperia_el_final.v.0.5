from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Кастомный менеджер моделей для нашей модели Customer,
    где email является уникальным идентификатором для аутентификации вместо username.
    """

    def create_user(self, email, password, **extra_fields):
        """Создает и сохраняет пользователя с указанным email и паролем."""
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """Создает и сохраняет суперпользователя с указанным email и паролем."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)


class Customer(AbstractUser):
    # Убираем стандартное поле username, оно нам не нужно
    username = None
    # Делаем email уникальным и обязательным полем
    email = models.EmailField(_('email address'), unique=True)
    nickname = models.CharField(max_length=100, blank=True, verbose_name="Никнейм")

    # Говорим Django, что поле email теперь будет использоваться как USERNAME_FIELD
    USERNAME_FIELD = 'email'
    # Указываем, какие поля обязательны при создании суперпользователя
    REQUIRED_FIELDS = ['nickname']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


from django.db import models

# Create your models here.
