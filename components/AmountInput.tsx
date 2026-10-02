'use client'

import { Input } from '@/components/ui/input'

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function AmountInput({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-sm font-medium text-slate-500 mb-3">Enter Amount</h2>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
        <Input
          type="number"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-8 text-lg font-medium h-12"
        />
      </div>
    </div>
  )
}
