from django.db import models
from django.contrib.auth.models import User
from authentication.models import User

class Appointment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    message = models.TextField()
    is_complete = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"Appointment for {self.user} at {self.date_time}"
