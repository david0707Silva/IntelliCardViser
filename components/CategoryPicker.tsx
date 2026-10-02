'use client'

const CATEGORY_ICONS: Record<string, string> = {
  'Food Delivery': '🛵',
  'Dining': '🍽️',
  'Grocery': '🛒',
  'Shopping': '🛍️',
  'Electronics': '📱',
  'Flights': '✈️',
  'Hotels': '🏨',
  'Transport': '🚗',
  'Movies': '🎬',
  'Entertainment': '🎭',
  'Fuel': '⛽',
  'Recharge': '📶',
  'Utility': '💡',
  'Other': '💳',
}

interface Props {
  categories: string[]
  selected: string | null
  onSelect: (category: string) => void
}

export default function CategoryPicker({ categories, selected, onSelect }: Props) {
  const cats = Array.isArray(categories) ? categories : []
  return (
    <div>
      <h2 className="text-sm font-medium text-slate-500 mb-3">Select Category</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={
              'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ' +
              (selected === cat
                ? 'border-slate-800 bg-slate-800 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400')
            }
          >
            <span className="text-2xl mb-1">{CATEGORY_ICONS[cat] ?? '💳'}</span>
            <span className="text-xs font-medium text-center leading-tight">{cat}</span>
          </button>
        ))}
      </div>
    </div>
  )
}