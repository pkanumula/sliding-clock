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

## Download & Run the Standalone Client

You can now grab a single ZIP—no Python or source needed:

1. Download the ZIP:  
   [sliding-clock-client.zip](./release/sliding-clock-client.zip)

2. Unzip it anywhere.

3. Double-click **client.exe** to launch your fullscreen sliding clock
