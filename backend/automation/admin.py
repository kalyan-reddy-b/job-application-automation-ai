from django.contrib import admin
from .models import (
    JobPlatform, AutomationSession, JobApplication, 
    AutomationLog, AIPromptTemplate, PlatformCredentials
)

@admin.register(JobPlatform)
class JobPlatformAdmin(admin.ModelAdmin):
    list_display = ['name', 'base_url', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'base_url']

@admin.register(AutomationSession)
class AutomationSessionAdmin(admin.ModelAdmin):
    list_display = ['id', 'profile', 'status', 'total_applications', 'successful_applications', 'created_at']
    list_filter = ['status', 'created_at', 'use_ai_cover_letter', 'use_ai_responses']
    search_fields = ['profile__user__username', 'profile__user__email']
    readonly_fields = ['created_at', 'start_time', 'end_time']

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['job_title', 'company_name', 'platform', 'status', 'application_date']
    list_filter = ['status', 'platform', 'application_date']
    search_fields = ['job_title', 'company_name', 'job_url']
    readonly_fields = ['created_at', 'application_date']

@admin.register(AutomationLog)
class AutomationLogAdmin(admin.ModelAdmin):
    list_display = ['session', 'level', 'message', 'timestamp']
    list_filter = ['level', 'timestamp']
    search_fields = ['message']
    readonly_fields = ['timestamp']

@admin.register(AIPromptTemplate)
class AIPromptTemplateAdmin(admin.ModelAdmin):
    list_display = ['name', 'template_type', 'is_default', 'created_at']
    list_filter = ['template_type', 'is_default', 'created_at']
    search_fields = ['name', 'prompt_template']

@admin.register(PlatformCredentials)
class PlatformCredentialsAdmin(admin.ModelAdmin):
    list_display = ['profile', 'platform', 'username', 'email', 'is_active']
    list_filter = ['platform', 'is_active', 'created_at']
    search_fields = ['profile__user__username', 'username', 'email']
    readonly_fields = ['created_at']