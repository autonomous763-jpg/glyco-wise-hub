import { supabase, ChatMessage } from '@/lib/supabase';

export const chatService = {
  async saveChatMessage(message: ChatMessage) {
    const { data, error } = await supabase
      .from('chat_history')
      .insert([message])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getChatHistory(userId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async clearChatHistory(userId: string) {
    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  },

  async sendMessageToGroq(message: string, history: ChatMessage[], userContext?: any) {
    const groqApiKey = import.meta.env.GROQ_API_KEY;

    if (!groqApiKey) {
      throw new Error('Groq API key not configured');
    }

    const systemPrompt = `You are a professional health and nutrition AI assistant for GlycoCare+, a diabetes and cardiovascular health management app.

Your role is to:
- Provide personalized diet and nutrition advice
- Help manage blood glucose levels
- Offer recommendations for blood pressure and heart health
- Suggest low-GI food alternatives
- Explain meal impacts on health metrics
- Provide actionable health tips

Context about the user:
${userContext ? JSON.stringify(userContext, null, 2) : 'No user context available'}

Be supportive, accurate, and concise. Always prioritize user safety and recommend consulting healthcare professionals for medical decisions.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-10).map(h => ({
        role: h.role,
        content: h.message,
      })),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  },
};
