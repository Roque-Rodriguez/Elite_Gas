from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Appointment
from .serializers import AppointmentSerializer


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_appointments(request):
    user = request.user  # Get the user making the request
    print(user)
    if user.is_cs or user.is_sales:
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    user = request.user
    if user.is_cs or user.is_sales:
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_appointment(request, pk):
    user = request.user
    if user.is_cs or user.is_sales:
        try:
            appointment = Appointment.objects.get(pk=pk)
            appointment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Invoice.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(status=status.HTTP_403_FORBIDDEN)

# @api_view(['GET', 'POST', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def manage_appointment(request, pk):
#     try:
#         appointment = Appointment.objects.get(pk=pk)
#     except Appointment.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET' or request.method == 'POST':
#         # Allow authenticated users to GET and POST
#         serializer = AppointmentSerializer(appointment)
#         return Response(serializer.data)      # Seperate the GET and POST 

#     if request.method == 'DELETE':
#         user = request.user
#         if is_cs(user) or is_sales(user) or is_admin(user):
#             # Allow CS, Sales, and Admin users to DELETE
#             appointment.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response(status=status.HTTP_403_FORBIDDEN)

#     return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
