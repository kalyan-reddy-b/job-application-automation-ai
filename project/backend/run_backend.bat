@echo off
REM Activate virtual environment
call venv\Scripts\activate

REM Set Python path to current folder
set PYTHONPATH=%CD%

REM Install requirements if needed
pip install -r requirements.txt

REM Run migrations
python manage.py migrate

REM Create superuser (optional, will prompt)
python manage.py createsuperuser

REM Run server
python manage.py runserver
pause
