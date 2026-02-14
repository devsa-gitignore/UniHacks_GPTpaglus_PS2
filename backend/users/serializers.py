from rest_framework import serializers
from .models import User,ReviewerProfile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","email","phone","age","gender","role"]
class ReviewerProfileSerializer(serializers.ModelSerializer):
    price=serializers.SerializerMethodField()
    age = serializers.IntegerField(source='user.age', read_only=True)
    gender = serializers.CharField(source='user.gender', read_only=True)
    class Meta:
        model=ReviewerProfile
        fields=[
            "public_username","credibility_score","total_reviews",
            "average_rating","acceptance_rate","completion_rate","price","age","gender"
        ]
    def get_price(self,obj):
        return obj.get_price()