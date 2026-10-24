# CipherGuard 3D experience update

## Included
- GuardBot robot assistant with step-by-step tours and button explanations
- Dark/light mode toggle with browser-local preference
- 3D hover/tilt effects on feature cards and dashboard panels
- Dedicated Password Generator page at `/password-generator`
- Results page now shows tool cards rather than the full generator form
- More visually engaging Security Dashboard with illustrative 3D cards and downloadable report

## Install and test
1. Back up your existing project.
2. Extract this ZIP. Copy the included files/folders into your working project, preserving any custom changes you have made.
3. Install requirements: `python -m pip install -r requirements.txt`
4. Start: `python app.py`
5. Visit `http://127.0.0.1:5000/` and test the analyzer, results-page buttons, generator page, breach checker, dashboard, theme switch, and GuardBot tours.
6. Only deploy after local testing.

## Notes
- GuardBot is an interactive rule-based guide, not a generative AI model.
- Dashboard score and bars are illustrative only, not measured account security.
- Use fictional sample passwords only. The current analyzer sends its sample to the Flask server.
- Theme preference is stored in browser localStorage.
- The password generator uses the Web Crypto API and runs locally in the browser. Downloading plain-text passwords is less safe than using a password manager.


## Latest interaction upgrade
- A subtle 3D cursor orb follows the mouse on desktop; the normal system cursor remains visible.
- Internal page navigation and valid form submissions show a short animated 3D transition.
- During guided tours, GuardBot highlights the current control and places a pointing-hand robot next to it.
- Reduced-motion preferences and touch devices are respected.


## SecureAuth-inspired theme
The `static/secureauth-theme.css` stylesheet applies a cleaner, professional deep-blue authentication-inspired theme across the main pages. The home page uses a "YOUR SECURE SPACE / Welcome back" introduction, crisp blue primary button, outlined form fields, and restrained cyan accents.

This is visual styling only. CipherGuard remains a password-analysis educational demo; it does not implement real account login, account creation, email verification, or OTP authentication. Never enter a real password into this analyzer.
If the theme does not appear after copying the files, restart Flask and hard-refresh with Ctrl+F5.


## 3D Theme Update
The new `static/cipherguard-3d-theme.css` adds the dark holographic cyber-security styling, raised neon buttons, a compact responsive navigation bar, glass cards, and focus/hover states. Existing Flask routes and feature JavaScript are retained. The robot guide and cursor effects are supplied by the existing project files. Run locally and verify the UI before deploying.


## Latest UI fixes
- Light mode now switches the submitted-information panel, security-check summary, checklist, recommendations, and related cards to light surfaces.
- Removed the duplicate `MORE TOOLS / 04` block from the password analysis results page; the primary toolbox cards remain.
