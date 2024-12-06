from django.db import models

from django.db import models


#(1) MODELOS DOS DADOS DO BANCO DE DADOS !

class Sensor(models.Model):
    TIPOS_SENSOR_CHOICES = [
        ('Temperatura', 'Temperatura'),
        ('Umidade', 'Umidade'),
        ('Contador', 'Contador'),
        ('Luminosidade', 'Luminosidade'),
    ]
    tipo = models.CharField(max_length=50, choices=TIPOS_SENSOR_CHOICES)
    mac_address = models.CharField(max_length=20, null=True)
    latitude = models.FloatField(default=0)
    longitude = models.FloatField(default=0)
    localizacao = models.CharField(max_length=100)
    responsavel = models.CharField(max_length=100) 
    unidade_medida = models.CharField(max_length=20, blank=True, null=True)
    status_operacional = models.BooleanField(default=True)
    observacao = models.TextField(blank=True)

    def __str__(self):
        return f"{self.tipo} - {self.localizacao}"



class TemperaturaData(models.Model):
    tipo = models.CharField(max_length=50, default='Temperatura')  # O tipo já é fixo como Temperatura
    unidade_medida = models.CharField(max_length=20, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    localizacao = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=100, null=True, blank=True)

    status_operacional = models.BooleanField()
    observacao = models.TextField(null=True, blank=True)
    mac_address = models.CharField(max_length=100, null=True, blank=True)
    valor = models.FloatField()  # Agora o campo que armazena o valor da temperatura
    timestamp = models.DateTimeField()  # Timestamp para registrar a data e hora

    def __str__(self):
        return f"Temperatura - {self.localizacao} - {self.valor}°C"




class UmidadeData(models.Model):
    tipo = models.CharField(max_length=50, default='Temperatura')  # O tipo já é fixo como Temperatura
    unidade_medida = models.CharField(max_length=20, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    localizacao = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=100, null=True, blank=True)

    status_operacional = models.BooleanField()
    observacao = models.TextField(null=True, blank=True)
    mac_address = models.CharField(max_length=100, null=True, blank=True)
    valor = models.FloatField()  # Agora o campo que armazena o valor da temperatura
    timestamp = models.DateTimeField()  # Timestamp para registrar a data e hora

   
    def __str__(self):
        return f"Umidade: {self.valor}% - {self.timestamp}"


class ContadorData(models.Model):
    tipo = models.CharField(max_length=50, default='Temperatura')  # O tipo já é fixo como Temperatura
    unidade_medida = models.CharField(max_length=20, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    localizacao = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=100, null=True, blank=True)

    status_operacional = models.BooleanField()
    observacao = models.TextField(null=True, blank=True)
    mac_address = models.CharField(max_length=100, null=True, blank=True)
    valor = models.FloatField()  # Agora o campo que armazena o valor da temperatura
    timestamp = models.DateTimeField()  # Timestamp para registrar a data e hora


    def __str__(self):
        return f"Contagem - {self.timestamp}"


class LuminosidadeData(models.Model):
    tipo = models.CharField(max_length=50, default='Temperatura')  # O tipo já é fixo como Temperatura
    unidade_medida = models.CharField(max_length=20, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    localizacao = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=100, null=True, blank=True)

    status_operacional = models.BooleanField()
    observacao = models.TextField(null=True, blank=True)
    mac_address = models.CharField(max_length=100, null=True, blank=True)
    valor = models.FloatField()  # Agora o campo que armazena o valor da temperatura
    timestamp = models.DateTimeField()  # Timestamp para registrar a data e hora

    def __str__(self):
        return f"Luminosidade: {self.valor} Lux - {self.timestamp}"


