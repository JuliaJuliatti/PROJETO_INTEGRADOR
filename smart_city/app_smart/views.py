from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def abre_index(request):
 mensagem = "OLÁ TURMA, SEJAM FELIZES SEMPRE!"
 return HttpResponse(mensagem)