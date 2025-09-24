from django.contrib import admin
from .models import JobAnalytics, UserActivityLog, ApplicationStats

@admin.register(JobAnalytics)
class JobAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('company', 'total_jobs', 'total_applications', 'avg_salary', 'date_analyzed')
    list_filter = ('date_analyzed', 'company')
    search_fields = ('company__name',)

@admin.register(UserActivityLog)
class UserActivityLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_type', 'description', 'timestamp')
    list_filter = ('activity_type', 'timestamp')
    search_fields = ('user__username', 'description')

@admin.register(ApplicationStats)
class ApplicationStatsAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_applications', 'pending_applications', 
                   'accepted_applications', 'rejected_applications', 'last_updated')
    list_filter = ('last_updated',)
    search_fields = ('user__username',)