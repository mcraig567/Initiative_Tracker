from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("add_player", views.add_player, name="add_player"),
    path("turn", views.turn, name="turn"),
    path("end_battle", views.clear, name="clear")
]