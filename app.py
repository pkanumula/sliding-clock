# app.py
# This script creates the application window and provides time data.

import webview
from flask import Flask, render_template, jsonify
from datetime import datetime
from threading import Thread

# Create a Flask app instance
app = Flask(__name__)

@app.route('/time')
def get_time():
    """Provides time in 12-hour format."""
    now = datetime.now()
    
    am_pm = 'AM' if int(now.strftime('%H')) < 12 else 'PM'
    
    # Convert to 12-hour format for display
    hours_12_val = int(now.strftime('%H')) % 12
    if hours_12_val == 0:
        hours_12_val = 12
    hours_12_str = f"{hours_12_val:02d}"

    return jsonify({
        'hours': hours_12_str,
        'minutes': now.strftime('%M'),
        'seconds': now.strftime('%S'),
        'am_pm': am_pm
    })

@app.route('/')
def index():
    """Serves the main HTML user interface."""
    return render_template('index.html')

def run_app():
    """Runs the Flask web server in a separate thread."""
    app.run(host='127.0.0.1', port=5000)

if __name__ == '__main__':
    flask_thread = Thread(target=run_app)
    flask_thread.daemon = True
    flask_thread.start()

    # Create the application window in fullscreen
    webview.create_window(
        'Sliding Clock',
        'http://127.0.0.1:5000',
        fullscreen=True
    )
    webview.start()