from django.urls import include, path, re_path
from rest_framework import routers
from django.urls import path
from .views import RegisterUserAPIView
from . import views

router = routers.DefaultRouter()
#router.register(User, UserViewset, base_name ='Usuario')
router.register("get-details",views.CurrentUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('register', RegisterUserAPIView.as_view()),
]