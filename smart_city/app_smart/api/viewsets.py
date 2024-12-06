from django.contrib.auth.models import User
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from app_smart.api import serializers
from app_smart.models import Sensor, TemperaturaData, UmidadeData, ContadorData, LuminosidadeData
from django.core.files.storage import default_storage
from rest_framework.decorators import action
from django.contrib.auth import authenticate, login
from rest_framework import status
import csv
import os
from django.utils import timezone
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TemperaturaSerializer, LuminosidadeDataSerializer, UmidadeDataSerializer, ContadorDataSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view

class CreateUserAPIViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.AllowAny]  # Apenas admin pode criar usuários

class SensorViewSet(viewsets.ViewSet):
    queryset = Sensor.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    

    def upload_csv(self, request):
        if 'file' not in request.FILES:
            return Response({"error": "Nenhum arquivo fornecido"}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']
        file_path = default_storage.save(file.name, file)

        try:
            self.load_sensors_from_csv(file_path)
            return Response({"message": "Dados carregados com sucesso!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)

    def load_sensors_from_csv(self, file_path):
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, delimiter=',')
            for row in reader:
                row = {k.strip(): v for k, v in row.items()}
                Sensor.objects.create(
                    tipo=row['tipo'],
                    unidade_medida=row.get('unidade_medida', None),
                    latitude=float(row['latitude'].replace(',', '.')),
                    longitude=float(row['longitude'].replace(',', '.')),
                    localizacao=row['localizacao'],
                    responsavel=row.get('responsavel', ''),
                    status_operacional=row['status_operacional'].strip().lower() == 'true',
                    observacao=row.get('observacao', ''),
                    mac_address=row.get('mac_address', None)
                )

class TemperaturaViewSet(viewsets.ViewSet):
    # Queryset e serializer para o ViewSet
    queryset = TemperaturaData.objects.all()
    serializer_class = TemperaturaSerializer
    
    def create(self, request):
        # Aqui você pode tratar os dados que vem no POST
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def upload_csv(self, request):
        if 'file' not in request.FILES:
            return Response({"error": "Nenhum arquivo fornecido"}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']
        file_path = default_storage.save(file.name, file)

        try:
            self.load_temperaturas_from_csv(file_path)
            return Response({"message": "Dados carregados com sucesso!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)
    
    def load_temperaturas_from_csv(self, file_path):
        import csv
        from datetime import datetime
        
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, delimiter=',')
            for row in reader:
                row = {k.strip(): v for k, v in row.items()}
                try:
                    # A data do timestamp pode estar em um formato diferente (string). Vamos convertê-la para datetime.
                    timestamp = datetime.strptime(row['timestamp'], '%Y-%m-%dT%H:%M:%S')
                except ValueError:
                    timestamp = None  # Se não conseguir converter, coloca None (ou define um valor default)

                TemperaturaData.objects.create(
                    tipo=row['tipo'],  # O tipo já é 'Temperatura' conforme o CSV
                    unidade_medida=row.get('unidade_medida', None),
                    latitude=float(row['latitude'].replace(',', '.')),
                    longitude=float(row['longitude'].replace(',', '.')),
                    localizacao=row['localizacao'],
                    responsavel=row.get('responsavel', ''),
                    status_operacional=row['status_operacional'].strip().lower() == 'true',
                    observacao=row.get('observacao', ''),
                    mac_address=row.get('mac_address', None),
                    valor=float(row['valor'].replace(',', '.')),  # O valor da temperatura
                    timestamp=timestamp  # A data e hora convertida
                )
                
class UmidadeDataViewSet(viewsets.ViewSet):
    queryset = UmidadeData.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    def upload_csv(self, request):
        if 'file' not in request.FILES:
            return Response({"error": "Nenhum arquivo fornecido"}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']
        file_path = default_storage.save(file.name, file)

        try:
            self.load_umidades_from_csv(file_path)
            return Response({"message": "Dados de umidade carregados com sucesso!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)

    def load_umidades_from_csv(self, file_path):
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, delimiter=',')
            for row in reader:
                row = {k.strip(): v for k, v in row.items()}

                try:
                    sensor_id = row['sensor_id']
                    sensor = Sensor.objects.get(id=sensor_id)

                    valor = float(row['valor'].replace(',', '.'))

                    timestamp_str = row.get('timestamp')
                    if timestamp_str:
                        timestamp = datetime.fromisoformat(timestamp_str)
                        timestamp = timezone.make_aware(timestamp)
                    else:
                        timestamp = timezone.now()

                    UmidadeData.objects.create(
                        sensor=sensor,
                        valor=valor,
                        timestamp=timestamp,
                    )
                except Sensor.DoesNotExist:
                    raise Exception(f"Sensor com ID {sensor_id} não encontrado.")
                except ValueError as ve:
                    raise Exception(f"Erro ao converter valores: {str(ve)}")
                except Exception as e:
                    raise Exception(f"Erro ao inserir dados de umidade: {str(e)}")
                


class ContadorDataViewSet(viewsets.ViewSet):
    queryset = ContadorData.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    def upload_csv(self, request):
        if 'file' not in request.FILES:
            return Response({"error": "Nenhum arquivo fornecido"}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']
        file_path = default_storage.save(file.name, file)

        try:
            self.load_contadores_from_csv(file_path)
            return Response({"message": "Dados de contador carregados com sucesso!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)

    def load_contadores_from_csv(self, file_path):
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, delimiter=',')
            for row in reader:
                row = {k.strip(): v for k, v in row.items()}

                try:
                    sensor_id = row['sensor_id']
                    sensor = Sensor.objects.get(id=sensor_id)

                    # Cria uma nova entrada no banco de dados
                    ContadorData.objects.create(
                        sensor=sensor,
                    )
                except Sensor.DoesNotExist:
                    raise Exception(f"Sensor com ID {sensor_id} não encontrado.")
                except Exception as e:
                    raise Exception(f"Erro ao inserir dados de contador: {str(e)}")



class LuminosidadeDataViewSet(viewsets.ViewSet):
    queryset = LuminosidadeData.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    def upload_csv(self, request):
        if 'file' not in request.FILES:
            return Response({"error": "Nenhum arquivo fornecido"}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']
        file_path = default_storage.save(file.name, file)

        try:
            self.load_luminosidade_from_csv(file_path)
            return Response({"message": "Dados de luminosidade carregados com sucesso!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)

    def load_luminosidade_from_csv(self, file_path):
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, delimiter=',')
            for row in reader:
                row = {k.strip(): v for k, v in row.items()}

                try:
                    # Presumindo que o CSV tem uma coluna 'sensor_id' para identificar o sensor
                    sensor_id = row['sensor_id']
                    sensor = Sensor.objects.get(id=sensor_id)  # Obtendo o sensor pelo ID

                    # Criando uma nova entrada no banco de dados
                    LuminosidadeData.objects.create(
                        sensor=sensor,
                        valor=float(row['valor'].replace(',', '.')),  # Converte o valor para float
                        timestamp=row.get('timestamp', timezone.now()),  # Usa o timestamp do CSV ou o atual
                    )
                except Sensor.DoesNotExist:
                    raise Exception(f"Sensor com ID {sensor_id} não encontrado.")
                except Exception as e:
                    raise Exception(f"Erro ao inserir dados de luminosidade: {str(e)}")

    def list(self, request):
        luminosidade_data = LuminosidadeData.objects.all().order_by('-timestamp')  # Ordena pela data
        serializer = LuminosidadeDataSerializer(luminosidade_data, many=True)
        return Response(serializer.data)



#view para consumir dados de umidade

class UmidadeDataList(generics.ListCreateAPIView):
    queryset = UmidadeData.objects.all()
    serializer_class = UmidadeDataSerializer


#view para consumir dados de contador (contar pessoas)

class ContadorDataList(generics.ListCreateAPIView):
    queryset = ContadorData.objects.all()
    serializer_class = ContadorDataSerializer

#view para consumir dados de luminosidade 
class LuminosidadeDataList(generics.ListCreateAPIView):
    queryset = LuminosidadeData.objects.all()
    serializer_class = LuminosidadeDataSerializer
    permission_classes = [AllowAny] 


#view de cadastro 
class RegisterView(APIView):
    def post(self, request):
        # Cria o serializador com os dados da requisição
        serializer = UserSerializer(data=request.data)

        # Verifica se os dados são válidos
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Cadastro realizado com sucesso!"}, status=status.HTTP_201_CREATED)
        
        # Caso a validação falhe, retorna os erros
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#crud
# @api_view(['POST'])
# def create_luminosidade_data(request):
#     if request.method == 'POST':
#         serializer = LuminosidadeDataSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TemperaturaDataListView(APIView):
    def get(self, request, *args, **kwargs):
        # Buscar todos os dados de Temperatura
        temperatura_data = TemperaturaData.objects.all()  # Filtrar conforme necessário
        serializer = TemperaturaSerializer(temperatura_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


# def upload_file(request):
#     if request.method == 'POST':
#         uploaded_file = request.FILES['arquivo']
#         sensor_type = request.POST['tipo']
#         uploaded = UploadedFile.objects.create(tipo=sensor_type, arquivo=uploaded_file)
        
#         # Processar o arquivo
#         process_csv(uploaded.arquivo.path, sensor_type)
        
#         return HttpResponse("Arquivo processado com sucesso!")
#     return render(request, 'upload.html')