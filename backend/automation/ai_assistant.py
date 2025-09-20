import openai
from django.conf import settings
from .models import AIPromptTemplate

class AIAssistant:
    def __init__(self):
        if settings.OPENAI_API_KEY:
            openai.api_key = settings.OPENAI_API_KEY
        else:
            self.mock_mode = True
    
    def generate_cover_letter(self, profile_data, job_title, company_name, job_description=""):
        """Generate AI cover letter"""
        try:
            # Get template
            template = AIPromptTemplate.objects.filter(
                template_type='cover_letter', is_default=True
            ).first()
            
            if not template:
                template_text = self.get_default_cover_letter_template()
            else:
                template_text = template.prompt_template
            
            # Format prompt
            prompt = template_text.format(
                full_name=profile_data['personal_info']['full_name'],
                job_title=job_title,
                company_name=company_name,
                skills=', '.join(profile_data['skills'][:5]),  # Top 5 skills
                experience=self.format_experience(profile_data['experience']),
                projects=self.format_projects(profile_data['projects']),
                job_description=job_description[:500]  # Limit job description
            )
            
            if hasattr(self, 'mock_mode'):
                return self.generate_mock_cover_letter(job_title, company_name)
            
            # Generate with OpenAI
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional career counselor helping write cover letters."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=300,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            print(f"AI cover letter generation failed: {str(e)}")
            return self.generate_mock_cover_letter(job_title, company_name)
    
    def generate_question_response(self, profile_data, question, job_title):
        """Generate AI response to application questions"""
        try:
            prompt = f"""
            Based on this profile information, answer the following question for a {job_title} position:
            
            Profile:
            - Name: {profile_data['personal_info']['full_name']}
            - Skills: {', '.join(profile_data['skills'][:5])}
            - Experience: {self.format_experience(profile_data['experience'])}
            
            Question: {question}
            
            Provide a concise, professional answer (max 100 words):
            """
            
            if hasattr(self, 'mock_mode'):
                return self.generate_mock_response(question)
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are helping answer job application questions professionally."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=150,
                temperature=0.6
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            print(f"AI question response failed: {str(e)}")
            return self.generate_mock_response(question)
    
    def format_experience(self, experience_list):
        """Format experience for AI prompts"""
        if not experience_list:
            return "Fresh graduate with academic projects"
        
        formatted = []
        for exp in experience_list[:2]:  # Top 2 experiences
            formatted.append(f"{exp.get('position', 'Position')} at {exp.get('company', 'Company')}")
        
        return '; '.join(formatted)
    
    def format_projects(self, projects_list):
        """Format projects for AI prompts"""
        if not projects_list:
            return "Various academic and personal projects"
        
        formatted = []
        for proj in projects_list[:2]:  # Top 2 projects
            formatted.append(f"{proj.get('title', 'Project')}")
        
        return '; '.join(formatted)
    
    def get_default_cover_letter_template(self):
        """Default cover letter template"""
        return """
        Write a professional cover letter for {full_name} applying for {job_title} position at {company_name}.
        
        Key details to include:
        - Skills: {skills}
        - Experience: {experience}
        - Projects: {projects}
        
        Keep it concise (max 200 words), professional, and enthusiastic.
        """
    
    def generate_mock_cover_letter(self, job_title, company_name):
        """Generate mock cover letter when AI is not available"""
        return f"""Dear Hiring Manager,

I am writing to express my strong interest in the {job_title} position at {company_name}. As a dedicated computer science student with a passion for technology and innovation, I am excited about the opportunity to contribute to your team.

My technical skills in programming languages like Python, Java, and JavaScript, combined with my experience in web development and database management, make me well-suited for this role. I have worked on several projects that demonstrate my ability to solve complex problems and deliver quality solutions.

I am particularly drawn to {company_name} because of your reputation for innovation and excellence in the industry. I am eager to bring my enthusiasm, fresh perspective, and technical skills to your team.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your organization.

Best regards,
[Your Name]"""
    
    def generate_mock_response(self, question):
        """Generate mock response to questions"""
        question_lower = question.lower()
        
        if 'why' in question_lower and ('company' in question_lower or 'organization' in question_lower):
            return "I am impressed by your company's innovative approach and commitment to excellence. I believe my skills and enthusiasm would be a great fit for your team."
        
        elif 'strength' in question_lower:
            return "My key strengths include strong problem-solving abilities, quick learning capacity, and excellent teamwork skills. I am also proficient in multiple programming languages and frameworks."
        
        elif 'experience' in question_lower:
            return "While I am a recent graduate, I have gained valuable experience through academic projects, internships, and personal coding projects. I am eager to apply my knowledge in a professional setting."
        
        elif 'available' in question_lower or 'start' in question_lower:
            return "I am available to start immediately and can commit to the full duration of the internship/position."
        
        else:
            return "I am very interested in this opportunity and believe my technical skills and enthusiasm make me a strong candidate for this position."