from django.db import models
import urllib.parse as urlparse


class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Название марки")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Марка"
        verbose_name_plural = "4) Марки"


class Settings(models.Model):
    favicon = models.ImageField(
        upload_to="favicons/", blank=True, null=True, verbose_name="Фавикон"
    )
    logo = models.ImageField(upload_to="logos/", blank=True, null=True)
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=150)
    description = models.TextField(max_length=500)
    image = models.ImageField(upload_to="hero_image/")
    watsapp = models.CharField(max_length=20)
    telegram = models.CharField(max_length=20)
    instagram = models.CharField(max_length=20)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=100)
    working_hours = models.TextField(
        verbose_name="Часы работы",
        default="Пн-Пт: 9:00 - 18:00\r\nСб: 10:00 - 15:00",
        max_length=500,
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Основная настройка"
        verbose_name_plural = "1) Основные настройки"


class Statistic(models.Model):
    label = models.CharField(max_length=100, verbose_name="Заголовок")
    value = models.IntegerField(verbose_name="Значение")
    icon = models.CharField(
        max_length=100, verbose_name="Иконка FontAwesome", blank=True
    )

    def __str__(self):
        return self.label

    class Meta:
        verbose_name = "Статистика"
        verbose_name_plural = "2) Статистики"


class Car(models.Model):
    STATUS_CHOICES = [
        ("new", "Новый"),
        ("used", "С пробегом"),
    ]

    FUEL_CHOICES = [
        ("Бензин", "Бензин"),
        ("Дизель", "Дизель"),
        ("Электрический", "Электрический"),
    ]

    TRANSMISSION_CHOICES = [
        ("Автомат", "Автомат"),
        ("Механика", "Механика"),
    ]

    DRIVE_CHOICES = [
        ("Передний", "Передний"),
        ("Задний", "Задний"),
        ("Полный", "Полный"),
    ]

    WHEEL_CHOICES = [
        ("Левый", "Левый"),
        ("Правый", "Правый"),
    ]

    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET_NULL,
        related_name="cars",
        verbose_name="Марка",
        null=True,
        blank=True,
    )
    title = models.CharField(max_length=255, verbose_name="Название (Марка и модель)")
    description = models.TextField(verbose_name="Описание")
    year = models.PositiveIntegerField(verbose_name="Год выпуска")
    mileage = models.PositiveIntegerField(verbose_name="Пробег (км)")
    fuel_type = models.CharField(
        max_length=100, choices=FUEL_CHOICES, verbose_name="Тип топлива"
    )
    transmission = models.CharField(
        max_length=100, choices=TRANSMISSION_CHOICES, verbose_name="Коробка передач"
    )
    color = models.CharField(max_length=100, verbose_name="Цвет")
    price = models.IntegerField(verbose_name="Цена ($)")
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default="used", verbose_name="Статус"
    )
    image = models.ImageField(upload_to="cars/", verbose_name="Главное изображение")
    video_url = models.URLField(
        max_length=500, blank=True, null=True, verbose_name="YouTube видео"
    )
    engine = models.CharField(
        max_length=100, verbose_name="Двигатель", blank=True, null=True
    )
    drive = models.CharField(
        max_length=100,
        choices=DRIVE_CHOICES,
        verbose_name="Привод",
        blank=True,
        null=True,
    )
    wheel = models.CharField(
        max_length=100, choices=WHEEL_CHOICES, verbose_name="Руль", default="Левый"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(
        default=False, verbose_name="Показывать на главной"
    )
    is_sold = models.BooleanField(default=False, verbose_name="Продано")

    @property
    def youtube_embed_url(self):
        if not self.video_url:
            return None
        url = self.video_url.strip()
        video_id = None

        if "youtube.com/embed/" in url:
            return url.replace("youtube.com/embed/", "youtube-nocookie.com/embed/")
        elif "youtube-nocookie.com/embed/" in url:
            return url

        elif "youtube.com/watch" in url:
            parsed = urlparse.urlparse(url)
            v_param = urlparse.parse_qs(parsed.query).get("v")
            if v_param:
                video_id = v_param[0]

        elif "youtu.be/" in url:
            video_id = url.split("youtu.be/")[-1].split("?")[0]

        elif "youtube.com/shorts/" in url:
            video_id = url.split("shorts/")[-1].split("?")[0]
        if video_id:
            return f"https://www.youtube-nocookie.com/embed/{video_id}"
        return None

    @property
    def formatted_price(self):
        return f"{self.price or 0:,}".replace(",", " ")

    @property
    def formatted_mileage(self):
        return f"{self.mileage or 0:,}".replace(",", " ")

    @property
    def youtube_preview_url(self):
        embed_url = self.youtube_embed_url
        if embed_url and "embed/" in embed_url:
            video_id = embed_url.split("/")[-1].split("?")[0]
            return f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"
        return None

    def __str__(self):
        return f"{self.title} ({self.year})"

    class Meta:
        verbose_name = "Автомобиль"
        verbose_name_plural = "3) Автомобили"
        ordering = ["-created_at"]


class CarImage(models.Model):
    car = models.ForeignKey(
        Car, related_name="images", on_delete=models.CASCADE, verbose_name="Автомобиль"
    )
    image = models.ImageField(
        upload_to="cars/gallery/", verbose_name="Дополнительное фото"
    )

    def __str__(self):
        return f"Фото для {self.car.title}"

    class Meta:
        verbose_name = "Дополнительное фото"
        verbose_name_plural = "Дополнительные фото"


class Advantage(models.Model):
    icon = models.CharField(max_length=100, verbose_name="Иконка FontAwesome")
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок сортировки")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Преимущество"
        verbose_name_plural = "5) Преимущества"
        ordering = ["order"]


class About(models.Model):
    history = models.TextField(verbose_name="История компании")
    image = models.ImageField(upload_to="about/", verbose_name="Изображение")

    def __str__(self):
        return "Информация 'О нас'"

    class Meta:
        verbose_name = "О нас"
        verbose_name_plural = "6) О нас"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    message = models.TextField(verbose_name="Сообщение")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата отправки")
    is_processed = models.BooleanField(default=False, verbose_name="Обработано")

    def __str__(self):
        return (
            f"Сообщение от {self.name} ({self.created_at.strftime('%d.%m.%Y %H:%M')})"
        )

    class Meta:
        verbose_name = "Сообщение с сайта"
        verbose_name_plural = "7) Сообщения с сайта"
        ordering = ["-created_at"]
