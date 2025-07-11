## Building a Standalone Executable

### On Windows

```powershell
# (Optional) create & activate a virtual environment
python -m venv venv
.\venv\Scripts\activate.bat

# Install dependencies and PyInstaller
pip install -r requirements.txt pyinstaller

# Build the .exe
.\build.bat

# Run your clock:
.\dist\app.exe
