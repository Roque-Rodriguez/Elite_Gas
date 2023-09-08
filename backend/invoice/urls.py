from django.urls import path
from . import views
from .views import get_invoices, create_invoice, get_invoice_detail, delete_invoice

urlpatterns = [
    path('all/', views.get_invoices, name='get all'),
    path('post/', views.create_invoice, name='create-invoice'),
    path('put/<int:pk>/', views.update_invoice, name='edit-invoice'),
    path('<int:pk>/', views.get_invoice_detail, name='get-invoice'),
    path('delete/<int:pk>/', views.delete_invoice, name='delete-invoice'),
]
