<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Shadow Fit: The System 🌑💪

**"The System" has chosen you.**

Shadow Fit is not just a fitness app; it is an immersive, RPG-styled AI coaching experience designed to gamify your self-improvement journey. Inspired by "Solo Leveling," this application acts as your personal "System," analyzing your physical performance and nutritional intake to help you "Level Up" in real life.

## 🚀 Key Features

### 1. 👁️ The AI Form Coach ("The System's Gaze")
Upload an image of your exercise (e.g., Pushups, Squats), and the **Gemini 2.5 Flash** AI—acting as a ruthless but effective RPG System—will analyze your form.
-   **Status Check**: Detects if your form is Correct, Incorrect, or Dangerous.
-   **Correction Cues**: Specific, actionable advice (e.g., "Tuck elbows", "Engage core").
-   **System Alerts**: Fun, RPG-style status messages about your potential.

### 2. 🍛 Indian Middle-Class Diet Generator
Forget expensive avocados and salmon. This diet generator is fine-tuned for the **Indian Middle-Class context**.
-   **Budget-Friendly**: Prioritizes affordable ingredients like Dal, Rice, Roti, Soya Chunks, and seasonal Sabzi.
-   **Culturally Appropriate**: Generates familiar comfort foods (e.g., "Paneer Bhurji", "Dal Chawal") with healthy twists.
-   **Structured Plans**: Provides Calories, Macros, and pragmatic cooking tips.

## 🛠️ Tech Stack
-   **Frontend**: React + Vite + TypeScript
-   **AI**: Google Gemini API (Gemini 2.5 Flash)
-   **Styling**: Vanilla CSS / Tailwind (if applicable)

## 🏃 Run Locally

**Prerequisites:** Node.js

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment:**
    Set the `GEMINI_API_KEY` in `.env.local`:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Awaken The System:**
    ```bash
    npm run dev
    ```
    Access the portal at `http://localhost:3000` (or the port specified in your terminal).
