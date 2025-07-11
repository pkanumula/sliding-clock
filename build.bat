@echo off
REM Build a one-file, windowed executable with PyInstaller

pip install -r requirements.txt pyinstaller

REM Remove previous builds
rmdir /s /q build
rmdir /s /q dist

REM Create the executable
pyinstaller ^
  --onefile ^
  --windowed ^
  --add-data "templates;templates" ^
  --add-data "static;static" ^
  app.py

echo Build complete. Run dist\app.exe
pause
