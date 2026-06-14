from django.shortcuts import get_object_or_404, render, redirect
from django.contrib import messages
from django_ratelimit.decorators import ratelimit
from .models import (
    Advantage,
    Car,
    Settings,
    About,
    ContactMessage,
    Brand,
    Statistic,
)


def home(request):
    featured_cars = Car.objects.filter(is_featured=True)[:4]
    advantages = Advantage.objects.all()
    return render(
        request,
        "index.html",
        {"featured_cars": featured_cars, "advantages": advantages},
    )


def catalog(request):
    cars = Car.objects.all()
    brands = Brand.objects.all()
    return render(request, "catalog.html", {"cars": cars, "brands": brands})


def car_details(request, car_id):
    car = get_object_or_404(Car, id=car_id)
    return render(request, "car-details.html", {"car": car})


def about(request):
    about_data = About.objects.first()
    return render(request, "about.html", {"about": about_data})


import urllib.request
import urllib.parse
import json
import logging
from django.conf import settings as django_settings

logger = logging.getLogger(__name__)

@ratelimit(key="ip", rate="5/h", method="POST", block=True)
def contact(request):
    if request.method == "POST":
        if request.POST.get("website"):
            messages.success(
                request,
                "Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
            )
            return redirect("contact")
            
        # Cloudflare Turnstile Validation
        turnstile_response = request.POST.get("cf-turnstile-response")
        if not turnstile_response:
            messages.error(request, "Пожалуйста, пройдите проверку на робота.")
            return render(request, "contact.html", {"TURNSTILE_SITE_KEY": django_settings.TURNSTILE_SITE_KEY})
            
        try:
            data = urllib.parse.urlencode({
                "secret": django_settings.TURNSTILE_SECRET_KEY,
                "response": turnstile_response,
                "remoteip": request.META.get("REMOTE_ADDR")
            }).encode()
            req = urllib.request.Request("https://challenges.cloudflare.com/turnstile/v0/siteverify", data=data)
            with urllib.request.urlopen(req, timeout=5) as response:
                result = json.loads(response.read().decode())
                if not result.get("success"):
                    logger.warning(f"Turnstile verification failed: {result}")
                    messages.error(request, "Проверка на робота не пройдена. Пожалуйста, попробуйте еще раз.")
                    return render(request, "contact.html", {"TURNSTILE_SITE_KEY": django_settings.TURNSTILE_SITE_KEY})
        except Exception as e:
            logger.error(f"Turnstile verification error: {e}")
            messages.error(request, "Произошла ошибка при проверке соединения. Пожалуйста, попробуйте позже.")
            return render(request, "contact.html", {"TURNSTILE_SITE_KEY": django_settings.TURNSTILE_SITE_KEY})

        name, email = (
            request.POST.get("name", "").strip(),
            request.POST.get("email", "").strip(),
        )
        phone, message = (
            request.POST.get("phone", "").strip(),
            request.POST.get("message", "").strip(),
        )
        if name and email and phone and message:
            ContactMessage.objects.create(
                name=name, email=email, phone=phone, message=message
            )
            messages.success(
                request,
                "Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
            )
            return redirect("contact")
        else:
            messages.error(request, "Пожалуйста, заполните все поля формы.")

    return render(request, "contact.html", {"TURNSTILE_SITE_KEY": django_settings.TURNSTILE_SITE_KEY})
