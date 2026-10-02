import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import { recommend } from '@/lib/recommend'
import { Card } from '@/types'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { category, merchant, amount, card_ids } = body

  if (!category || !merchant || !amount || !card_ids?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data: cards, error } = await supabaseServer
    .from('cards')
    .select('*')
    .in('card_id', card_ids)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const results = recommend({
    category,
    merchant,
    amount: parseFloat(amount),
    user_cards: cards as Card[],
  })

  return NextResponse.json(results)
}
