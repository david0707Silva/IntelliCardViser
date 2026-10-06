import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

function sanitize(str: string): string {
  return str.replace(/[<>'"%;()&+]/g, '').trim().slice(0, 200)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { bank_name, card_name } = body

    if (!bank_name || !card_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const clean = {
      bank_name: sanitize(String(bank_name)),
      card_name: sanitize(String(card_name)),
    }

    if (clean.bank_name.length < 2 || clean.card_name.length < 2) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const { error } = await supabaseServer
      .from('card_needed')
      .insert([clean])

    if (error) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}