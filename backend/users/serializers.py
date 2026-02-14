from rest_framework import serializers
from .models import User,ReviewerProfile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","email","phone","age","gender","role"]

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "phone", "age", "gender", "role"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ReviewerProfileSerializer(serializers.ModelSerializer):
    price=serializers.SerializerMethodField()
    reviewer_id = serializers.IntegerField(source='user.id', read_only=True)
    age = serializers.IntegerField(source='user.age', read_only=True)
    gender = serializers.CharField(source='user.gender', read_only=True)
    class Meta:
        model=ReviewerProfile
        fields=[
            "public_username","credibility_score","total_reviews",
            "average_rating","acceptance_rate","completion_rate","price","reviewer_id","age","gender"
        ]
    def get_price(self,obj):
        return obj.get_price()
