from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile, Education, Experience, Skill, Project, JobPreference
from .serializers import (
    UserProfileSerializer, EducationSerializer, ExperienceSerializer,
    SkillSerializer, ProjectSerializer, JobPreferenceSerializer
)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    @action(detail=False, methods=['post'])
    def create_profile(self, request):
        """Create a complete user profile with all related data"""
        try:
            # Create or get user
            user_data = request.data.get('user', {})
            user, created = User.objects.get_or_create(
                username=user_data.get('username'),
                defaults={
                    'email': user_data.get('email', ''),
                    'first_name': user_data.get('first_name', ''),
                    'last_name': user_data.get('last_name', ''),
                }
            )

            # Create or update profile
            profile_data = request.data.get('profile', {})
            profile, created = UserProfile.objects.get_or_create(
                user=user,
                defaults=profile_data
            )
            if not created:
                for key, value in profile_data.items():
                    setattr(profile, key, value)
                profile.save()

            # Handle education
            education_data = request.data.get('education', [])
            Education.objects.filter(profile=profile).delete()
            for edu in education_data:
                Education.objects.create(profile=profile, **edu)

            # Handle experience
            experience_data = request.data.get('experience', [])
            Experience.objects.filter(profile=profile).delete()
            for exp in experience_data:
                Experience.objects.create(profile=profile, **exp)

            # Handle skills
            skills_data = request.data.get('skills', [])
            Skill.objects.filter(profile=profile).delete()
            for skill in skills_data:
                Skill.objects.create(profile=profile, **skill)

            # Handle projects
            projects_data = request.data.get('projects', [])
            Project.objects.filter(profile=profile).delete()
            for project in projects_data:
                Project.objects.create(profile=profile, **project)

            # Handle job preferences
            job_pref_data = request.data.get('job_preference', {})
            if job_pref_data:
                JobPreference.objects.update_or_create(
                    profile=profile,
                    defaults=job_pref_data
                )

            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['get'])
    def export_data(self, request, pk=None):
        """Export profile data for automation"""
        profile = self.get_object()
        serializer = UserProfileSerializer(profile)
        
        # Format data for automation scripts
        automation_data = {
            'personal_info': {
                'full_name': f"{profile.user.first_name} {profile.user.last_name}".strip(),
                'email': profile.user.email,
                'phone': profile.phone,
                'location': profile.location,
                'linkedin': profile.linkedin_url,
                'github': profile.github_url,
                'portfolio': profile.portfolio_url,
            },
            'education': [
                {
                    'institution': edu.institution,
                    'degree': edu.get_degree_display(),
                    'field': edu.field_of_study,
                    'year': f"{edu.start_year}-{edu.end_year}",
                    'cgpa': edu.cgpa,
                    'percentage': edu.percentage,
                }
                for edu in profile.education.all()
            ],
            'experience': [
                {
                    'company': exp.company,
                    'position': exp.position,
                    'duration': f"{exp.start_date} to {'Present' if exp.is_current else exp.end_date}",
                    'description': exp.description,
                    'location': exp.location,
                }
                for exp in profile.experience.all()
            ],
            'skills': [skill.name for skill in profile.skills.all()],
            'projects': [
                {
                    'title': proj.title,
                    'description': proj.description,
                    'technologies': proj.get_technologies_list(),
                    'github': proj.github_url,
                    'live_url': proj.live_url,
                }
                for proj in profile.projects.all()
            ],
            'preferences': {
                'roles': profile.job_preference.get_preferred_roles_list() if hasattr(profile, 'job_preference') else [],
                'locations': profile.job_preference.get_preferred_locations_list() if hasattr(profile, 'job_preference') else [],
                'salary_range': {
                    'min': profile.job_preference.min_salary if hasattr(profile, 'job_preference') else None,
                    'max': profile.job_preference.max_salary if hasattr(profile, 'job_preference') else None,
                },
                'remote_work': profile.job_preference.remote_work if hasattr(profile, 'job_preference') else True,
            }
        }
        
        return Response(automation_data)

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class JobPreferenceViewSet(viewsets.ModelViewSet):
    queryset = JobPreference.objects.all()
    serializer_class = JobPreferenceSerializer