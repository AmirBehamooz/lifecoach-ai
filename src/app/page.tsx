'use client'

import { useChat } from 'ai/react'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'

export default function Home() {
  const { messages, append, isLoading } = useChat()

  // form state
  const [sleepHours, setSleepHours] = useState(7)
  const [sleepQuality, setSleepQuality] = useState('good')
  const [energy, setEnergy] = useState('medium')
  const [water, setWater] = useState(4)
  const [exercised, setExercised] = useState(false)
  const [notes, setNotes] = useState('')

  // build the message and send to AI
  function handleSubmit() {
    const summary = `Here is my daily check-in:
- Sleep: ${sleepHours} hours
- Sleep quality: ${sleepQuality}
- Energy level: ${energy}
- Water: ${water} glasses
- Exercised: ${exercised ? 'yes' : 'no'}
- Notes: ${notes || 'none'}

Please give me my personal observation and a full plan for the rest of my day.`

    append({ role: 'user', content: summary })
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-50 to-white">

      {/* header */}
      <div className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">
          🌱
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">LifeCoach AI</h1>
          <p className="text-xs text-gray-500">Your personal daily health and wellness coach</p>
        </div>
      </div>

      <div className="w-full max-w-2xl p-6 flex flex-col gap-6">

        {/* check-in form */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-5">
          <h2 className="text-lg font-bold text-gray-800">Daily Check-in</h2>

          {/* sleep hours */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Sleep last night: {sleepHours} hours
            </label>
            <input
              type="range"
              min="0"
              max="12"
              value={sleepHours}
              onChange={e => setSleepHours(Number(e.target.value))}
              className="w-full accent-green-500"
            />
          </div>

          {/* sleep quality */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Sleep quality</label>
            <div className="flex gap-2">
              {['bad', 'medium', 'good'].map(option => (
                <button
                  key={option}
                  onClick={() => setSleepQuality(option)}
                  className={`flex-1 py-2 rounded-lg text-sm capitalize ${sleepQuality === option
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* energy */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Energy level</label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map(option => (
                <button
                  key={option}
                  onClick={() => setEnergy(option)}
                  className={`flex-1 py-2 rounded-lg text-sm capitalize ${energy === option
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* water */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Water today: {water} glasses
            </label>
            <input
              type="range"
              min="0"
              max="12"
              value={water}
              onChange={e => setWater(Number(e.target.value))}
              className="w-full accent-green-500"
            />
          </div>

          {/* exercise */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Did you exercise today?</label>
            <div className="flex gap-2">
              <button
                onClick={() => setExercised(true)}
                className={`flex-1 py-2 rounded-lg text-sm ${exercised ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
              >
                Yes
              </button>
              <button
                onClick={() => setExercised(false)}
                className={`flex-1 py-2 rounded-lg text-sm ${!exercised ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
              >
                No
              </button>
            </div>
          </div>

          {/* notes */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Anything else?</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="How are you feeling today?"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-sm resize-none"
              rows={3}
            />
          </div>

          {/* submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium"
          >
            {isLoading ? 'Thinking...' : 'Get my plan'}
          </button>
        </div>

        {/* AI recommendation */}
        {messages.filter(m => m.role === 'assistant').map(message => (
          <div key={message.id} className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              🌱 Your plan for today
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}

      </div>
    </main>
  )
}