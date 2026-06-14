from django.contrib import admin
from .models import (
    Car,
    CarImage,
    Settings,
    Statistic,
    Advantage,
    About,
    ContactMessage,
    Brand,
)


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Settings)
class SettingsAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle", "email")
    search_fields = ("title", "subtitle", "email")


@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "icon")
    list_editable = ("value", "icon")


class CarImageInline(admin.TabularInline):
    model = CarImage
    extra = 5
    fields = ("image",)


import cloudinary.uploader
import os
import logging

logger = logging.getLogger(__name__)

def delete_car_images_from_cloudinary(car_obj):
    """
    Удаляет главное изображение автомобиля и все дополнительные фото из Cloudinary.
    """
    try:
        for car_image in car_obj.images.all():
            if car_image.image and car_image.image.name:
                
                public_id = os.path.splitext(car_image.image.name)[0]
                cloudinary.uploader.destroy(public_id)
                cloudinary.uploader.destroy(car_image.image.name)
                
        if car_obj.image and car_obj.image.name:
            public_id = os.path.splitext(car_obj.image.name)[0]
            cloudinary.uploader.destroy(public_id)
            cloudinary.uploader.destroy(car_obj.image.name)
    except Exception as e:
        logger.error(f"Ошибка при удалении изображений из Cloudinary для машины ID {car_obj.pk}: {e}")

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ("title", "brand", "year", "price", "status", "is_featured")
    list_filter = ("brand", "status", "is_featured")
    search_fields = ("title",)
    list_editable = ("is_featured",)
    inlines = [CarImageInline]

    def delete_model(self, request, obj):
        delete_car_images_from_cloudinary(obj)
        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            delete_car_images_from_cloudinary(obj)
        super().delete_queryset(request, queryset)


@admin.register(Advantage)
class AdvantageAdmin(admin.ModelAdmin):
    list_display = ("title", "order")
    list_editable = ("order",)


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not About.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "created_at", "is_processed")
    list_filter = ("is_processed", "created_at")
    readonly_fields = ("name", "email", "phone", "message", "created_at")
    list_editable = ("is_processed",)
    list_per_page = 20
