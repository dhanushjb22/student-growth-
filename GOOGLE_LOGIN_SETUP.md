# Google Login Setup Guide

## Step 1: Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Enter project name: "Student Academic Growth"
4. Click "Create"

## Step 2: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** (allows anyone with a Google account to login)
3. Click "Create"
4. Fill in required fields:
   - App name: `Student Academic Growth`
   - User support email: `your-email@gmail.com`
   - Developer contact: `your-email@gmail.com`
5. Click "Save and Continue"
6. Skip "Scopes" → Click "Save and Continue"
7. Skip "Test users" → Click "Save and Continue"
8. Click "Back to Dashboard"

## Step 3: Create OAuth Client ID

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. Select Application type: **Web application**
4. Name: `Student Academic Growth Web Client`
5. Add Authorized JavaScript origins:
   - `http://localhost:3000`
6. Add Authorized redirect URIs:
   - `http://localhost:3000`
7. Click **Create**
8. **COPY THE CLIENT ID** (looks like: `123456789-abc123.apps.googleusercontent.com`)

## Step 4: Update Your Project

Open `frontend/src/index.js` and replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID:

```javascript
<GoogleOAuthProvider clientId="YOUR_ACTUAL_CLIENT_ID_HERE">
```

## Step 5: Test

1. Restart your React app: `npm start`
2. Go to login page
3. Click "Continue with Google"
4. Login with ANY Google account
5. Account will be automatically created as a student

## Important Notes

- **External** user type allows ANYONE with a Google account to login
- No need to add test users
- First-time users will see a warning that the app is not verified (this is normal for development)
- Click "Continue" to proceed with login
- The app automatically creates a student account for new Google users

## Troubleshooting

If you get "Access blocked: Authorization Error":
- Make sure you copied the correct Client ID
- Verify `http://localhost:3000` is in Authorized JavaScript origins
- Clear browser cache and try again
- Make sure OAuth consent screen is configured as "External"
