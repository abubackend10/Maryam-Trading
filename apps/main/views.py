from django.shortcuts import get_object_or_404, render, redirect
from django.contrib import messages
from django_ratelimit.decorators import ratelimit
from .models import Advantage, Car, Settings, About, ContactMessage, Brand, Statistic
def home(request):
    featured_cars = Car.objects.filter(is_featured=True)[:4]
    advantages = Advantage.objects.all()
    return render(request, 'index.html', {
        'featured_cars': featured_cars, 
        'advantages': advantages
    })
def gallery(request):
    cars = Car.objects.all()
    brands = Brand.objects.all()
    return render(request, 'gallery.html', {
        'cars': cars,
        'brands': brands
    })
def car_details(request, car_id):
    car = get_object_or_404(Car, id=car_id)
    return render(request, 'car-details.html', {'car': car})

def about(request):
    about_data = About.objects.first()
    return render(request, 'about.html', {'about': about_data})

@ratelimit(key='ip', rate='5/h', method='POST', block=True)
def contact(request):
    if request.method == 'POST':
        if request.POST.get('website'):
            messages.success(request, 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.')
            return redirect('contact')
        name, email = request.POST.get('name', '').strip(), request.POST.get('email', '').strip()
        phone, message = request.POST.get('phone', '').strip(), request.POST.get('message', '').strip()
        if name and email and phone and message:
            ContactMessage.objects.create(name=name, email=email, phone=phone, message=message)
            messages.success(request, 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.')
            return redirect('contact')
        else:
            messages.error(request, 'Пожалуйста, заполните все поля формы.')

    return render(request, 'contact.html')
