# 🛡️ CipherGuard --- Password Security Toolkit

```{=html}
<p align="center">
```
`<img src="https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.13">`{=html}
`<img src="https://img.shields.io/badge/Flask-Web%20Framework-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">`{=html}
`<img src="https://img.shields.io/badge/Security-Password%20Hygiene-00C9A7?style=for-the-badge" alt="Password Security">`{=html}
`<img src="https://img.shields.io/badge/Project-Educational-2563EB?style=for-the-badge" alt="Educational Project">`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<strong>`{=html}A modern password-security toolkit built with Python
and Flask.`</strong>`{=html}`<br>`{=html} Analyze sample passwords,
generate stronger passwords, check samples against a breached-password
corpus, and explore password-hygiene recommendations.
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<a href="https://devilkillerwing789.pythonanywhere.com/breach-checker">`{=html}🌐
Live Demo`</a>`{=html} ·
`<a href="https://github.com/deependerk789/Cipher_Guard">`{=html}📂
GitHub Repository`</a>`{=html} · `<a href="#-installation">`{=html}⚙️
Installation`</a>`{=html} · `<a href="#-screenshots">`{=html}🖼️
Screenshots`</a>`{=html}
```{=html}
</p>
```
> **Important:** CipherGuard is an educational demonstration, not a
> production security service. Use made-up sample passwords only. Never
> enter real passwords or account credentials.

------------------------------------------------------------------------

## 📌 Overview

CipherGuard brings several password-security learning tools together in
one web application. Its interface is designed to make password
strength, safer password generation, breached-password checks, and
general password-hygiene practices easier to explore.

The project uses **Python and Flask** for its web application, with
frontend templates and static assets for the user interface.

## ✨ Features

### 🔍 Password Analyzer

-   Analyze a made-up sample password and explore its estimated
    strength.
-   Use the interface's visibility control to show or hide the sample.
-   Learn about password-strength concepts without connecting a real
    account.

### 🔐 Password Generator

-   Generate passwords in the browser.
-   Configure password length from **8 to 64 characters**.
-   Choose uppercase letters, lowercase letters, numbers, and symbols.
-   Optionally exclude ambiguous characters.
-   Show or hide the generated value, copy it, or download it as a text
    file.

### 🚨 Password Breach Checker

-   Check a made-up sample against the Have I Been Pwned Pwned Passwords
    corpus.
-   Uses a SHA-1 hash-prefix lookup approach: the service lookup uses a
    five-character prefix rather than the full password.
-   Results depend on the external service and network availability.

**Privacy note:** The sample is sent to the Flask application for
hashing. The full password should not be sent to the breach service, but
the application server may receive the sample. Use only made-up
passwords.

### 📊 Security Dashboard

-   View an illustrative security-posture score.
-   Explore password-length, unique-password, multi-factor
    authentication, and password-manager recommendations.
-   Review password-hygiene guidance.

Dashboard scores and percentages are illustrative. They do not represent
a scan of real accounts or devices.

### 🎨 User Interface

-   Dark navy styling with cyan and blue gradients.
-   Navigation between the application's security tools.
-   Light-mode option.
-   Interactive forms and clear educational privacy notices.

## 🖼️ Screenshots

Add the screenshots to the repository's `screenshots/` directory using
the filenames shown below. If your images have different names or
extensions, update the paths accordingly.

### Password Analyzer

![CipherGuard Password Analyzer](screenshots/analyzer.jpeg)

### Password Generator

![CipherGuard Password Generator](screenshots/generator.jpeg)

### Password Breach Checker

![CipherGuard Password Breach Checker](screenshots/breach-checker.jpeg)

### Security Dashboard

![CipherGuard Security Dashboard](screenshots/dashboard.jpeg)

## 🧰 Technology Stack

  -----------------------------------------------------------------------
  Technology                          Purpose
  ----------------------------------- -----------------------------------
  Python                              Backend programming

  Flask                               Web application framework

  HTML5 / CSS3 / JavaScript           Frontend structure, styling, and
                                      interactions

  Jinja2                              Server-side HTML templating

  zxcvbn                              Password-strength estimation
                                      library

  Have I Been Pwned Pwned Passwords   Breached-password lookup service

  Gunicorn                            WSGI server option

  pytest                              Testing framework

  PythonAnywhere                      Hosting and deployment
  -----------------------------------------------------------------------

## 🏗️ Project Structure

``` text
Cipher_Guard/
├── app.py                 # Flask application and routes
├── requirements.txt       # Python dependencies
├── Procfile               # Process configuration
├── render.yaml            # Render deployment configuration
├── INSTALL.md             # Installation notes
├── README.md              # Project documentation
├── templates/             # HTML/Jinja2 templates
├── static/                # CSS, JavaScript, and other static assets
├── screenshots/            # Project screenshots
└── tests/                  # Automated tests
```

## ⚙️ Installation

### Prerequisites

-   Python 3.10+ (use a version compatible with the project's
    dependencies)
-   Git
-   A modern web browser
-   Internet access for breach-check functionality

### 1. Clone the repository

``` bash
git clone https://github.com/deependerk789/Cipher_Guard.git
cd Cipher_Guard
```

### 2. Create a virtual environment

**Windows**

``` bash
python -m venv .venv
.venv\Scripts\activate
```

**Linux / macOS**

``` bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

``` bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### 4. Run the application

``` bash
python app.py
```

Open `http://127.0.0.1:5000` in your browser, or use the local URL and
port printed by the application.

## 🚀 Deployment on PythonAnywhere

1.  Create a PythonAnywhere account and open a Bash console.
2.  Clone the repository or update your existing checkout.
3.  Create and activate a virtual environment using a Python version
    supported by your account.
4.  Install dependencies with
    `python -m pip install -r requirements.txt`.
5.  Create a web app using **Manual configuration** for the matching
    Python version.
6.  Set the source code / working directory to your project directory.
7.  Set the virtual environment path in the Web tab.
8.  Configure the WSGI file to import the Flask application.
9.  Reload the web app and inspect the error log if anything fails.

Example WSGI configuration (replace `YOUR_USERNAME` with your
PythonAnywhere username):

``` python
import sys

project_path = "/home/YOUR_USERNAME/Cipher_Guard"
if project_path not in sys.path:
    sys.path.insert(0, project_path)

from app import app as application
```

### Live Demo

**[Open CipherGuard on
PythonAnywhere](https://devilkillerwing789.pythonanywhere.com/breach-checker)**

The URL is included from the project's deployment configuration and
should be tested to confirm it is currently available.

## 🧪 Testing

The repository includes a `tests/` directory and lists `pytest` in its
dependencies. Run:

``` bash
python -m pytest
```

Review the output to see which tests are present and whether they pass.

## 🔒 Security and Privacy Notes

-   Never enter real passwords, account credentials, or secrets into
    this educational demo.
-   Password-strength scores are estimates, not guarantees of security.
-   Verify the password generator's randomness and handling before
    relying on it for sensitive use.
-   The breach checker should send only the required hash prefix to the
    external breach service; the Flask application may still receive the
    sample password.
-   Dashboard values are illustrative and do not prove that accounts or
    devices have been scanned.
-   A production deployment requires a separate security review,
    including HTTPS, secure configuration, input validation, logging,
    rate limiting, and sensitive-data handling.

## 🛣️ Possible Future Improvements

-   [ ] Expand automated tests for routes and input validation.
-   [ ] Improve accessibility and keyboard navigation.
-   [ ] Add clearer password-strength explanations.
-   [ ] Improve breach-check error handling and availability messaging.
-   [ ] Review password-generation randomness and sensitive-data
    handling.
-   [ ] Add dependency scanning and security checks to CI.
-   [ ] Further improve mobile responsiveness.

## 🤝 Contributing

Contributions and suggestions are welcome.

1.  Fork the repository.
2.  Create a feature branch.
3.  Make your changes and add tests where appropriate.
4.  Open a pull request describing the changes.

Do not include real passwords, credentials, API keys, or other sensitive
data in issues, pull requests, or screenshots.

## 📄 License

Check the repository for a `LICENSE` file. If no license is present,
reuse and redistribution permissions have not been explicitly granted.

## 👨‍💻 Project Links

-   **GitHub:**
    [deependerk789/Cipher_Guard](https://github.com/deependerk789/Cipher_Guard)
-   **Live demo:**
    [devilkillerwing789.pythonanywhere.com](https://devilkillerwing789.pythonanywhere.com/breach-checker)

------------------------------------------------------------------------

```{=html}
<p align="center">
```
`<strong>`{=html}🔐 Better password habits start with better
awareness.`</strong>`{=html}`<br>`{=html} Built for learning,
experimentation, and safer password practices.
```{=html}
</p>
```
