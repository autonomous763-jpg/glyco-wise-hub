import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  weight?: number;
  gender?: string;
  diabetes_type?: string;
  has_bp?: boolean;
  has_heart_condition?: boolean;
  created_at?: string;
}

export interface Vitals {
  id?: string;
  user_id: string;
  glucose_level?: number;
  bp_systolic?: number;
  bp_diastolic?: number;
  heart_rate?: number;
  timestamp?: string;
}

export interface Meal {
  id?: string;
  user_id: string;
  dish_name: string;
  portion_g?: number;
  glucose_delta?: number;
  confidence?: number;
  advice?: string;
  status?: string;
  timestamp?: string;
}

export interface ChatMessage {
  id?: string;
  user_id: string;
  role: 'user' | 'assistant';
  message: string;
  timestamp?: string;
}
