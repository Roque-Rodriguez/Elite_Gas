from django.urls import path
from . import views

urlpatterns = [
    path(' ', views.create_invoice, name='create-invoice'),
    path('<int:pk>/', views.get_invoice, name='get-invoice'),
    path('<int:pk>/delete/', views.delete_invoice, name='delete-invoice'),
]
