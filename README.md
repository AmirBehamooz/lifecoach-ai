# LifeCoach AI

A personal daily health and wellness coach powered by AI. Users complete a quick daily check-in about their sleep, energy, hydration, and exercise, and receive a personalized observation plus a complete plan for the rest of their day.

## Live Demo

https://lifecoach-ai-one.vercel.app

## Features

- Daily check-in form with sliders and quick-select buttons
- AI-generated personal observations based on user input
- Complete daily plan covering meals, movement, rest, and mindset
- Clean responsive UI

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Vercel AI SDK
- Google Gemini API
- Deployed on Vercel

## Getting Started

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Create a \`.env.local\` file and add your Google API key:

\`\`\`
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here
\`\`\`

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000 in your browser.