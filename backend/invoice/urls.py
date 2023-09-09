from django.urls import path
from . import views
from .views import get_invoices, create_invoice, get_invoice_detail, delete_invoice, get_invoices_by_user

urlpatterns = [
    path('all/', views.get_invoices, name='get_all_invoices'),
    path('post/', views.create_invoice, name='create_invoice'),
    path('put/<int:pk>/', views.update_invoice, name='update_invoice'),
    path('<int:pk>/', views.get_invoice_detail, name='get_invoice_detail'),
    path('delete/<int:pk>/', views.delete_invoice, name='delete_invoice'),
    path('user/<int:user_id>/', views.get_invoices_by_user, name='get_invoices_by_user')
    # Use 'user_id' instead of 'user.id' in the URL pattern
    

]
