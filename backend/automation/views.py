from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import (
    JobPlatform, AutomationSession, JobApplication, 
    AutomationLog, AIPromptTemplate, PlatformCredentials
)
from .serializers import (
    JobPlatformSerializer, AutomationSessionSerializer, JobApplicationSerializer,
    AutomationLogSerializer, AIPromptTemplateSerializer, PlatformCredentialsSerializer
)
from .tasks import start_automation_task


class JobPlatformViewSet(viewsets.ModelViewSet):
    queryset = JobPlatform.objects.all()
    serializer_class = JobPlatformSerializer


class AutomationSessionViewSet(viewsets.ModelViewSet):
    queryset = AutomationSession.objects.all()
    serializer_class = AutomationSessionSerializer

    @action(detail=False, methods=['post'])
    def start_session(self, request):
        profile_id = request.data.get('profile_id')
        platform_ids = request.data.get('platform_ids', [])
        
        if not profile_id or not platform_ids:
            return Response(
                {'error': 'profile_id and platform_ids are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        session = AutomationSession.objects.create(
            profile_id=profile_id,
            use_ai_cover_letter=request.data.get('use_ai_cover_letter', True),
            use_ai_responses=request.data.get('use_ai_responses', True),
            custom_instructions=request.data.get('custom_instructions', ''),
            start_time=timezone.now()
        )
        session.platforms.set(platform_ids)
        start_automation_task.delay(session.id)

        serializer = AutomationSessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def stop_session(self, request, pk=None):
        session = self.get_object()
        session.status = 'paused'
        session.save()
        return Response({'message': 'Session stopped successfully'})

    @action(detail=True, methods=['get'])
    def session_stats(self, request, pk=None):
        session = self.get_object()
        stats = {
            'total_applications': session.total_applications,
            'successful_applications': session.successful_applications,
            'failed_applications': session.failed_applications,
            'success_rate': (session.successful_applications / session.total_applications * 100) if session.total_applications > 0 else 0,
            'status': session.status,
            'platforms': [p.name for p in session.platforms.all()],
            'duration': str(timezone.now() - session.start_time) if session.start_time else None,
        }
        return Response(stats)


class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer

    @action(detail=False, methods=['get'])
    def recent_applications(self, request):
        applications = JobApplication.objects.order_by('-created_at')[:20]
        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)


class AutomationLogViewSet(viewsets.ModelViewSet):
    queryset = AutomationLog.objects.all()
    serializer_class = AutomationLogSerializer


class AIPromptTemplateViewSet(viewsets.ModelViewSet):
    queryset = AIPromptTemplate.objects.all()
    serializer_class = AIPromptTemplateSerializer


class PlatformCredentialsViewSet(viewsets.ModelViewSet):
    queryset = PlatformCredentials.objects.all()
    serializer_class = PlatformCredentialsSerializer

    @action(detail=False, methods=['post'])
    def test_credentials(self, request):
        return Response({'message': 'Credential testing not implemented yet'})
