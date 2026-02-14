from django.db.models.signals import post_save
from django.dispatch import receiver
from review_requests.models import *
from .models import *
@receiver(post_save,sender=ReviewRequest)
def create_review_notification(sender,instance,created,**kwargs):
    if created:
        Notification.objects.create(
            user=instance.reviewer,
            title="New Profile Review Request",
            message="Someone wants you to review their dating profile!",
            type="request_received"
        )
    else:
        if instance.status=='accepted':
            Notification.objects.create(
                user=instance.reviewee,
                title="Review Request Accepted",
                message="Your reviewer has accpted your request and feedback will be provided soon",
                type="request_accepted"
            )
        elif instance.status=='completed':
            Notification.objects.create(
                user=instance.reviewee,
                title="Review Completed!",
                message="Your dating profile review is ready. Go check out your new score!",
                type="review_completed"
            )