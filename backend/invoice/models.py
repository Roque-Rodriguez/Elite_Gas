from django.db import models
from authentication.models import User


class Invoice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sales_rep")
    customer_username = models.CharField(max_length=100, default=None, null=True)
    invoice_number = models.CharField(max_length=50)
    date = models.DateField()
    job = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Invoice {self.invoice_number} for {self.user}"
