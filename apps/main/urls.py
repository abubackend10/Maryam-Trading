from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("catalog/", views.catalog, name="catalog"),
    path("car/<int:car_id>/", views.car_details, name="car_details"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
]
