@echo off
rem Start AgriWasteX ML backend
cd "%~dp0"
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
