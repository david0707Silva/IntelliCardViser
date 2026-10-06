export type CardVariant = 'cashback' | 'rewards' | 'milestone' | 'hybrid'

export type BenefitType = 'cashback' | 'instant_discount' | 'reward_points' | 'milestone'

export interface CategoryBenefit {
  merchants: string[]
  benefit_type: BenefitType
  benefit_value: number
  max_cap: number | null
  min_txn: number | null
  notes: string | null
}

export interface Card {
  card_id: string
  bank: string
  name: string
  variant: CardVariant
  point_value: number | null
  annual_fee: number
  benefits: Record<string, CategoryBenefit[]>
  last_verified: string
}

export interface Offer {
  offer_id: string
  card_id: string
  merchant: string
  discount: number
  cap: number | null
  type: 'static' | 'dynamic'
  expiry: string | null
  source_url: string | null
}

export interface UserCard {
  id: string
  user_id: string
  card_id: string
  added_at: string
}

export interface RecommendInput {
  category: string
  merchant: string
  amount: number
  user_cards: Card[]
}

export interface RecommendationResult {
  rank: number
  card: Card
  estimated_savings: number
  benefit_type: BenefitType
  benefit_value: number
  cap: number | null
  reason: string
  cap_reminder: string | null
  assumption: string | null
}