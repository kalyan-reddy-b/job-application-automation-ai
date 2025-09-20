from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Education, Experience, Skill, Project, JobPreference

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    technologies_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = '__all__'
    
    def get_technologies_list(self, obj):
        return obj.get_technologies_list()

class JobPreferenceSerializer(serializers.ModelSerializer):
    preferred_roles_list = serializers.SerializerMethodField()
    preferred_locations_list = serializers.SerializerMethodField()
    
    class Meta:
        model = JobPreference
        fields = '__all__'
    
    def get_preferred_roles_list(self, obj):
        return obj.get_preferred_roles_list()
    
    def get_preferred_locations_list(self, obj):
        return obj.get_preferred_locations_list()

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    job_preference = JobPreferenceSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'