import { Card, RecommendInput, RecommendationResult } from '@/types'

// Maps UI categories to benefit categories stored in DB
const CATEGORY_FALLBACKS: Record<string, string[]> = {
  'Dining': ['Dining', 'Food Delivery'],
  'Food Delivery': ['Food Delivery', 'Dining'],
  'Entertainment': ['Entertainment', 'Movies'],
  'Movies': ['Movies', 'Entertainment'],
  'Transport': ['Transport', 'Flights'],
  'Flights': ['Flights', 'Transport'],
  'Electronics': ['Electronics', 'Shopping'],
  'Shopping': ['Shopping', 'Electronics'],
  'Grocery': ['Grocery'],
  'Hotels': ['Hotels'],
  'Utility': ['Utility'],
  'Fuel': ['Fuel'],
  'Recharge': ['Recharge'],
  'Other': ['Other'],
}

function findBestBenefit(card: Card, categories: string[], merchant: string) {
  for (const cat of categories) {
    const benefits = card.benefits[cat]
    if (!benefits || benefits.length === 0) continue

    let best = null
    for (const benefit of benefits) {
      const merchantMatch =
        benefit.merchants.length === 0 ||
        benefit.merchants.some(
          (m: string) => m.toLowerCase() === merchant.toLowerCase()
        )
      if (merchantMatch) {
        if (!best || benefit.benefit_value > best.benefit_value) {
          best = benefit
        }
      }
    }
    if (best) return best
  }
  return null
}

export function recommend(input: RecommendInput): RecommendationResult[] {
  const { category, merchant, amount, user_cards } = input
  const results: RecommendationResult[] = []

  const categoriesToCheck = CATEGORY_FALLBACKS[category] ?? [category]

  for (const card of user_cards) {
    const bestBenefit = findBestBenefit(card, categoriesToCheck, merchant)
    const otherBenefit = card.benefits['Other']?.[0] ?? null

    const benefit = bestBenefit ?? otherBenefit
    if (!benefit) continue

    if (benefit.min_txn && amount < benefit.min_txn) {
      results.push({
        rank: 0,
        card,
        estimated_savings: 0,
        benefit_type: benefit.benefit_type,
        benefit_value: benefit.benefit_value,
        cap: benefit.max_cap,
        reason: 'Minimum transaction of ' + benefit.min_txn + ' required — your amount ' + amount + ' does not qualify',
        cap_reminder: null,
        assumption: benefit.notes,
      })
      continue
    }

    const rawSavings = (amount * benefit.benefit_value) / 100
    const actualSavings = benefit.max_cap
      ? Math.min(rawSavings, benefit.max_cap)
      : rawSavings

    const cappedNote = rawSavings > (benefit.max_cap ?? Infinity)
      ? 'Savings capped at ' + benefit.max_cap + ' (without cap you would save ' + Math.round(rawSavings) + ')'
      : null

    results.push({
      rank: 0,
      card,
      estimated_savings: Math.round(actualSavings * 100) / 100,
      benefit_type: benefit.benefit_type,
      benefit_value: benefit.benefit_value,
      cap: benefit.max_cap,
      reason: benefit.benefit_value + '% ' + benefit.benefit_type.replace('_', ' ') + ' on ' + merchant + ' via ' + card.name,
      cap_reminder: cappedNote ?? (benefit.max_cap
        ? 'Monthly cap of ' + benefit.max_cap + ' must be available for full savings'
        : null),
      assumption: benefit.notes,
    })
  }

  results.sort((a, b) => b.estimated_savings - a.estimated_savings)
  results.forEach((r, i) => (r.rank = i + 1))

  return results.slice(0, 3)
}