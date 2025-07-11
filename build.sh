#!/usr/bin/env bash
# Build a one-file, windowed executable with PyInstaller

# Ensure we have dependencies
pip install -r requirements.txt pyinstaller

# Remove any previous builds
rm -rf build dist

# Create the executable
pyinstaller \
  --onefile \
  --windowed \
  --add-data "templates:templates" \
  --add-data "static:static" \
  app.py

echo "✔︎ Build complete. Run ./dist/app"
