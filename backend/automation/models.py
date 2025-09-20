from django.db import models
from profiles.models import UserProfile
import json

class JobPlatform(models.Model):
    name = models.CharField(max_length=100)
    base_url = models.URLField()
    is_active = models.BooleanField(default=True)
    automation_config = models.JSONField(default=dict)  # Store selectors and automation rules
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class AutomationSession(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('running', 'Running'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('paused', 'Paused'),
    ]
    
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    platforms = models.ManyToManyField(JobPlatform)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_applications = models.IntegerField(default=0)
    successful_applications = models.IntegerField(default=0)
    failed_applications = models.IntegerField(default=0)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # AI Configuration
    use_ai_cover_letter = models.BooleanField(default=True)
    use_ai_responses = models.BooleanField(default=True)
    custom_instructions = models.TextField(blank=True)

    def __str__(self):
        return f"Session {self.id} - {self.profile.user.username}"

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('applied', 'Applied'),
        ('failed', 'Failed'),
        ('skipped', 'Skipped'),
    ]
    
    session = models.ForeignKey(AutomationSession, on_delete=models.CASCADE, related_name='applications')
    platform = models.ForeignKey(JobPlatform, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    job_url = models.URLField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    application_date = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)
    
    # AI Generated Content
    ai_cover_letter = models.TextField(blank=True)
    ai_responses = models.JSONField(default=dict)  # Store AI responses to questions
    
    # Job Details
    job_description = models.TextField(blank=True)
    salary_range = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=100, blank=True)
    job_type = models.CharField(max_length=50, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"

class AutomationLog(models.Model):
    LOG_LEVELS = [
        ('info', 'Info'),
        ('warning', 'Warning'),
        ('error', 'Error'),
        ('success', 'Success'),
    ]
    
    session = models.ForeignKey(AutomationSession, on_delete=models.CASCADE, related_name='logs')
    application = models.ForeignKey(JobApplication, on_delete=models.CASCADE, null=True, blank=True)
    level = models.CharField(max_length=10, choices=LOG_LEVELS)
    message = models.TextField()
    details = models.JSONField(default=dict)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.level.upper()}: {self.message[:50]}"

class AIPromptTemplate(models.Model):
    TEMPLATE_TYPES = [
        ('cover_letter', 'Cover Letter'),
        ('question_response', 'Question Response'),
        ('profile_summary', 'Profile Summary'),
    ]
    
    name = models.CharField(max_length=100)
    template_type = models.CharField(max_length=20, choices=TEMPLATE_TYPES)
    prompt_template = models.TextField()
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.get_template_type_display()})"

class PlatformCredentials(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    platform = models.ForeignKey(JobPlatform, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    password = models.CharField(max_length=255)  # Should be encrypted in production
    additional_data = models.JSONField(default=dict)  # Store platform-specific data
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['profile', 'platform']

    def __str__(self):
        return f"{self.profile.user.username} - {self.platform.name}"