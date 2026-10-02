export type CardVariant = 'cashback' | 'rewards' | 'milestone' | 'hybrid'

export type BenefitType = 'cashback' | 'instant_discount' | 'reward_points' | 'milestone'

export interface CategoryBenefit {
  merchants: string[]          // empty array = applies to all merchants in category
  benefit_type: BenefitType
  benefit_value: number        // % for cashback/discount, multiplier for points
  max_cap: number | null       // max savings per month in ₹, null = no cap
  min_txn: number | null       // minimum transaction amount, null = no minimum
  notes: string | null         // any assumptions or conditions
}

export interface Card {
  card_id: string
  bank: string
  name: string
  variant: CardVariant
  point_value: number | null   // ₹ value of 1 reward point, null for cashback cards
  annual_fee: number
  benefits: Record<string, CategoryBenefit[]>  // key = category name
  last_verified: string        // ISO date string
}

export interface Offer {
  offer_id: string
  ca  ca  ca  ca  ca  ca  ct: stri  ca  ca  ca  ca  ca  ca  ct: stri  ca  ca  ca  ca  ca  ca  ct: strmic'
  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  etrin  e  e  e  e  e  e  e  e  e  e  eri  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  merch  e  e  e  e  e  e  e number  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  e  er                 // 1 = best, 2 = second, 3 = third
  card: Card
  estimated_sav  estimated_sav  estimated_sav  estimated_sav  estimated_sav  estimated_sav r
                                                           this card won
  cap_reminder: string | null  // warning if cap may be hit
  assumption: string | null    // any assumptions made
}
