from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

# Create your views here.

players = ['nitor', 'dune', 'mya', 'jonus']

def index(request):
    return render(request, "tracker/index.html", {
        "players": players
    })

def add_player(request):
    if request.method == "POST":
        players.append(request.POST["player"])
        return HttpResponseRedirect(reverse("index"))

    return render(request, "tracker/add_player.html")

def turn(request):
    if request.method == "POST":
        return HttpResponseRedirect(reverse("index"))

def clear(request):
    if request.method == "POST":
        return HttpResponseRedirect(reverse("index"))