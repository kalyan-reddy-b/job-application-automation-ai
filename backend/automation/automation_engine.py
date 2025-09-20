import time
import json
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from fake_useragent import UserAgent
import undetected_chromedriver as uc
from django.conf import settings
from .ai_assistant import AIAssistant
from .models import AutomationSession, JobApplication, AutomationLog, JobPlatform

class JobAutomationEngine:
    def __init__(self, session_id):
        self.session = AutomationSession.objects.get(id=session_id)
        self.driver = None
        self.ai_assistant = AIAssistant()
        self.wait_time = (2, 5)  # Random wait between actions
        
    def setup_driver(self):
        """Setup Chrome driver with stealth options"""
        try:
            options = uc.ChromeOptions()
            
            if settings.SELENIUM_HEADLESS:
                options.add_argument('--headless')
            
            # Stealth options
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--disable-blink-features=AutomationControlled')
            options.add_experimental_option("excludeSwitches", ["enable-automation"])
            options.add_experimental_option('useAutomationExtension', False)
            
            # Random user agent
            ua = UserAgent()
            options.add_argument(f'--user-agent={ua.random}')
            
            self.driver = uc.Chrome(options=options)
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            self.log_info("Browser initialized successfully")
            return True
            
        except Exception as e:
            self.log_error(f"Failed to setup driver: {str(e)}")
            return False
    
    def random_wait(self, min_time=None, max_time=None):
        """Random wait to mimic human behavior"""
        min_t = min_time or self.wait_time[0]
        max_t = max_time or self.wait_time[1]
        time.sleep(random.uniform(min_t, max_t))
    
    def human_type(self, element, text, delay_range=(0.05, 0.15)):
        """Type text with human-like delays"""
        element.clear()
        for char in text:
            element.send_keys(char)
            time.sleep(random.uniform(*delay_range))
    
    def safe_find_element(self, by, value, timeout=10):
        """Safely find element with timeout"""
        try:
            wait = WebDriverWait(self.driver, timeout)
            return wait.until(EC.presence_of_element_located((by, value)))
        except TimeoutException:
            return None
    
    def safe_click(self, element):
        """Safely click element with human-like behavior"""
        try:
            # Scroll to element
            self.driver.execute_script("arguments[0].scrollIntoView(true);", element)
            self.random_wait(0.5, 1.0)
            
            # Click element
            element.click()
            self.random_wait()
            return True
        except Exception as e:
            self.log_error(f"Failed to click element: {str(e)}")
            return False
    
    def log_info(self, message, application=None):
        AutomationLog.objects.create(
            session=self.session,
            application=application,
            level='info',
            message=message
        )
    
    def log_error(self, message, application=None, details=None):
        AutomationLog.objects.create(
            session=self.session,
            application=application,
            level='error',
            message=message,
            details=details or {}
        )
    
    def log_success(self, message, application=None):
        AutomationLog.objects.create(
            session=self.session,
            application=application,
            level='success',
            message=message
        )
    
    def start_automation(self):
        """Main automation process"""
        try:
            self.session.status = 'running'
            self.session.save()
            
            if not self.setup_driver():
                return False
            
            profile_data = self.get_profile_data()
            
            for platform in self.session.platforms.all():
                self.log_info(f"Starting automation for {platform.name}")
                
                if platform.name.lower() == 'internshala':
                    self.automate_internshala(profile_data)
                elif platform.name.lower() == 'naukri':
                    self.automate_naukri(profile_data)
                elif platform.name.lower() == 'linkedin':
                    self.automate_linkedin(profile_data)
                
                self.random_wait(10, 20)  # Wait between platforms
            
            self.session.status = 'completed'
            self.session.save()
            
        except Exception as e:
            self.log_error(f"Automation failed: {str(e)}")
            self.session.status = 'failed'
            self.session.save()
        
        finally:
            if self.driver:
                self.driver.quit()
    
    def get_profile_data(self):
        """Get formatted profile data for automation"""
        profile = self.session.profile
        
        return {
            'personal_info': {
                'full_name': f"{profile.user.first_name} {profile.user.last_name}".strip(),
                'email': profile.user.email,
                'phone': profile.phone,
                'location': profile.location,
                'linkedin': profile.linkedin_url,
                'github': profile.github_url,
                'portfolio': profile.portfolio_url,
            },
            'education': list(profile.education.all().values()),
            'experience': list(profile.experience.all().values()),
            'skills': [skill.name for skill in profile.skills.all()],
            'projects': list(profile.projects.all().values()),
        }
    
    def automate_internshala(self, profile_data):
        """Automate Internshala applications"""
        try:
            self.log_info("Starting Internshala automation")
            
            # Navigate to Internshala
            self.driver.get("https://internshala.com/internships")
            self.random_wait(3, 5)
            
            # Login if needed
            if not self.is_logged_in_internshala():
                if not self.login_internshala():
                    return False
            
            # Search for relevant internships
            self.search_internships_internshala(profile_data)
            
            # Apply to internships
            self.apply_to_internships_internshala(profile_data)
            
        except Exception as e:
            self.log_error(f"Internshala automation failed: {str(e)}")
    
    def is_logged_in_internshala(self):
        """Check if already logged in to Internshala"""
        try:
            # Look for profile or dashboard elements
            profile_element = self.safe_find_element(By.CLASS_NAME, "profile_container", timeout=3)
            return profile_element is not None
        except:
            return False
    
    def login_internshala(self):
        """Login to Internshala"""
        try:
            # Get credentials
            credentials = self.session.profile.platformcredentials_set.filter(
                platform__name__icontains='internshala'
            ).first()
            
            if not credentials:
                self.log_error("No Internshala credentials found")
                return False
            
            # Click login button
            login_btn = self.safe_find_element(By.LINK_TEXT, "Login")
            if not login_btn:
                login_btn = self.safe_find_element(By.PARTIAL_LINK_TEXT, "Login")
            
            if login_btn:
                self.safe_click(login_btn)
                self.random_wait()
            
            # Fill email
            email_field = self.safe_find_element(By.ID, "email")
            if email_field:
                self.human_type(email_field, credentials.email)
            
            # Fill password
            password_field = self.safe_find_element(By.ID, "password")
            if password_field:
                self.human_type(password_field, credentials.password)
            
            # Click login
            login_submit = self.safe_find_element(By.XPATH, "//button[@type='submit']")
            if login_submit:
                self.safe_click(login_submit)
                self.random_wait(3, 5)
            
            # Verify login
            if self.is_logged_in_internshala():
                self.log_success("Successfully logged in to Internshala")
                return True
            else:
                self.log_error("Failed to login to Internshala")
                return False
                
        except Exception as e:
            self.log_error(f"Login failed: {str(e)}")
            return False
    
    def search_internships_internshala(self, profile_data):
        """Search for relevant internships"""
        try:
            # Get job preferences
            preferences = getattr(self.session.profile, 'job_preference', None)
            if not preferences:
                self.log_error("No job preferences found")
                return
            
            # Navigate to internships page
            self.driver.get("https://internshala.com/internships")
            self.random_wait(2, 4)
            
            # Apply filters based on preferences
            preferred_roles = preferences.get_preferred_roles_list()
            if preferred_roles:
                # Search for first preferred role
                search_box = self.safe_find_element(By.ID, "search_internships")
                if search_box:
                    self.human_type(search_box, preferred_roles[0])
                    self.random_wait(1, 2)
            
            # Apply location filter
            preferred_locations = preferences.get_preferred_locations_list()
            if preferred_locations and 'remote' not in [loc.lower() for loc in preferred_locations]:
                location_filter = self.safe_find_element(By.ID, "location_filter")
                if location_filter:
                    self.safe_click(location_filter)
                    # Select first preferred location
                    location_option = self.safe_find_element(
                        By.XPATH, f"//label[contains(text(), '{preferred_locations[0]}')]"
                    )
                    if location_option:
                        self.safe_click(location_option)
            
            # Apply search
            search_btn = self.safe_find_element(By.ID, "search_button")
            if search_btn:
                self.safe_click(search_btn)
                self.random_wait(3, 5)
            
            self.log_info("Search filters applied successfully")
            
        except Exception as e:
            self.log_error(f"Search failed: {str(e)}")
    
    def apply_to_internships_internshala(self, profile_data):
        """Apply to internships on current page"""
        try:
            # Find all internship cards
            internship_cards = self.driver.find_elements(By.CLASS_NAME, "internship_meta")
            
            self.log_info(f"Found {len(internship_cards)} internships")
            
            for i, card in enumerate(internship_cards[:5]):  # Limit to 5 applications per session
                try:
                    # Extract job details
                    job_title = card.find_element(By.CLASS_NAME, "job-internship-name").text
                    company_name = card.find_element(By.CLASS_NAME, "company-name").text
                    
                    # Create job application record
                    application = JobApplication.objects.create(
                        session=self.session,
                        platform=JobPlatform.objects.get(name__icontains='internshala'),
                        job_title=job_title,
                        company_name=company_name,
                        job_url=self.driver.current_url,
                        status='pending'
                    )
                    
                    self.log_info(f"Applying to: {job_title} at {company_name}", application)
                    
                    # Click on the internship
                    apply_btn = card.find_element(By.LINK_TEXT, "Apply Now")
                    if apply_btn:
                        self.safe_click(apply_btn)
                        self.random_wait(2, 4)
                        
                        # Fill application form
                        if self.fill_internshala_application(profile_data, application):
                            application.status = 'applied'
                            self.session.successful_applications += 1
                            self.log_success(f"Successfully applied to {job_title}", application)
                        else:
                            application.status = 'failed'
                            self.session.failed_applications += 1
                        
                        application.save()
                        self.session.total_applications += 1
                        self.session.save()
                        
                        # Go back to search results
                        self.driver.back()
                        self.random_wait(2, 3)
                    
                except Exception as e:
                    self.log_error(f"Failed to apply to internship {i+1}: {str(e)}")
                    continue
                    
        except Exception as e:
            self.log_error(f"Application process failed: {str(e)}")
    
    def fill_internshala_application(self, profile_data, application):
        """Fill Internshala application form"""
        try:
            # Wait for form to load
            self.random_wait(2, 3)
            
            # Fill cover letter if present
            cover_letter_field = self.safe_find_element(By.ID, "cover_letter")
            if cover_letter_field and self.session.use_ai_cover_letter:
                # Generate AI cover letter
                job_description = self.extract_job_description()
                cover_letter = self.ai_assistant.generate_cover_letter(
                    profile_data, application.job_title, application.company_name, job_description
                )
                
                if cover_letter:
                    self.human_type(cover_letter_field, cover_letter)
                    application.ai_cover_letter = cover_letter
                    application.save()
            
            # Fill additional questions with AI
            question_fields = self.driver.find_elements(By.CSS_SELECTOR, "textarea[name*='question']")
            ai_responses = {}
            
            for i, field in enumerate(question_fields):
                try:
                    # Get question text
                    question_label = field.find_element(By.XPATH, "./preceding-sibling::label").text
                    
                    # Generate AI response
                    if self.session.use_ai_responses:
                        response = self.ai_assistant.generate_question_response(
                            profile_data, question_label, application.job_title
                        )
                        
                        if response:
                            self.human_type(field, response)
                            ai_responses[f"question_{i+1}"] = {
                                "question": question_label,
                                "response": response
                            }
                
                except Exception as e:
                    self.log_error(f"Failed to fill question {i+1}: {str(e)}")
                    continue
            
            if ai_responses:
                application.ai_responses = ai_responses
                application.save()
            
            # Submit application
            submit_btn = self.safe_find_element(By.XPATH, "//button[@type='submit']")
            if not submit_btn:
                submit_btn = self.safe_find_element(By.XPATH, "//input[@type='submit']")
            
            if submit_btn:
                self.safe_click(submit_btn)
                self.random_wait(3, 5)
                
                # Check for success message
                success_msg = self.safe_find_element(By.CLASS_NAME, "success-message", timeout=5)
                if success_msg:
                    return True
            
            return False
            
        except Exception as e:
            self.log_error(f"Form filling failed: {str(e)}", application)
            return False
    
    def extract_job_description(self):
        """Extract job description from current page"""
        try:
            desc_element = self.safe_find_element(By.CLASS_NAME, "internship_details")
            if desc_element:
                return desc_element.text
            return ""
        except:
            return ""
    
    def automate_naukri(self, profile_data):
        """Automate Naukri.com applications"""
        self.log_info("Naukri automation not implemented yet")
        # TODO: Implement Naukri automation
    
    def automate_linkedin(self, profile_data):
        """Automate LinkedIn applications"""
        self.log_info("LinkedIn automation not implemented yet")
        # TODO: Implement LinkedIn automation