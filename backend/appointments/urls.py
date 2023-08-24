from django.urls import path
from . import views


urlpatterns = [
    path(' ', views.create_appointment, name='create-appointment'),
    path('/<int:pk>/', views.get_appointment, name='get-appointment'),
    path('/<int:pk>/delete/',
         views.delete_appointment, name='delete-appointment'),
]
