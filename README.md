<div align="center">

# 🛡️ CipherGuard Security Toolkit

**A modern, web-based toolkit for password security and awareness.**

Analyze password strength, generate stronger passwords, check passwords against known breach data, and review practical security recommendations through a clean, responsive interface.

<p>
  <a href="https://devilkillerwing789.pythonanywhere.com/breach-checker"><strong>🚀 Open Live App</strong></a>
  &nbsp;•&nbsp;
  <a href="https://github.com/deependerk789/Cipher_Guard">GitHub Repository</a>
</p>

![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Web%20App-000000?logo=flask&logoColor=white)
![Security](https://img.shields.io/badge/Focus-Password%20Security-00BFA6)

</div>

---

## 📸 Screenshots

### 🔍 Password Analyzer
![CipherGuard Password Analyzer](screenshots/Password%20Analyzer.jpeg)

### 🔐 Password Generator
![CipherGuard Password Generator](screenshots/Password%20Generator.jpeg)

### 🕵️ Breach Checker
![CipherGuard Breach Checker](screenshots/Breach%20Checker.jpeg)

### 📊 Security Dashboard
![CipherGuard Security Dashboard](screenshots/Security%20Dashboard.jpeg)

---

## ✨ Features

### 🔍 Password Analyzer
- Evaluates password strength and provides feedback.
- Uses `zxcvbn` to estimate password guessability and identify common weaknesses.
- Offers practical suggestions for improving password security.

### 🔐 Password Generator
- Generates passwords with a configurable length (8–64 characters).
- Supports uppercase letters, lowercase letters, numbers, and symbols.
- Includes an option to exclude ambiguous characters.
- Provides show/hide, copy, and download actions where supported by the app.

### 🕵️ Breach Checker
- Checks whether a password appears in known breach data, if the configured breach-check service is available.
- For privacy, breach lookups should use the Have I Been Pwned Pwned Passwords range method, sending only a SHA-1 hash prefix rather than the password itself.
- A match means the password has appeared in breach data; it does not identify which account or service was affected.

### 📊 Security Dashboard
- Presents a security overview and practical recommendations.
- Helps users identify password habits that may need attention.

### 🎨 User Interface
- Modern dark theme with blue and cyan accents.
- Responsive layout for different screen sizes.
- Light-mode toggle, if enabled in the current build.

## 🧰 Tech Stack

- **Backend:** Python, Flask
- **Password-strength estimation:** `zxcvbn`
- **HTTP requests:** `requests`
- **Testing:** `pytest`
- **Frontend:** HTML, CSS, JavaScript

## 🚀 Live Demo

**[Launch CipherGuard](https://devilkillerwing789.pythonanywhere.com/breach-checker)**

The link opens the Breach Checker route. Use the app navigation to explore other sections if available.

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/deependerk789/Cipher_Guard.git
cd Cipher_Guard
```

### 2. Create and activate a virtual environment

**Windows (PowerShell):**

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**

```bat
py -m venv .venv
.venv\Scripts\activate.bat
```

**macOS / Linux:**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Start the application

```bash
python app.py
```

Open the local address printed in the terminal. The app commonly uses `http://127.0.0.1:5000`.

## ☁️ Deployment

The repository includes deployment-related files such as `Procfile` and `render.yaml`. Deployment instructions vary by hosting provider.

For PythonAnywhere, configure the web app's WSGI file to import the Flask instance as `application` and select the virtual environment where the project's dependencies are installed.

Example WSGI configuration:

```python
import sys

project_path = "/home/your-username/Cipher_Guard"
if project_path not in sys.path:
    sys.path.insert(0, project_path)

from app import app as application
```

Replace `your-username` with your PythonAnywhere username and set the virtualenv path in the PythonAnywhere Web tab.

## 🧪 Run Tests

```bash
pytest
```

## 🔒 Security Notes

- Avoid reusing passwords across important accounts.
- Use a password manager and enable multi-factor authentication where possible.
- Never log or store raw passwords unnecessarily.
- Use a privacy-preserving breach-check method and follow the data provider's guidance.
- This project is an educational security tool and is not a substitute for a full security audit.

## 🗂️ Project Structure

```text
Cipher_Guard/
├── app.py
├── requirements.txt
├── templates/
├── static/
├── tests/
├── screenshots/
│   ├── Password Analyzer.jpeg
│   ├── Password Generator.jpeg
│   ├── Breach Checker.jpeg
│   └── Security Dashboard.jpeg
├── INSTALL.md
├── Procfile
├── render.yaml
└── README.md
```

## 🤝 Contributing

1. Fork the repository.
2. Create a branch for your change.
3. Make and test your changes.
4. Open a pull request describing your improvement.

## 📄 License

No license is specified in this README. Add a `LICENSE` file and update this section if you intend to publish the project under an open-source license.

---

<div align="center">

**Built to make password security easier to understand.**

</div>
