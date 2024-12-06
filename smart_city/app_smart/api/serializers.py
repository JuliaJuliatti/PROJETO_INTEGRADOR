from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from app_smart.models import Sensor, TemperaturaData, LuminosidadeData, UmidadeData, ContadorData

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import serializers


#cadastro do usuario

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Criptografa a senha antes de salvar
        validated_data['password'] = make_password(validated_data['password'])
        
        # Cria o usuário
        user = User.objects.create(**validated_data)
        return user

# serializer para que os dados possam ser consumidos 

#1 passo é sempre criar um serializer pois ele vai converter as infos para JSON

#sensor
class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ['mac_address', 'latitude', 'longitude', 'localizacao', 'responsavel', 'unidade_medida', 'status_operacional', 'observacao']

#temperatura
class TemperaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemperaturaData
        fields = ['id', 'tipo', 'unidade_medida', 'latitude', 'longitude', 'localizacao', 'responsavel',
                  'status_operacional', 'observacao', 'mac_address', 'valor', 'timestamp']
        
#luminosidade
class LuminosidadeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = LuminosidadeData
        fields = ['id', 'tipo', 'unidade_medida', 'latitude', 'longitude', 'localizacao', 'responsavel',
                  'status_operacional', 'observacao', 'mac_address', 'valor', 'timestamp']
#umidade
class UmidadeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UmidadeData
        fields = ['id', 'tipo', 'unidade_medida', 'latitude', 'longitude', 'localizacao', 'responsavel',
                  'status_operacional', 'observacao', 'mac_address', 'valor', 'timestamp']

#contador (conta pessoas) 

class ContadorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContadorData
        fields = ['id', 'tipo', 'unidade_medida', 'latitude', 'longitude', 'localizacao', 'responsavel',
                  'status_operacional', 'observacao', 'mac_address', 'valor', 'timestamp']


