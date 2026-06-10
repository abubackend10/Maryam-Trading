from django.shortcuts import get_object_or_404, render, redirect
from django.contrib import messages
from django_ratelimit.decorators import ratelimit
# pyrefly: ignore [missing-import]
from .models import Advantage, Car, Settings, About, ContactMessage

def home(request):
    featured_cars = Car.objects.filter(is_featured=True)[:4]
    advantages = Advantage.objects.all()
    return render(request, 'index.html', {
        'featured_cars': featured_cars, 
        'advantages': advantages
    })


def gallery(request):
    cars = Car.objects.all()
    return render(request, 'gallery.html', {'cars': cars})


def car_details(request, car_id):
    car = get_object_or_404(Car, id=car_id)
    settings = Settings.objects.first()
    return render(request, 'car-details.html', {'car': car, 'settings': settings})

def about(request):
    about_data = About.objects.first()
    return render(request, 'about.html', {'about': about_data})

@ratelimit(key='ip', rate='5/h', block=True)
def contact(request):
    if request.method == 'POST':
        # Honeypot field (hidden from real users, filled by bots)
        honeypot = request.POST.get('website', '')
        if honeypot:
            # Fake success for bots
            messages.success(request, 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.')
            return redirect('contact')

        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')

        if name and email and phone and message:
            ContactMessage.objects.create(
                name=name, email=email, phone=phone, message=message
            )
            messages.success(request, 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.')
            return redirect('contact')
        else:
            messages.error(request, 'Пожалуйста, заполните все поля формы.')

    settings = Settings.objects.first()
    return render(request, 'contact.html', {'settings': settings})
