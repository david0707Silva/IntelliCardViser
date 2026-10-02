'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CategoryPicker from '@/components/CategoryPicker'
import MerchantPicker from '@/components/MerchantPicker'
import AmountInput from '@/components/AmountInput'
import ResultsList from '@/components/ResultsList'
import { Button } from '@/components/ui/button'
import { getSelectedCardIds } from '@/lib/cookies'

interface Category {
  name: string
  merchants: string[]
}

const CATEGORY_ORDER = [
  'Food Delivery',
  'Dining',
  'Grocery',
  'Shopping',
  'Electronics',
  'Flights',
  'Hotels',
  'Transport',
  'Movies',
  'Entertainment',
  'Fuel',
  'Recharge',
  'Utility',
  'Other',
]

export default function Home() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [hasCards, setHasCards] = useState(false)

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sorted = [...data].sort((a, b) => {
            const ai = CATEGORY_ORDER.indexOf(a.name)
            const bi = CATEGORY_ORDER.indexOf(b.name)
            if (ai === -1 && bi === -1) return a.name.localeCompare(b.name)
            if (ai === -1) return 1
            if (bi === -1) return -1
            return ai - bi
          })
          setCategories(sorted)
        }
      })
    setHasCards(getSelectedCardIds().length > 0)
  }, [])

  const selectedCategoryData = Array.isArray(categories)
    ? categories.find((c) => c.name === selectedCategory)
    : undefined

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat)
    setSelectedMerchant(null)
    setShowResults(false)
    setResults([])
  }

  const handleGetRecommendation = async () => {
    if (!selectedCategory || !selectedMerchant || !amount) return
    setLoading(true)
    setShowResults(false)
    const cardIds = getSelectedCardIds()
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: selectedCategory,
        merchant: selectedMerchant,
        amount,
        card_ids: cardIds,
      }),
    })
    const data = await res.json()
    setResults(data)
    setLoading(false)
    setShowResults(true)
  }

  const handleReset = () => {
    setSelectedCategory(null)
    setSelectedMerchant(null)
    setAmount('')
    setResults([])
    setShowResults(false)
  }

  const canRecommend = selectedCategory && selectedMerchant && amount

  // Header — changes based on which screen we are on
  const Header = () => (
    <div className="flex items-center justify-between mb-8">
      <button onClick={handleReset} className="text-left">
        <h1 className="text-2xl font-bold text-slate-800">IntelliCardViser</h1>
        <p className="text-slate-500 mt-0.5 text-xs">Find the best card for every purchase</p>
      </button>
      <div className="flex items-center gap-3">
        {showResults ? (
          <>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => router.push('/my-cards')}
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              My Cards
            </button>
          </>
        ) : (
          <Button
            onClick={() => router.push('/my-cards')}
            variant="outline"
            className="text-sm"
          >
            My Cards
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-8">

        <Header />

        {!hasCards ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
            <p className="text-4xl mb-3">💳</p>
            <h2 className="font-semibold text-slate-800 mb-2">No cards added yet</h2>
            <p className="text-sm text-slate-500 mb-6">
              Add your credit cards to get personalised recommendations
            </p>
            <Button
              onClick={() => router.push('/my-cards')}
              className="bg-slate-800 hover:bg-slate-700"
            >
              Add My Cards
            </Button>
          </div>
        ) : !showResults ? (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <CategoryPicker
                categories={categories.map((c) => c.name)}
                selected={selectedCategory}
                onSelect={handleCategorySelect}
              />
            </div>

            {selectedCategory && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <MerchantPicker
                  merchants={selectedCategoryData?.merchants ?? []}
                  selected={selectedMerchant}
                  onSelect={setSelectedMerchant}
                />
              </div>
            )}

            {selectedMerchant && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <AmountInput value={amount} onChange={setAmount} />
              </div>
            )}

            {canRecommend && (
              <Button
                onClick={handleGetRecommendation}
                disabled={loading}
                className="w-full h-12 text-base font-semibold bg-slate-800 hover:bg-slate-700"
              >
                {loading ? 'Finding best card...' : 'Get Recommendation'}
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ResultsList
              results={results}
              category={selectedCategory!}
              merchant={selectedMerchant!}
              amount={amount}
            />
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-12 text-base font-semibold mt-2"
            >
              Start Over
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}