import { RecommendationResult } from '@/types'
import { Badge } from '@/components/ui/badge'
import CapReminder from './CapReminder'

const RANK_CONFIG = {
  1: { emoji: '🥇', label: 'Best Option', color: 'bg-yellow-50 border-yellow-300' },
  2: { emoji: '🥈', label: 'Second Best', color: 'bg-slate-50 border-slate-300' },
  3: { emoji: '🥉', label: 'Third Best', color: 'bg-orange-50 border-orange-200' },
}

interface Props {
  result: RecommendationResult
}

export default function ResultCard({ result }: Props) {
  const config = RANK_CONFIG[result.rank as 1 | 2 | 3]

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
    </div>
  )
}