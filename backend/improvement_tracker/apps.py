from django.apps import AppConfig


class ImprovementTrackerConfig(AppConfig):
    name = 'improvement_tracker'
    def ready(self):
        import improvement_tracker.signals