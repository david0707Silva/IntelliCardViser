'use client'

interface Props {
  merchants: string[]
  selected: string | null
  onSelect: (merchant: string) => void
}

export default function MerchantPicker({ merchants, selected, onSelect }: Props) {
  const items = Array.isArray(merchants) ? merchants : []
  return (
    <div>
      <h2 className="text-sm font-medium text-slate-500 mb-3">Select Merchant</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {items.map((m) => (
          <button
            key={m}
            onClick={() => onSelect(m)}
            className={
              'px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ' +
              (selected === m
                ? 'border-slate-800 bg-slate-800 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400')
            }
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  )
}