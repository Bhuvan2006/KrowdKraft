'use client'

import { createClient } from '@supabase/supabase-js'

// process.env.NEXT_PUBLIC_SUPABASE_URL and process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local and .env files
// the above method not working so hardcoding the values for now, will fix it later
const supabaseUrl = 'https://mayjgnbzrvnhbrhgkvhc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1heWpnbmJ6cnZuaGJyaGdrdmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3Mjk1OTUsImV4cCI6MjA4NjMwNTU5NX0.TxVwfzL7BwWzI6JK-ZQX2XyDTgCH3ZOQiWKz8qHRl_Q'

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
