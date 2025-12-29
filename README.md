
# iGemini: Shipping Instructions

Follow these steps to get your prototype live and shareable.

## Step 1: Host the Folder (The "Web App" Phase)
This is the fastest way to get iGemini onto a phone.

1. **Create a GitHub Repository**: 
   - Go to [github.com/new](https://github.com/new) and create a private or public repo named `igemini`.
   - Push all the files provided here to that repository.

2. **Connect to Vercel**:
   - Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
   - Click **"Add New" > "Project"**.
   - Import your `igemini` repository.

3. **Configure Environment Variables (CRITICAL)**:
   - During the import process, find the **"Environment Variables"** section.
   - Add a key named `API_KEY`.
   - Paste your Gemini API Key from Google AI Studio as the value.

4. **Deploy**:
   - Click **"Deploy"**. Vercel will give you a URL (e.g., `igemini-prototype.vercel.app`).

## Step 2: Testing the Mobile Workflow
1. **Open the URL on your Phone**: Open the Vercel link in Safari (iOS) or Chrome (Android).
2. **"Add to Home Screen"**: 
   - **iOS**: Tap the Share icon (square with arrow) -> "Add to Home Screen".
   - **Android**: Tap the three dots -> "Install App" or "Add to Home Screen".
   - *Result*: You now have a high-fidelity app icon on your phone that launches in standalone mode.
3. **Try a Deep Link**:
   - Send yourself a link like: `https://your-url.vercel.app/#/share/Hello%20Gemini`
   - Tap it. The app will open with "Hello Gemini" pre-filled in the compose box.

## Step 3: Native Share Receiver (Advanced)
To make iGemini show up in the **Native Share Sheet** (e.g., sharing from WhatsApp), you must proceed with the Capacitor steps listed in the original technical choice section (Step 3 in the manifest logic).
