from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileViewSet, EducationViewSet, ExperienceViewSet,
    SkillViewSet, ProjectViewSet, JobPreferenceViewSet
)

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)
router.register(r'education', EducationViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'job-preferences', JobPreferenceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]