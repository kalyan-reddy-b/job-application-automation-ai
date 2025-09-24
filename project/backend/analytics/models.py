from django.db import models
from django.conf import settings
from jobs.models import Company

class JobAnalytics(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    total_jobs = models.IntegerField(default=0)
    total_applications = models.IntegerField(default=0)
    avg_salary = models.FloatField(null=True, blank=True)
    popular_skills = models.JSONField(default=list, blank=True)
    date_analyzed = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Job Analytics"
        ordering = ['-date_analyzed']

    def __str__(self):
        return f"Analytics for {self.company.name} - {self.date_analyzed.date()}"

class UserActivityLog(models.Model):
    ACTIVITY_TYPES = [
        ('login', 'Login'),
        ('job_view', 'Job Viewed'),
        ('job_apply', 'Job Applied'),
        ('profile_update', 'Profile Updated'),
        ('search', 'Search Performed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    description = models.CharField(max_length=200)
    metadata = models.JSONField(default=dict, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user.username} - {self.activity_type} - {self.timestamp}"

class ApplicationStats(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_applications = models.IntegerField(default=0)
    pending_applications = models.IntegerField(default=0)
    accepted_applications = models.IntegerField(default=0)
    rejected_applications = models.IntegerField(default=0)
    interview_calls = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Application Statistics"

    def __str__(self):
        return f"Stats for {self.user.username}"