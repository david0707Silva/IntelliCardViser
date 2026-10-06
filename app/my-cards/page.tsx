'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/types'
import { getSelectedCardIds, addCardId, removeCardId } from '@/lib/cookies'
import { Button } from '@/components/ui/button'

interface GroupedCards {
  [bank: string]: Card[]
}

function CardRequestForm() {
  const [bankName, setBankName] = useState('')
  const [cardName, setCardName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async () => {
    if (!bankName.trim() || !cardName.trim() || submitting) return
    setSubmitting(true)
    try {
      await fetch('/api/card-needed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bank_name: bankName, card_name: cardName }),
      })
      setSubmitted(true)
      setShowForm(false)
    } catch {
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-4 bg-green-50 rounded-xl text-center">
        <p className="text-sm text-green-700 font-medium">Thanks! We will add your card soon.</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-slate-100 rounded-xl">
      {!showForm ? (
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-2">Dont see your card? Let us know.</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-xs text-slate-700 font-medium underline"
          >
            Request a card
          </button>
        </div>
      ) : (
        <div>
          <p className="text-xs font-medium text-slate-600 mb-3">Request a card</p>
          <input
            type="text"
            placeholder="Bank name (e.g. HDFC)"
            value={bankName}
            onChange={(e) => setBankName(e.target.value.slice(0, 100))}
            className="w-full text-sm border border-slate-200 rounded-lg p-2 mb-2 bg-white"
          />
          <input
            type="text"
            placeholder="Card name (e.g. Millennia)"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.slice(0, 100))}
            className="w-full text-sm border border-slate-200 rounded-lg p-2 mb-3 bg-white"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={submitting || !bankName.trim() || !cardName.trim()}
              className="flex-1 bg-slate-800 text-white text-sm py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Submit'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 border border-slate-200 text-slate-600 text-sm py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MyCardsPage() {
  const router = useRouter()
  const [allCards, setAllCards] = useState<Card[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cards')
      .then((r) => r.json())
      .then((data) => {
        setAllCards(Array.isArray(data) ? data : [])
        setSelectedIds(getSelectedCardIds())
        setLoading(false)
      })
  }, [])

  const handleToggle = (cardId: string) => {
    if (selectedIds.includes(cardId)) {
      removeCardId(cardId)
      setSelectedIds((prev) => prev.filter((id) => id !== cardId))
    } else {
      addCardId(cardId)
      setSelectedIds((prev) => [...prev, cardId])
    }
  }

  const grouped: GroupedCards = allCards.reduce((acc, card) => {
    if (!acc[card.bank]) acc[card.bank] = []
    acc[card.bank].push(card)
    return acc
  }, {} as GroupedCards)

  const VARIANT_COLOR: Record<string, string> = {
    cashback: 'bg-green-100 text-green-700',
    rewards: 'bg-blue-100 text-blue-700',
    hybrid: 'bg-purple-100 text-purple-700',
    milestone: 'bg-orange-100 text-orange-700',
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading cards...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-32">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">My Cards</h1>
          <p className="text-sm text-slate-500 mt-1">
            Select the cards you own
          </p>
        </div>

        {Object.keys(grouped).sort().map((bank) => (
          <div key={bank} className="mb-6">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {bank}
            </h2>
            <div className="flex flex-col gap-2">
              {grouped[bank].map((card) => {
                const isSelected = selectedIds.includes(card.card_id)
                return (
                  <button
                    key={card.card_id}
                    onClick={() => handleToggle(card.card_id)}
                    className={
                      'flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left w-full ' +
                      (isSelected
                        ? 'border-slate-800 bg-white'
                        : 'border-slate-200 bg-white hover:border-slate-300')
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className={
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ' +
                        (isSelected ? 'border-slate-800 bg-slate-800' : 'border-slate-300')
                      }>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{card.name}</p>
                        <p className="text-xs text-slate-400">
                          {card.annual_fee === 0 ? 'Lifetime Free' : 'Annual fee: ₹' + card.annual_fee}
                        </p>
                      </div>
                    </div>
                    <span className={
                      'text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ' +
                      (VARIANT_COLOR[card.variant] ?? 'bg-slate-100 text-slate-600')
                    }>
                      {card.variant}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <CardRequestForm />

      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-4 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {selectedIds.length} {selectedIds.length === 1 ? 'card' : 'cards'} selected
            </p>
            <p className="text-xs text-slate-400">
              {selectedIds.length === 0 ? 'Select at least one card' : 'Ready to get recommendations'}
            </p>
          </div>
          <Button
            onClick={() => router.push('/')}
            disabled={selectedIds.length === 0}
            className="bg-slate-800 hover:bg-slate-700 px-6"
          >
            Save and Recommend →
          </Button>
        </div>
      </div>

    </main>
  )
}