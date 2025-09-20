from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Avg
from datetime import datetime, timedelta
from .models import AnalyticsDashboard, ApplicationTrend, PlatformPerformance
from .serializers import AnalyticsDashboardSerializer, ApplicationTrendSerializer, PlatformPerformanceSerializer
from automation.models import JobApplication, AutomationSession

class AnalyticsDashboardViewSet(viewsets.ModelViewSet):
    queryset = AnalyticsDashboard.objects.all()
    serializer_class = AnalyticsDashboardSerializer

    @action(detail=False, methods=['get'])
    def overview(self, request):
        """Get analytics overview"""
        profile_id = request.query_params.get('profile_id')
        
        if not profile_id:
            return Response({'error': 'profile_id is required'}, status=400)
        
        # Get or create analytics dashboard
        dashboard, created = AnalyticsDashboard.objects.get_or_create(
            profile_id=profile_id
        )
        
        if created or dashboard.last_updated < datetime.now() - timedelta(hours=1):
            dashboard.update_analytics()
        
        # Get recent trends
        trends = ApplicationTrend.objects.filter(
            profile_id=profile_id
        ).order_by('-date')[:30]
        
        # Get platform performance
        platforms = PlatformPerformance.objects.filter(
            profile_id=profile_id
        ).order_by('-success_rate')
        
        return Response({
            'dashboard': AnalyticsDashboardSerializer(dashboard).data,
            'trends': ApplicationTrendSerializer(trends, many=True).data,
            'platforms': PlatformPerformanceSerializer(platforms, many=True).data,
        })

    @action(detail=False, methods=['get'])
    def application_stats(self, request):
        """Get detailed application statistics"""
        profile_id = request.query_params.get('profile_id')
        
        if not profile_id:
            return Response({'error': 'profile_id is required'}, status=400)
        
        # Get applications for the profile
        applications = JobApplication.objects.filter(
            session__profile_id=profile_id
        )
        
        # Calculate statistics
        total_apps = applications.count()
        successful_apps = applications.filter(status='applied').count()
        failed_apps = applications.filter(status='failed').count()
        pending_apps = applications.filter(status='pending').count()
        
        # Success rate by platform
        platform_stats = applications.values('platform__name').annotate(
            total=Count('id'),
            successful=Count('id', filter=models.Q(status='applied'))
        )
        
        # Applications by date
        date_stats = applications.extra(
            select={'date': 'date(created_at)'}
        ).values('date').annotate(
            count=Count('id')
        ).order_by('-date')[:30]
        
        return Response({
            'summary': {
                'total_applications': total_apps,
                'successful_applications': successful_apps,
                'failed_applications': failed_apps,
                'pending_applications': pending_apps,
                'success_rate': (successful_apps / total_apps * 100) if total_apps > 0 else 0,
            },
            'platform_stats': list(platform_stats),
            'date_stats': list(date_stats),
        })

class ApplicationTrendViewSet(viewsets.ModelViewSet):
    queryset = ApplicationTrend.objects.all()
    serializer_class = ApplicationTrendSerializer

class PlatformPerformanceViewSet(viewsets.ModelViewSet):
    queryset = PlatformPerformance.objects.all()
    serializer_class = PlatformPerformanceSerializer