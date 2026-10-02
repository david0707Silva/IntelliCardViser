interface Props {
  message: string
}

export default function CapReminder({ message }: Props) {
  return (
    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2">
      <span className="text-amber-500 mt-0.5">⚠️</span>
      <p className="text-xs text-amber-700">{message}</p>
    </div>
  )
}
