from django.db import models
from django.conf import settings

class AutomationSession(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('running', 'Running'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    target_platform = models.CharField(max_length=100)  # LinkedIn, Naukri, etc.
    session_name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    config = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.session_name} - {self.user.username}"

class AutomationLog(models.Model):
    LOG_LEVELS = [
        ('info', 'Info'),
        ('warning', 'Warning'),
        ('error', 'Error'),
        ('success', 'Success'),
    ]

    session = models.ForeignKey(AutomationSession, on_delete=models.CASCADE)
    level = models.CharField(max_length=10, choices=LOG_LEVELS, default='info')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.level}: {self.message[:50]}..."

class AutomationTemplate(models.Model):
    name = models.CharField(max_length=200)
    platform = models.CharField(max_length=100)
    description = models.TextField()
    template_config = models.JSONField(default=dict)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.platform})"