import { useState } from 'react'
import { RecommendationResult } from '@/types'
import { Badge } from '@/components/ui/badge'
import CapReminder from './CapReminder'

const RANK_CONFIG = {
  1: { emoji: '🥇', label: 'Best Option', color: 'bg-yellow-50 border-yellow-300' },
  2: { emoji: '🥈', label: 'Second Best', color: 'bg-slate-50 border-slate-300' },
  3: { emoji: '🥉', label: 'Third Best', color: 'bg-orange-50 border-orange-200' },
}

const CATEGORIES = [
  'Food Delivery', 'Dining', 'Grocery', 'Shopping', 'Electronics',
  'Flights', 'Hotels', 'Transport', 'Movies', 'Entertainment',
  'Fuel', 'Recharge', 'Utility', 'Other'
]

interface Props {
  result: RecommendationResult
  currentCategory: string
}

export default function ResultCard({ result, currentCategory }: Props) {
  const config = RANK_CONFIG[result.rank as 1 | 2 | 3]
  const [showForm, setShowForm] = useState(false)
  const [category, setCategory] = useState(currentCategory)
  const [correctData, setCorrectData] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (submitting) return
    setSubmitting(true)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card_name: result.card.name,
          category,
          correct_data: correctData || null,
        }),
      })
      setSubmitted(true)
      setShowForm(false)
    } catch {
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={'rounded-xl border-2 p-4 ' + config.color}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{config.emoji}</span>
          <div>
            <p className="text-xs font-medium text-slate-500">{config.label}</p>
            <p className="font-semibold text-slate-800">{result.card.name}</p>
            <p className="text-xs text-slate-500">{result.card.bank}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Estimated savings</p>
          <p className="text-2xl font-bold text-green-600">{'₹' + result.estimated_savings}</p>
          <Badge variant="outline" className="text-xs mt-1">
            {result.benefit_value + '% ' + result.benefit_type.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 mt-2">
        <p className="text-xs font-medium text-slate-500 mb-1">Why this card</p>
        <p className="text-sm text-slate-700">{result.reason}</p>
      </div>

      {result.assumption && (
        <p className="text-xs text-slate-400 mt-2 italic">{'* ' + result.assumption}</p>
      )}

      {result.cap_reminder && (
        <CapReminder message={result.cap_reminder} />
      )}

      <div className="mt-3">
        {submitted ? (
          <p className="text-xs text-green-600">Thanks for the feedback!</p>
        ) : showForm ? (
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <p className="text-xs font-medium text-slate-600 mb-2">Report incorrect data</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg p-2 mb-2 bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <textarea
              value={correctData}
              onChange={(e) => setCorrectData(e.target.value.slice(0, 200))}
              placeholder="What is the correct data? (optional)"
              className="w-full text-xs border border-slate-200 rounded-lg p-2 mb-2 resize-none h-16"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-slate-800 text-white text-xs py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-slate-200 text-slate-600 text-xs py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="text-xs text-slate-400 hover:text-slate-600 underline"
          >
            Report incorrect data
          </button>
        )}
      </div>
    </div>
  )
}