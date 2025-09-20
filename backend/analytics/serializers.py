from rest_framework import serializers
from .models import AnalyticsDashboard, ApplicationTrend, PlatformPerformance

class AnalyticsDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsDashboard
        fields = '__all__'

class ApplicationTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationTrend
        fields = '__all__'

class PlatformPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformPerformance
        fields = '__all__'