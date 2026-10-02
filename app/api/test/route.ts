import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET() {
  const { data, error } = await supabaseServer
    .from('categories')
    .select('*')
  
  return NextResponse.json({ data, error })
}
