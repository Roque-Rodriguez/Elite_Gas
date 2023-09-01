from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_user_profile, name='create-user-profile'),
    path('<int:pk>/', views.get_user_profile, name='get-user-profile'),
    path('<int:pk>/delete/',
         views.delete_user_profile, name='delete-user-profile'),
]
