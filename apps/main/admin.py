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


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ("title", "brand", "year", "price", "status", "is_featured")
    list_filter = ("brand", "status", "is_featured")
    search_fields = ("title",)
    list_editable = ("is_featured",)
    inlines = [CarImageInline]


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
