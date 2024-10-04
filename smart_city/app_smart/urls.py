from django.urls import path, include
from app_smart.api.viewsets import CreateUserAPIViewSet, SensorViewSet, TemperaturaDataViewSet, UmidadeDataViewSet, ContadorDataViewSet, LuminosidadeDataViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from rest_framework.routers import DefaultRouter
from app_smart.api.filters import (SensorFilterView)


router = DefaultRouter()
router.register(r'sensores', SensorViewSet, basename='sensor') 



urlpatterns = [
    path('', views.abre_index, name='abre_index'),
    path('api/create_user/', CreateUserAPIViewSet.as_view(), name='create_user'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
    path('api/sensor_filter/', SensorFilterView.as_view(), name='sensor_filter'),
    path('api/upload-temperatura/', TemperaturaDataViewSet.as_view({'post': 'upload_csv'}), name='upload_temperatura'),
    path('api/upload-umidade/', UmidadeDataViewSet.as_view({'post': 'upload_csv'}), name='upload-umidade'),
    path('api/upload-contador/', ContadorDataViewSet.as_view({'post': 'upload_csv'}), name='upload-contador'),
    path('api/upload-luminosidade/', LuminosidadeDataViewSet.as_view({'post': 'upload_csv'}), name='upload_luminosidade')
]

# Para adicionar o upload_csv como um endpoint separado
urlpatterns += [
    path('api/sensores/upload/', SensorViewSet.as_view({'post': 'upload_csv'}), name='upload_csv'),
]
