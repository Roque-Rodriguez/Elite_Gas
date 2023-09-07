from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    address = models.CharField(max_length=200, default= "None")
    number = models.IntegerField(default=0)
    is_cs = models.BooleanField(default=False)
    is_sales = models.BooleanField(default=False)
   # isAdmin = models.BooleanField(default=False)  Come back to this if I have time
    is_customer = models.BooleanField(default=False)
    '''
    This is a custom version of the built in User class
    It contains all of the built in fields and functionality of the standard User
    You can add fields here for any additional properties you want a User to have
    This is useful for adding roles (Customer and Employee, for example)
    For just a few roles, adding boolean fields is advised
    '''
    # Example (note import of models above that is commented out)
    # this will add a column to the user table
    # is_student = models.BooleanField('student status', default=False)
