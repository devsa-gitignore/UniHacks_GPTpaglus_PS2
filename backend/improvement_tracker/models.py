from django.db import models

class ImprovementRecord(models.Model):
    profile = models.ForeignKey(
        "profiles.Profile", on_delete=models.CASCADE,
        related_name = "improvements"
    )
    version = models.ForeignKey(
        "profiles.ProfileVersion", on_delete=models.CASCADE
    )
    score = models.FloatField()
    improvement_from_last = models.FloatField()
    improvement_from_first = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)