from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('gallery/', views.gallery, name='gallery'),
    path('car/<int:car_id>/', views.car_details, name='car_details'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),

]