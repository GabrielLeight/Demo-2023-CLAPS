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
    path('registerCompany', views.companyRegister.as_view(), name='registerCompany'),
    path('newShow', views.newShowView.as_view(), name='newShow'),
    path('newReview',views.newCrit.as_view(), name='newReview'),
    path('login', views.UserLogin.as_view(),name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('getShows', views.getShows.as_view(), name='getShows'),
    path('deleteUser', views.deleteUser.as_view(), name='deleteUser'),
    path('deleteCrit', views.deleteCrit.as_view(), name='deleteCrit'),
    path('deleteShow', views.deleteShow.as_view(), name='deleteShow'),
    path('updateUser',views.updateUser.as_view(), name='updateUser')
]