from rest_framework import serializers
from .models import (
    JobPlatform, AutomationSession, JobApplication, 
    AutomationLog, AIPromptTemplate, PlatformCredentials
)

class JobPlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPlatform
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'

class AutomationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutomationLog
        fields = '__all__'

class AutomationSessionSerializer(serializers.ModelSerializer):
    applications = JobApplicationSerializer(many=True, read_only=True)
    logs = AutomationLogSerializer(many=True, read_only=True)
    platforms_data = JobPlatformSerializer(source='platforms', many=True, read_only=True)
    
    class Meta:
        model = AutomationSession
        fields = '__all__'

class AIPromptTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIPromptTemplate
        fields = '__all__'

class PlatformCredentialsSerializer(serializers.ModelSerializer):
    platform_name = serializers.CharField(source='platform.name', read_only=True)
    
    class Meta:
        model = PlatformCredentials
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }