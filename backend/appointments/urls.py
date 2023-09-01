from django.urls import path
from . import views
from .views import manage_appointment


urlpatterns = [
    path(' ', views.manage_appointment, name='create-appointment'),
    path('<int:pk>/', views.manage_appointment, name='get-appointment'),
    path('<int:pk>/delete/', views.manage_appointment, name='delete-appointment'),
]
