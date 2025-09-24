from django.contrib import admin
from .models import AutomationSession, AutomationLog, AutomationTemplate

@admin.register(AutomationSession)
class AutomationSessionAdmin(admin.ModelAdmin):
    list_display = ('session_name', 'user', 'target_platform', 'status', 'created_at')
    list_filter = ('status', 'target_platform', 'created_at')
    search_fields = ('session_name', 'user__username')

@admin.register(AutomationLog)
class AutomationLogAdmin(admin.ModelAdmin):
    list_display = ('session', 'level', 'message_short', 'timestamp')
    list_filter = ('level', 'timestamp', 'session__target_platform')
    search_fields = ('message',)

    def message_short(self, obj):
        return obj.message[:100] + '...' if len(obj.message) > 100 else obj.message
    message_short.short_description = 'Message'

@admin.register(AutomationTemplate)
class AutomationTemplateAdmin(admin.ModelAdmin):
    list_display = ('name', 'platform', 'is_active', 'created_at')
    list_filter = ('platform', 'is_active', 'created_at')
    search_fields = ('name', 'platform')
    list_editable = ('is_active',)