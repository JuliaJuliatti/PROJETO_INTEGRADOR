from django.urls import path, include
from app_smart.api.viewsets import (
    CreateUserAPIViewSet, 
    SensorViewSet,
    UploadTemperaturaCSV,
    UmidadeDataViewSet, 
    ContadorDataViewSet, 
    LuminosidadeDataViewSet, 
    TemperaturaDataListViewSet,
    UmidadeDataList,
    ContadorDataList,
    LuminosidadeDataList,
    
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from app_smart.api.filters import SensorFilterView
from . import views  # Isso vai importar o arquivo views.py do mesmo diretório
from rest_framework.routers import DefaultRouter


# Para rotas que não exigem um router, você pode definir diretamente aqui
urlpatterns = [
    # Página inicial
    path('', views.abre_index, name='abre_index'),

    # Endpoints de criação de usuário e autenticação JWT
    path('api/create_user/', CreateUserAPIViewSet.as_view(), name='create_user'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Endpoints de upload de dados (Temperatura, Umidade, Contador, Luminosidade)
    path('api/upload-temperatura/', UploadTemperaturaCSV.as_view(), name='upload_temperatura'),
    path('api/upload-umidade/', UmidadeDataViewSet.as_view({'post': 'upload_csv'}), name='upload_umidade'),
    path('api/upload-contador/', ContadorDataViewSet.as_view({'post': 'upload_csv'}), name='upload_contador'),
    path('api/upload-luminosidade/', LuminosidadeDataViewSet.as_view({'post': 'upload_csv'}), name='upload_luminosidade'),
   


    # Endpoint para visualizar temperaturas,luminosidade,umidade e contador
    path('api/temperaturas/', TemperaturaDataListViewSet.as_view(), name='list_temperaturas'),
    path('api/luminosidade/', LuminosidadeDataViewSet.as_view({'get': 'list'}), name='list_luminosidade'),
    path('api/umidade/', UmidadeDataList.as_view(), name='umidade-list'),
    path('api/contador/', ContadorDataList.as_view(), name='contador-list'),
    path('api/luminosidade/', LuminosidadeDataList.as_view(), name='luminosidade-list'),
    # Endpoint de filtragem de sensores
    path('api/sensor_filter/', SensorFilterView.as_view(), name='sensor_filter'),
]

# Para rotas baseadas em ViewSet, podemos utilizar o router
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'sensores', SensorViewSet, basename='sensor')


#Rotas de UPDATE
# path('contador/<int:pk>/', ContadorDataUpdate.as_view(), name='contador-update'),

# Incluindo as URLs do router
urlpatterns += [
    path('api/', include(router.urls)),
]
