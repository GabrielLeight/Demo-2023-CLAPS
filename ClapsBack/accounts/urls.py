from django.urls import include, path, re_path
from rest_framework import routers
from .views import UserViewset

router = routers.DefaultRouter()
router.register(Usuario, UserViewset, base_name ='Usuario')

urlpatterns = [
    path('^', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
]