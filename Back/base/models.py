from django.db import models

# Create your models here.

# for price (minimum 1 and maximum 10000)
from django.core.validators import MaxValueValidator, MinValueValidator



class Product(models.Model):
    prod = models.CharField(max_length=50, null=False, blank=False, unique=False, default='Random prod')
    category = models.CharField(max_length=50, null=False, blank=False, unique=False, default='dairy')
    desc = models.CharField(max_length=50, null=False, blank=False, unique=False, default='Random desc')
    price = models.IntegerField(default=6, validators=[
                              MinValueValidator(1), MaxValueValidator(1000)])
    createdTime = models.DateTimeField(auto_now=True)
    productImage = models.ImageField(null=True, blank=True, default='/placeholder.png')

    def __str__(self):
        return self.prod
    
#     {
#   "superProds": [
#     {
#       "id": 1,
#       "prod": "Milk",
#       "category": "dairy",
#       "desc": "1L Fortified 3%",
#       "price": 20,
#       "productImage": "milkp.jpg"
#     },
#     {
#       "id": 2,
#       "prod": "Eggs",
#       "category": "dairy",
#       "desc": "8-pack, size L",
#       "price": 30,
#       "productImage": "eggp.jpg"
#     },
#     {
#       "id": 3,
#       "prod": "Cheese",
#       "category": "dairy",
#       "desc": "200gram Cheese",
#       "price": 100,
#       "productImage": "cheesep.jpeg"
#     },
#     {
#       "id": 4,
#       "prod": "Rib-eye",
#       "category": "meats",
#       "desc": "1kg USDA Grade A",
#       "price": 400,
#       "productImage": "meatp.jpg"
#     },
#     {
#       "id": 5,
#       "prod": "Chicken",
#       "category": "meats",
#       "desc": "1kg Chicken",
#       "price": 200,
#       "productImage": "chickenp.jpg"
#     },
#     {
#       "id": 6,
#       "prod": "Salmon",
#       "category": "meats",
#       "desc": "1kg Wild Salmon",
#       "price": 350,
#       "productImage": "salmonp.jpg"
#     },
#     {
#       "id": 7,
#       "prod": "Chocolate",
#       "category": "snacks",
#       "desc": "100gram Chocolate Bar",
#       "price": 30,
#       "productImage": "chocolatep.jpg"
#     },
#     {
#       "id": 8,
#       "prod": "Cake",
#       "category": "snacks",
#       "desc": "Black Forest Cake",
#       "price": 150,
#       "productImage": "cakep.webp"
#     },
#     {
#       "id": 9,
#       "prod": "Nuts",
#       "category": "snacks",
#       "desc": "500gram variety of nuts",
#       "price": 70,
#       "productImage": "nutsp.jfif"
#     }
#   ]
# }