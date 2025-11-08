import { supabase, Vitals } from '@/lib/supabase';

export const vitalsService = {
  async saveVitals(vitals: Vitals) {
    const { data, error } = await supabase
      .from('vitals')
      .insert([vitals])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getLatestVitals(userId: string) {
    const { data, error } = await supabase
      .from('vitals')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getVitalsHistory(userId: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('vitals')
      .select('*')
      .eq('user_id', userId)
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getVitalsSummary(userId: string, days: number = 7) {
    const vitals = await this.getVitalsHistory(userId, days);

    if (!vitals || vitals.length === 0) {
      return {
        avg_glucose: 0,
        avg_bp_systolic: 0,
        avg_bp_diastolic: 0,
        avg_heart_rate: 0,
        count: 0,
      };
    }

    const sum = vitals.reduce(
      (acc, v) => ({
        glucose: acc.glucose + (v.glucose_level || 0),
        systolic: acc.systolic + (v.bp_systolic || 0),
        diastolic: acc.diastolic + (v.bp_diastolic || 0),
        heartRate: acc.heartRate + (v.heart_rate || 0),
      }),
      { glucose: 0, systolic: 0, diastolic: 0, heartRate: 0 }
    );

    return {
      avg_glucose: Math.round(sum.glucose / vitals.length),
      avg_bp_systolic: Math.round(sum.systolic / vitals.length),
      avg_bp_diastolic: Math.round(sum.diastolic / vitals.length),
      avg_heart_rate: Math.round(sum.heartRate / vitals.length),
      count: vitals.length,
    };
  },
};
