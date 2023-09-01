from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
   # name = models.CharField(max_length=100)
    address = models.TextField(max_length=200, default="1")
    number = models.IntField()
    isCS = models.BooleanField(default=False)
    isSales = models.BooleanField(default=False)
    isAdmin = models.BooleanField(default=False)

    def __str__(self):
        return self.name
