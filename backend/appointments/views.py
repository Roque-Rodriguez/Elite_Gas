from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Appointment
from .serializers import AppointmentSerializer



@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def manage_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET' or request.method == 'POST':
        # Allow authenticated users to GET and POST
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)      # Seperate the GET and POST 

    if request.method == 'DELETE':
        user = request.user
        if is_cs(user) or is_sales(user) or is_admin(user):
            # Allow CS, Sales, and Admin users to DELETE
            appointment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
