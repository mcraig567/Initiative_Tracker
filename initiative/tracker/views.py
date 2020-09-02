from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import Fighter, Spell

# Create your views here.

def index(request):
    try:
        request.session['active']
    except NameError:
        request.session['active'] = 0

    players = Fighter.objects.all()
    spells = Spell.objects.all()
    active = request.session['active']

    return render(request, "tracker/index.html", {
        "players" : players,
        "spells" : spells,
        "active_player": active
    })

def add_player(request):
    #Can you make this a popup/dialogue box
    if request.method == "POST":
        player = Fighter(name=request.POST['player'], initiative=request.POST['initiative'])
        player.save()

        return HttpResponseRedirect(reverse("index"))

    return render(request, "tracker/add_player.html")

def turn(request):
    if request.method == "POST":
        request.session['active'] += 1

        if request.session['active'] >= len(Fighter.objects.all()):
            request.session['active'] = 0

        spells = Spell.objects.all()
        expired_spells = []

        for spell in spells:
            spell.duration -= 6
            spell.save()

            if spell.duration <= 0:
                expired_spells.append(spell)

        if len(expired_spells) == 0:
            print("Active: ", request.session['active'])
            return HttpResponseRedirect(reverse("index"))

        else:
            #Create page that has list of expired spells, then ok button to return to index
            return HttpResponseRedirect(reverse("index"))

def clear(request):
    if request.method == "POST":
        Fighter.objects.all().delete()
        request.session['active'] = 0

        return HttpResponseRedirect(reverse("index"))

def spell(request):
    #Can you make this a popup/dialogue box
    if request.method == "POST":
        spell = Spell(
        name=request.POST['spell'],
        duration=request.POST['duration'],
        caster=Fighter.objects.get(id=request.POST['caster']),
        concentration=request.POST['concentration']
        )

        spell.save()
        return HttpResponseRedirect(reverse("index"))

    else:
        players = Fighter.objects.all()
        return render(request, "tracker/add_spell.html", {
            "players" : players
        })

def dead(request, dead_player):
    if request.method == "POST":
        print("deleting player")
        Fighter.objects.get(id=dead_player).delete()
        return HttpResponseRedirect(reverse("index"))

    print("accesed dead")
    return HttpResponseRedirect(reverse("index"))