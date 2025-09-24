from django.contrib import admin
from .models import Company, JobListing, Application

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'website', 'created_at')
    list_filter = ('location', 'created_at')
    search_fields = ('name', 'location')

@admin.register(JobListing)
class JobListingAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'job_type', 'is_active', 'posted_date')
    list_filter = ('job_type', 'is_active', 'company', 'location', 'posted_date')
    search_fields = ('title', 'company__name', 'location')
    list_editable = ('is_active',)

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('user', 'job', 'status', 'applied_date')
    list_filter = ('status', 'applied_date', 'job__company')
    search_fields = ('user__username', 'job__title')
    list_editable = ('status',)