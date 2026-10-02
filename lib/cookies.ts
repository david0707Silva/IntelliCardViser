import Cookies from 'js-cookie'

const COOKIE_KEY = 'selected_card_ids'
const COOKIE_EXPIRY = 365

export function getSelectedCardIds(): string[] {
  const val = Cookies.get(COOKIE_KEY)
  if (!val) return []
  try {
    return JSON.parse(val)
  } catch {
    return []
  }
}

export function saveSelectedCardIds(ids: string[]): void {
  Cookies.set(COOKIE_KEY, JSON.stringify(ids), { expires: COOKIE_EXPIRY })
}

export function addCardId(id: string): void {
  const current = getSelectedCardIds()
  if (!current.includes(id)) {
    saveSelectedCardIds([...current, id])
  }
}

export function removeCardId(id: string): void {
  const current = getSelectedCardIds()
  saveSelectedCardIds(current.filter((c) => c !== id))
}
