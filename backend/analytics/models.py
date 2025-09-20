from django.db import models
from profiles.models import UserProfile
from automation.models import AutomationSession, JobApplication

class AnalyticsDashboard(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    total_applications = models.IntegerField(default=0)
    successful_applications = models.IntegerField(default=0)
    response_rate = models.FloatField(default=0.0)
    avg_applications_per_day = models.FloatField(default=0.0)
    most_successful_platform = models.CharField(max_length=100, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Analytics for {self.profile.user.username}"

    def update_analytics(self):
        """Update analytics data"""
        sessions = AutomationSession.objects.filter(profile=self.profile)
        applications = JobApplication.objects.filter(session__profile=self.profile)
        
        self.total_applications = applications.count()
        self.successful_applications = applications.filter(status='applied').count()
        
        if self.total_applications > 0:
            self.response_rate = (self.successful_applications / self.total_applications) * 100
        
        # Calculate most successful platform
        platform_stats = {}
        for app in applications.filter(status='applied'):
            platform_name = app.platform.name
            platform_stats[platform_name] = platform_stats.get(platform_name, 0) + 1
        
        if platform_stats:
            self.most_successful_platform = max(platform_stats, key=platform_stats.get)
        
        self.save()

class ApplicationTrend(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    date = models.DateField()
    applications_count = models.IntegerField(default=0)
    successful_count = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ['profile', 'date']

    def __str__(self):
        return f"{self.profile.user.username} - {self.date}"

class PlatformPerformance(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    platform_name = models.CharField(max_length=100)
    total_applications = models.IntegerField(default=0)
    successful_applications = models.IntegerField(default=0)
    success_rate = models.FloatField(default=0.0)
    avg_response_time = models.FloatField(default=0.0)  # in hours
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['profile', 'platform_name']

    def __str__(self):
        return f"{self.profile.user.username} - {self.platform_name}"