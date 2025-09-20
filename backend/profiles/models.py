from django.db import models
from django.contrib.auth.models import User
import json

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True)
    location = models.CharField(max_length=100, blank=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    portfolio_url = models.URLField(blank=True)
    resume = models.FileField(upload_to='resumes/', blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

class Education(models.Model):
    DEGREE_CHOICES = [
        ('btech', 'B.Tech'),
        ('mtech', 'M.Tech'),
        ('bca', 'BCA'),
        ('mca', 'MCA'),
        ('bsc', 'B.Sc'),
        ('msc', 'M.Sc'),
        ('other', 'Other'),
    ]
    
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='education')
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=20, choices=DEGREE_CHOICES)
    field_of_study = models.CharField(max_length=100)
    start_year = models.IntegerField()
    end_year = models.IntegerField()
    cgpa = models.FloatField(null=True, blank=True)
    percentage = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.degree} from {self.institution}"

class Experience(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='experience')
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.position} at {self.company}"

class Skill(models.Model):
    SKILL_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('expert', 'Expert'),
    ]
    
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=20, choices=SKILL_LEVELS)
    category = models.CharField(max_length=50, blank=True)  # Programming, Framework, Tool, etc.

    def __str__(self):
        return f"{self.name} ({self.level})"

class Project(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=500)  # Comma-separated
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_ongoing = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def get_technologies_list(self):
        return [tech.strip() for tech in self.technologies.split(',') if tech.strip()]

class JobPreference(models.Model):
    JOB_TYPES = [
        ('internship', 'Internship'),
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
    ]
    
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='job_preference')
    preferred_roles = models.CharField(max_length=500)  # Comma-separated
    preferred_locations = models.CharField(max_length=500)  # Comma-separated
    job_types = models.CharField(max_length=200, default='internship,full_time')  # Comma-separated
    min_salary = models.IntegerField(null=True, blank=True)
    max_salary = models.IntegerField(null=True, blank=True)
    remote_work = models.BooleanField(default=True)
    willing_to_relocate = models.BooleanField(default=True)

    def __str__(self):
        return f"Job Preferences for {self.profile.user.username}"

    def get_preferred_roles_list(self):
        return [role.strip() for role in self.preferred_roles.split(',') if role.strip()]

    def get_preferred_locations_list(self):
        return [loc.strip() for loc in self.preferred_locations.split(',') if loc.strip()]