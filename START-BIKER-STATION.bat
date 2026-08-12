@echo off
cd /d "%~dp0"
where py >nul 2>nul && (start "" "http://localhost:5500" & py -m http.server 5500 & pause & exit /b)
where python >nul 2>nul && (start "" "http://localhost:5500" & python -m http.server 5500 & pause & exit /b)
echo Python not found.
pause
