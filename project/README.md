# Job Portal - Full Stack Application

A modern job portal web application built with Django REST Framework backend and React frontend.

## Features

- **User Authentication**: Register, login, and profile management
- **Job Listings**: Browse and search job opportunities
- **Job Applications**: Apply to jobs and track application status
- **Company Profiles**: View company information and job postings
- **Analytics Dashboard**: Track job market trends and application statistics
- **Automation Tools**: Automated job application features
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Backend
- Django 4.2.7
- Django REST Framework
- SQLite Database
- Celery for background tasks
- Redis for caching

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios for API calls
- Vite build tool

## Installation

### Backend Setup

1. Create virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create superuser:
```bash
python manage.py createsuperuser
```

5. Start development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## API Endpoints

- `/api/accounts/` - User management
- `/api/jobs/` - Job listings and applications
- `/api/automation/` - Automation tools
- `/api/analytics/` - Analytics and reports

## Project Structure

```
project/
├── backend/
│   ├── core/           # Django settings
│   ├── accounts/       # User management
│   ├── jobs/          # Job listings
│   ├── automation/    # Background tasks
│   └── analytics/     # Data analytics
└── frontend/
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── pages/     # Page components
    │   ├── hooks/     # Custom hooks
    │   └── api/       # API utilities
    └── public/        # Static assets
```

## Contributing

This is a student project for placement preparation. Feel free to suggest improvements!

## License

This project is for educational purposes.