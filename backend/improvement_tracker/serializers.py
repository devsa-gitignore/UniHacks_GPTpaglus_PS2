from rest_framework import serializers
from .models import *
class IMprovementBoardSerializer(serializers.ModelSerializer):
    version_number=serializers.IntegerField(source='version.version_number')
    class Meta:
        model=ImprovementRecord
        fields=['id','version','version_number','score','improvement_from_last','improvement_from_first','created_at']
        