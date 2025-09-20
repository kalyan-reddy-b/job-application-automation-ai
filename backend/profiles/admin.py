from django.contrib import admin
from .models import UserProfile, Education, Experience, Skill, Project, JobPreference

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'location', 'created_at']
    search_fields = ['user__username', 'user__email', 'phone']

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['profile', 'degree', 'institution', 'start_year', 'end_year']
    list_filter = ['degree', 'start_year']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['profile', 'position', 'company', 'start_date', 'is_current']
    list_filter = ['is_current', 'start_date']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['profile', 'name', 'level', 'category']
    list_filter = ['level', 'category']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['profile', 'title', 'start_date', 'is_ongoing']
    list_filter = ['is_ongoing', 'start_date']

@admin.register(JobPreference)
class JobPreferenceAdmin(admin.ModelAdmin):
    list_display = ['profile', 'remote_work', 'willing_to_relocate']
    list_filter = ['remote_work', 'willing_to_relocate']