import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

export const runtime = 'edge'

export async function POST(request: Request) {
    const { messages } = await request.json()

    const result = await streamText({
        model: google('gemini-2.5-flash'),
        system: `You are LifeCoach AI, a friendly personal health and wellness coach.
The user gives you their daily check-in data: sleep hours, sleep quality, energy level, water intake, exercise, and notes.
Based on this, give them:
1. A short warm personal observation about their day.
2. A complete recommended plan for the rest of their day (meals, movement, rest, hydration, mindset).
Keep it practical, encouraging, and specific. Use clear sections with headings.`,
        messages,
    })

    return result.toDataStreamResponse()
}