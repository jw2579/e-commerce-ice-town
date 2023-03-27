from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),

    path('reviews/', views.getReviews, name='reviews'),
    path('reviews/<str:pk>', views.getReview, name='review'),

    path('', views.getRoutes, name="routes"),
 
    path('orders/create/', views.createOrder, name="order-create"),

    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getProduct, name="products"),
]