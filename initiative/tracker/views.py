from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

# Create your views here.

players = ['nitor', 'dune', 'mya', 'jonus']

def index(request):
    if "battle_players" not in request.session:
        request.session["battle_players"] = []
    return render(request, "tracker/index.html", {
        "players": request.session["battle_players"]
    })

def add_player(request):
    if request.method == "POST":
        request.session["battle_players"] += [request.POST['player']]
        return HttpResponseRedirect(reverse("index"))

    return render(request, "tracker/add_player.html")

def turn(request):
    if request.method == "POST":
        return HttpResponseRedirect(reverse("index"))

def clear(request):
    if request.method == "POST":
        if "battle_players" in request.session:
            request.session["battle_players"] = []
        return HttpResponseRedirect(reverse("index"))