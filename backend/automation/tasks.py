from celery import shared_task
from .automation_engine import JobAutomationEngine
from .models import AutomationSession
import logging

logger = logging.getLogger(__name__)

@shared_task
def start_automation_task(session_id):
    """Celery task to run automation in background"""
    try:
        logger.info(f"Starting automation for session {session_id}")
        
        engine = JobAutomationEngine(session_id)
        engine.start_automation()
        
        logger.info(f"Automation completed for session {session_id}")
        return f"Automation completed for session {session_id}"
        
    except Exception as e:
        logger.error(f"Automation failed for session {session_id}: {str(e)}")
        
        # Update session status
        try:
            session = AutomationSession.objects.get(id=session_id)
            session.status = 'failed'
            session.save()
        except:
            pass
        
        raise e

@shared_task
def cleanup_old_sessions():
    """Clean up old automation sessions"""
    from django.utils import timezone
    from datetime import timedelta
    
    # Delete sessions older than 30 days
    cutoff_date = timezone.now() - timedelta(days=30)
    old_sessions = AutomationSession.objects.filter(created_at__lt=cutoff_date)
    
    count = old_sessions.count()
    old_sessions.delete()
    
    logger.info(f"Cleaned up {count} old automation sessions")
    return f"Cleaned up {count} old sessions"