from django.urls import path
from . import views
from .views import create_appointment, get_appointments, delete_appointment, update_appointment, user_appointments

urlpatterns = [
    path('create/', create_appointment, name='create-appointment'),
    path('all/', get_appointments, name='get-all-appointments'),
    # Use get_appointments instead
    path('<int:pk>/', get_appointments, name='get-appointment'),
    path('put/<int:pk>/', update_appointment, name='update-appointment'),
    path('delete/<int:pk>/', delete_appointment, name='delete-appointment'),
    path('user/<int:user_id>/', user_appointments, name='user_appointments'),
]
