import { RecommendationResult } from '@/types'
import ResultCard from './ResultCard'

interface Props {
  results: RecommendationResult[]
  category: string
  merchant: string
  amount: string
}

export default function ResultsList({ results, category, merchant, amount }: Props) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p className="text-4xl mb-2">🤷</p>
        <p className="font-medium">No matching cards found</p>
        <p className="text-sm">Try adding more cards or selecting a different category</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="font-semibold text-slate-800">Recommendation</h2>
        <p className="text-sm text-slate-500">
          ₹{amount} on {merchant} · {category}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {results.map((r) => (
          <ResultCard key={r.card.card_id} result={r} />
        ))}
      </div>
    </div>
  )
}