from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .models import Invoice
from .serializers import InvoiceSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated | IsCS | IsCustomer])
def get_invoice(request, pk):
    try:
        invoice = Invoice.objects.get(pk=pk)
    except Invoice.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = InvoiceSerializer(invoice)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsCS | IsCustomer])
def create_invoice(request):
    serializer = InvoiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser | IsSales])
def delete_invoice(request, pk):
    try:
        invoice = Invoice.objects.get(pk=pk)
    except Invoice.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    invoice.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


