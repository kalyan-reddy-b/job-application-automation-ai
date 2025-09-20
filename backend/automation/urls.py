from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    JobPlatformViewSet,
    AutomationSessionViewSet,
    JobApplicationViewSet,
    AutomationLogViewSet,
    AIPromptTemplateViewSet,
    PlatformCredentialsViewSet
)

# Create DRF router
router = DefaultRouter()
router.register(r'platforms', JobPlatformViewSet)
router.register(r'sessions', AutomationSessionViewSet, basename='session')
router.register(r'applications', JobApplicationViewSet)
router.register(r'logs', AutomationLogViewSet)
router.register(r'templates', AIPromptTemplateViewSet)
router.register(r'credentials', PlatformCredentialsViewSet)

# Include router URLs
urlpatterns = [
    path('', include(router.urls)),
]
 