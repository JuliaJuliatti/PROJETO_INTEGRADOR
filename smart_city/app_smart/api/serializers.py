from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from app_smart.models import Sensor, TemperaturaData, LuminosidadeData, UmidadeData, ContadorData

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        # Criptografar a senha antes de salvar o usuário
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password'] 
        extra_kwargs = {'password': {'write_only': True}}


# serializer para que os dados possam ser consumidos 

#1 passo é sempre criar um serializer pois ele vai converter as infos para JSON

#temperatura
class TemperaturaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemperaturaData
        fields = ['id', 'sensor', 'valor', 'timestamp']

#luminosidade
class LuminosidadeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = LuminosidadeData
        fields = ['id', 'sensor', 'valor', 'timestamp']

#umidade
class UmidadeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UmidadeData
        fields = ['id', 'sensor', 'valor', 'timestamp']

#contador (conta pessoas) 

class ContadorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContadorData
        fields = ['id', 'sensor', 'timestamp']

