Job Application Automation AI
=============================

This is a full-stack web application that automates job applications and provides analytics for users.

Features
--------

*   Create a personal account with secure authentication using JWT.
    
*   Build and update user profiles including education, experience, skills, and job preferences.
    
*   Upload and manage profile images (avatar).
    
*   Search and filter job applications based on user-defined criteria.
    
*   Track submitted applications with status updates.
    
*   AI-driven automation for repetitive job application tasks.
    
*   Dashboard with analytics to visualize application trends and performance.
    

Frontend
--------

**Technologies:** React, TypeScript, TailwindCSS, Axios

*   Integrated API calls using Axios to communicate with the backend server.
    
*   Implemented secure login authentication with JWT, including Access and Refresh Tokens.
    
*   Developed user-friendly forms for creating and updating profiles.
    
*   Built a dashboard to display analytics and application statistics.
    
*   Enabled users to manage job applications and track progress.
    

Backend
-------

**Technologies:** Django, Django REST Framework (DRF), SQLite/MySQL

*   Implemented RESTful APIs to manage profiles, job applications, and automation tasks.
    
*   Applied authentication and authorization with JWT for secure sessions.
    
*   Designed an automation engine to handle repetitive job application tasks.
    
*   Logging middleware to capture API requests and errors for monitoring and debugging.
    
*   Utilized Django migrations to manage and version the database schema.
    

Deployment & Configuration
--------------------------

**Development Setup:**

*   Frontend connects to backend via REACT\_APP\_API\_URL=http://localhost:8000.
    
*   Backend connects to frontend via CLIENT\_URL=http://localhost:3000.
    
*   Local MySQL or SQLite database for development.
    
*   Avatar image feature configured via AWS S3, CloudFront, and Secrets Manager.
    

**Production Setup:**

*   Frontend deployed on static hosting (e.g., S3) with CDN.
    
*   Backend deployed via Docker container on ECS or similar server environment.
    
*   Backend connected to MySQL RDS instance.
    
*   Avatar images served from AWS S3 with signed URLs.
    

Next Steps
----------

*   Implement automated email notifications for job application updates.
    
*   Integrate job portals like LinkedIn for automatic application data.
    
*   Add real-time notifications for application status updates.
    
*   Enhance AI automation for smarter job matching and application prioritization.
