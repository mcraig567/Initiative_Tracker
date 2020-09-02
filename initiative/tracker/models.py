from django.db import models

# Create your models here.
class Fighter(models.Model):    
    name = models.CharField(max_length=64)
    initiative = models.IntegerField()
    objects = models.Manager()

    def __str__(self):
        return f"Fighter: {self.name}"

class Spell(models.Model):
    name = models.CharField(max_length=64)
    duration = models.IntegerField()
    concentration = models.BooleanField()
    caster = models.ForeignKey(Fighter, on_delete=models.CASCADE, related_name="casted")
    objects = models.Manager()

    def __str__(self):
        return f"{self.name} is a spell that lasts {self.duration} seconds"