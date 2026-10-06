import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

const ALLOWED_CATEGORIES = [
  'Food Delivery', 'Dining', 'Grocery', 'Shopping', 'Electronics',
  'Flights', 'Hotels', 'Transport', 'Movies', 'Entertainment',
  'Fuel', 'Recharge', 'Utility', 'Other'
]

function sanitize(str: string): string {
  return str.replace(/[<>'"%;()&+]/g, '').trim().slice(0, 200)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { card_name, category, correct_data } = body

    if (!card_name || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const clean = {
      card_name: sanitize(String(card_name)),
      category: sanitize(String(category)),
      correct_data: correct_data ? sanitize(String(correct_data)) : null,
    }

    if (clean.card_name.length < 2) {
      return NextResponse.json({ error: 'Invalid card name' }, { status: 400 })
    }

    const { error } = await supabaseServer
      .from('feedback')
      .insert([clean])

    if (error) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}