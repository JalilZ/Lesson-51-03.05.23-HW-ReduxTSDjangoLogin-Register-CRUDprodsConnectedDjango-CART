from django.shortcuts import render

from django.http import JsonResponse # returns a dict object, use safe=False to reutrn a non-dict object (string lets say)

from .serializers import ProductSerializer       # CRUD for Vicky
from .models import Product                      # CRUD for Vicky
from rest_framework.response import Response     # CRUD for Vicky
from rest_framework.views import APIView         # django4kids: from rest_framework.views import APIView (views.py using class and CRUD methods in that class)
from rest_framework import status                # better to use with response (better practice), instead of writing a sentence lets say "student was added"
from rest_framework.decorators import api_view   # CRUD for Vicky (api_view)
# making CRUDS with a class is better, we can copy paste it to make a new CRUD for a new model (lets say Product)


from rest_framework_simplejwt.views import TokenObtainPairView     # Authentication
from rest_framework.decorators import permission_classes     # Authentication
from rest_framework.permissions import IsAuthenticated     # Authentication  





from django.contrib.auth.models import User

@api_view(['POST'])
def register(request):                             # Authentication (regsiter) - will be used for guests ()
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password']
            )

    user.is_active = True
    user.is_staff = False  # So if user.is_staff is set to False in the provided code snippet, the newly created user will not be granted staff status and wil not be able to log in to the /admin django site 
    user.save()
    return Response({'username': user.username, 'email': user.email})





@permission_classes([IsAuthenticated])                    # Authentication (require token to see the supermarket default items)
class ProductModelView(APIView):
    """
    This class handle the CRUD operations for Product Model
    """
    def get(self, request, id=-1):
        if id > -1:
            try:
                prod = Product.objects.get(id=id)
                prod_serialized = ProductSerializer(prod, many=False)
                return Response(prod_serialized.data)
            except Product.DoesNotExist:
                return Response('Product Does Not Exist', status=status.HTTP_204_NO_CONTENT)
        else:
            prod = Product.objects.all()
            prod_serialized = ProductSerializer(prod, many=True)
            return Response(prod_serialized.data)
        
    def post(self, request):
        prod = ProductSerializer(data=request.data)
        if prod.is_valid():
            prod.save()
            #prod_desc = stu.data.get('desc') # get is a method from .serializers () along with update copy clear .....
            #return Response (f'Product {prod_desc} was added') # works, but better to use status (can be used with Response)
            return Response(prod.data, status=status.HTTP_201_CREATED)
        else:
            return Response(prod.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, id):  # we couldve also used the update() (see below req.method == 'POST'), same shit... update() is same is instansiating StudentSerializer & save()                  
        old_prod = Product.objects.get(id=id)
        new_prod_serialized = ProductSerializer(old_prod, data=request.data)
        if new_prod_serialized.is_valid():
            new_prod_serialized.save()
            return Response(new_prod_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response(new_prod_serialized.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id):
        prod = Product.objects.get(id=id)
        prod.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    




    




###Below using api_view (CRUDS for Vicky) - old way.(made for stu instead of prod but same shit)

#@api_view(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
#def students(req, id=-1):
#    if req.method == 'GET':
#        if id > -1:
#            try:
#                stu = Student.objects.get(id=id)
#                return Response(StudentSerializer(stu,many=False).data)
#                #return Response({'id': stu.id, 'name': stu.name, 'age': stu.age, 'createdTime': stu.createdTime, 'image': f'/images{stu.image}'})
#            except Student.DoesNotExist:
#                return Response('Not Found')
#
#        all_students = StudentSerializer(Student.objects.all(), many=True).data
#        return Response(all_students)
#    
#    elif req.method == 'DELETE':
#        try:
#            stu = Student.objects.get(id=id)
#        except Student.DoesNotExist:
#            return Response('Not Found')
#        temp_name = Student.objects.get(id=id).name
#        stu.delete()
#        return Response(f'Student {temp_name} was deleted.')
#    
#    elif req.method == 'POST':
#        stu = StudentSerializer(data=req.data)
#        if stu.is_valid():
#            stu.save()
#            stu_name = stu.data.get('name') # get is a method from .serializers () along with update copy clear .....
#            return Response (f'Student {stu_name} was added')
#        else:
#            return Response(stu.errors)
#        
#    elif req.method == 'PUT' or req.method == 'PATCH':
#        try:
#            stu = Student.objects.get(id=id)
#        except Student.DoesNotExist:
#            return Response('Student was not Found')
#        
#        new_stu = StudentSerializer(req.data)
#        old_stu  = Student.objects.get(id=id)
#        res = new_stu.update(old_stu, req.data)
#        return Response(StudentSerializer(res,many=False).data)


