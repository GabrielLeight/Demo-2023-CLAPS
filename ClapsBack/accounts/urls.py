from django.urls import include, path, re_path
from rest_framework import routers
from django.urls import path
from . import views

router = routers.DefaultRouter()
#router.register(User, UserViewset, base_name ='Usuario')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('registerUser', views.UserRegister.as_view(), name='registerUser'),
    path('registerTeatro', views.TeatroRegister.as_view(), name='registerTeatro'),
    path('registerHall', views.HallRegister.as_view(), name='registerHall'),
    path('login', views.UserLogin.as_view(),name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
]