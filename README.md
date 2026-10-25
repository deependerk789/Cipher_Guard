<div align="center">

# 🛡️ CipherGuard

**A modern, web-based toolkit for password security and awareness.**

Analyze password strength, generate stronger passwords, check passwords against known breach data, and review practical security recommendations — all through a clean, responsive interface.

<p>
  <a href="https://devilkillerwing789.pythonanywhere.com/breach-checker"><strong>🚀 Open Live App</strong></a>
  &nbsp;•&nbsp;
  <a href="https://github.com/deependerk789/Cipher_Guard">GitHub Repository</a>
</p>

![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Web%20App-000000?logo=flask&logoColor=white)
![Security](https://img.shields.io/badge/Focus-Password%20Security-00BFA6)
![License](https://img.shields.io/badge/License-Add%20a%20license-lightgrey)

</div>

---

## 📸 Screenshots

> These images are expected to be committed in the repository's `screenshots/` folder. Update the filenames below if yours differ.

<table>
  <tr>
    <td align="center"><strong>Password Analyzer</strong></td>
    <td align="center"><strong>Password Generator</strong></td>
  </tr>
  <tr>
    <td><img src="screenshots/analyzer.jpeg" alt="CipherGuard password analyzer" width="100%"></td>
    <td><img src="screenshots/generator.jpeg" alt="CipherGuard password generator" width="100%"></td>
  </tr>
  <tr>
    <td align="center"><strong>Breach Checker</strong></td>
    <td align="center"><strong>Security Dashboard</strong></td>
  </tr>
  <tr>
    <td><img src="screenshots/breach-checker.jpeg" alt="CipherGuard breach checker" width="100%"></td>
    <td><img src="screenshots/dashboard.jpeg" alt="CipherGuard security dashboard" width="100%"></td>
  </tr>
</table>

## ✨ Features

### 🔍 Password Analyzer
- Evaluates password strength and provides feedback.
- Uses `zxcvbn` to estimate password guessability and identify common weaknesses.
- Offers practical suggestions for improving password security.

### 🔐 Password Generator
- Generates passwords with a configurable length (8–64 characters).
- Supports uppercase letters, lowercase letters, numbers, and symbols.
- Includes options to exclude ambiguous characters.
- Provides convenient show/hide, copy, and download actions where supported by the app.

### 🕵️ Breach Checker
- Checks whether a password appears in known breach data, if the configured breach-check service is available.
- For privacy, password-breach lookups should use the Have I Been Pwned Pwned Passwords range method (send only a SHA-1 hash prefix, never the password itself).
- A match means the password has appeared in breach data; it does not reveal which account or service was affected.

### 📊 Security Dashboard
- Presents a security overview and actionable recommendations.
- Helps users identify password habits that may need attention.

### 🎨 Interface
- Dark, modern visual design with blue/cyan accents.
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

If that link opens directly on the Breach Checker page, use the app's navigation to explore other sections. If you intended the root homepage to be the landing page, update the URL above to the root URL after confirming that route works.

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

### 4. Start the app

```bash
python app.py
```

Open the local address printed in your terminal (the app commonly uses `http://127.0.0.1:5000`).

## ☁️ Deployment

The project includes deployment-related files such as `Procfile` and `render.yaml`. Deployment steps vary by host. For PythonAnywhere, configure the web app's WSGI file to import the Flask instance as `application`, and select the virtual environment where the project's requirements are installed.

Example WSGI configuration:

```python
import sys

project_path = "/home/your-username/Cipher_Guard"
if project_path not in sys.path:
    sys.path.insert(0, project_path)

from app import app as application
```

Replace `your-username` with your PythonAnywhere username and set the web app's virtualenv path in the PythonAnywhere Web tab.

## 🧪 Run Tests

```bash
pytest
```

## 🔒 Security Notes

- Never reuse passwords across important accounts.
- Use a password manager and enable multi-factor authentication where possible.
- Do not log or store raw passwords.
- For breach checking, use a privacy-preserving range-query approach and follow the breach-data provider's usage guidance.
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
├── INSTALL.md
├── Procfile
├── render.yaml
└── README.md
```

## 🤝 Contributing

1. Fork the repository.
2. Create a branch for your change.
3. Make and test your changes.
4. Open a pull request describing the improvement.

## 📄 License

No license is specified in this README yet. Add a `LICENSE` file and update the badge above before presenting the project as open source.

---

<div align="center">

**Built to make password security easier to understand.**

</div>
