from django.urls import path
from . import views
from .views import manage_invoice

urlpatterns = [
    path(' ', views.manage_invoice, name='create-invoice'),
    path('<int:pk>/', views.manage_invoice, name='get-invoice'),
    path('<int:pk>/delete/', views.manage_invoice, name='delete-invoice'),
]
