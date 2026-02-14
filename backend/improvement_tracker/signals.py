from django.db.models.signals import post_save
from django.dispatch import receiver
from django.apps import apps
from reviews.models import Review 
from .models import ImprovementRecord
@receiver(post_save, sender='reviews.Review')
def calculate_improvement(sender, instance, created, **kwargs):
    if created and instance.overall_score is not None:
        profile_version = instance.request.profile_version
        base_profile = profile_version.profile
        current_score = instance.overall_score
        past_records = ImprovementRecord.objects.filter(profile=base_profile).order_by('created_at')
        if not past_records.exists():
            ImprovementRecord.objects.create(
                profile=base_profile, version=profile_version, score=current_score,
                improvement_from_last=0.0,
                improvement_from_first=0.0
            )
        else:
            first_record=past_records.first()
            last_record=past_records.last()
            def calc_percent(old_val, new_val):
                if old_val == 0: return 100.0 if new_val > 0 else 0.0
                return round(((new_val - old_val) / old_val) * 100, 2)

            imp_last = calc_percent(last_record.score, current_score)
            imp_first = calc_percent(first_record.score, current_score)

            ImprovementRecord.objects.create(
                profile=base_profile,
                version=profile_version,
                score=current_score,
                improvement_from_last=imp_last,
                improvement_from_first=imp_first
            )