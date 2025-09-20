from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnalyticsDashboardViewSet, ApplicationTrendViewSet, PlatformPerformanceViewSet

router = DefaultRouter()
router.register(r'dashboard', AnalyticsDashboardViewSet)
router.register(r'trends', ApplicationTrendViewSet)
router.register(r'performance', PlatformPerformanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]