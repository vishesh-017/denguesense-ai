# 🩸 DengueSense AI

**Community-Driven Dengue Mosquito Breeding Site Detection**

DengueSense AI is a smart, React-based web application that leverages AI Vision to identify and manage potential mosquito breeding sites in your community. Built for the **Microsoft AI Classroom Hackathon 2025**.

## ✨ Key Features

- 📸 **AI Image Scan**: Upload photos of your surroundings. The AI detects stagnant water, open containers, and potential larvae sites.
- 🗺️ **Hotspot Map**: Visualize high-risk breeding areas in the community.
- 📊 **Analytics Dashboard**: Track community efforts, trends, and eliminated sites over time.
- 🏆 **Impact Gamification**: Encourages participation by tracking user rank, sites found, and lives potentially saved.
- 💬 **AI Health Assistant**: Integrated chatbot to provide WHO-aligned health advice and dengue prevention tips.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Tailwind CSS, shadcn/ui, Radix UI
- **Icons & Charts**: Lucide React, Recharts
- **Backend/Services**: Supabase (Database/Auth) & Azure AI Vision
- **Edge Functions**: Deno (for AI Health Assistant)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/vishesh-017/denguesense-ai.git
cd denguesense-ai
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

## 📂 Project Structure
- `/src/components` - Reusable UI elements (shadcn) and feature-specific components.
- `/src/pages` - Main application views.
- `/src/hooks` - Custom React hooks.
- `/src/integrations` - Supabase configurations and types.
- `/supabase/functions` - Serverless edge functions (e.g., `health-assistant`).

## ⚠️ Disclaimer
**DengueSense AI is a hackathon prototype.** The current image analysis uses simulated mock data and is intended for demonstration purposes only. It is not a substitute for professional environmental hazard assessment or medical advice.
