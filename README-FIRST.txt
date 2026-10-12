RIZZFLIRT STARTER — READ THIS FIRST
===================================

WHAT THIS IS
- A responsive website prototype designed for an Android phone.
- The reply generator uses sample replies in the browser.
- It is NOT connected to a real AI service.
- Login, database, payment and subscription checks are NOT enabled.
- Do not take payments or promise real AI access from this prototype.

FILES
- index.html: page structure and text
- styles.css: mobile-first design
- app.js: sample reply logic and buttons
- manifest.json + icon.svg: installable-web-app metadata
- sw.js: basic offline cache

EASIEST NO-CODE-ON-PHONE ROUTE
1. Download and unzip this folder on your phone (or leave it zipped until you upload it).
2. Create/sign in to a GitHub account in your browser: https://github.com
3. Open https://github.com/new
4. Repository name: rizzflirt
5. Choose Public (required for GitHub Pages on GitHub Free), tick Add a README if offered, then create the repository.
6. Open the new repository. Use Add file > Upload files.
7. Upload the files INSIDE this folder, so index.html is at the repository root (not buried in another folder).
8. Commit the upload.
9. Open repository Settings > Pages.
10. Under Build and deployment, choose Deploy from a branch; choose main and /(root), then Save.
11. Wait for deployment. The URL should be https://YOUR-GITHUB-USERNAME.github.io/rizzflirt/
12. Open that URL on your phone. In Chrome, use the three-dot menu > Add to Home screen if available.

Official instructions:
https://docs.github.com/en/pages/quickstart

IMPORTANT PUBLIC REPOSITORY WARNING
Anything in this public repository can be seen by others. Never upload API keys, passwords, private user data or payment secrets. This starter has no secrets.

NEXT BUILD STEPS
1. Test the prototype and refine the design.
2. Create a secure server-side AI endpoint; keep provider keys off the frontend.
3. Add authentication and database rules.
4. Add Paystack subscription checkout and verify payments on the server before granting Premium.
5. Add privacy policy, terms, support contact, usage limits and abuse protections.
6. Only then consider packaging for Android/Play Store.

ZERO-BUDGET REALITY
Hosting the static prototype can be free. A real AI service, domain, payment processing and Play Store publishing may introduce costs. Free AI quotas can change. Do not advertise unlimited AI until costs are understood.
