from django.contrib import admin
from .models import AnalyticsDashboard, ApplicationTrend, PlatformPerformance

@admin.register(AnalyticsDashboard)
class AnalyticsDashboardAdmin(admin.ModelAdmin):
    list_display = ['profile', 'total_applications', 'successful_applications', 'response_rate', 'last_updated']
    list_filter = ['last_updated', 'most_successful_platform']
    search_fields = ['profile__user__username']
    readonly_fields = ['last_updated']

@admin.register(ApplicationTrend)
class ApplicationTrendAdmin(admin.ModelAdmin):
    list_display = ['profile', 'date', 'applications_count', 'successful_count']
    list_filter = ['date']
    search_fields = ['profile__user__username']

@admin.register(PlatformPerformance)
class PlatformPerformanceAdmin(admin.ModelAdmin):
    list_display = ['profile', 'platform_name', 'total_applications', 'success_rate', 'last_updated']
    list_filter = ['platform_name', 'last_updated']
    search_fields = ['profile__user__username', 'platform_name']