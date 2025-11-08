import { supabase, Meal } from '@/lib/supabase';

export const mealsService = {
  async saveMeal(meal: Meal) {
    const { data, error } = await supabase
      .from('meals')
      .insert([meal])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMealHistory(userId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getMealsByDateRange(userId: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getMealStats(userId: string, days: number = 7) {
    const meals = await this.getMealsByDateRange(userId, days);

    if (!meals || meals.length === 0) {
      return {
        total_meals: 0,
        avg_glucose_delta: 0,
        healthy_meals_count: 0,
        risky_meals_count: 0,
        healthy_meals_ratio: 0,
      };
    }

    const healthyCount = meals.filter(m => m.status === 'normal').length;
    const riskyCount = meals.filter(m => m.status === 'high').length;
    const avgDelta = meals.reduce((sum, m) => sum + (m.glucose_delta || 0), 0) / meals.length;

    return {
      total_meals: meals.length,
      avg_glucose_delta: Math.round(avgDelta * 10) / 10,
      healthy_meals_count: healthyCount,
      risky_meals_count: riskyCount,
      healthy_meals_ratio: Math.round((healthyCount / meals.length) * 100) / 100,
    };
  },

  async getLatestMeal(userId: string) {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
