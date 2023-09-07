from django.urls import path
from . import views
from .views import create_appointment, get_appointments, get_appointment, delete_appointment


urlpatterns = [
    path('create/', views.create_appointment, name='create-appointment'),
    path('all/', views.get_appointments, name='get-all-appointments'),
    path('<int:pk>/', views.get_appointment, name='get-appointment'),
    path('delete/<int:pk>/', views.delete_appointment, name='delete-appointment'),
]
