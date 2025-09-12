import menu from '../../menu/menu.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { history = [], message = '' } = req.body;

    if (!message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return res.status(500).json({ error: 'Service temporarily unavailable' });
    }

    const systemPrompt = `You are the friendly AI host for Basil & Beans cafe. Your role is to help customers discover perfect meals from our menu.

GUIDELINES:
- Be warm, welcoming, and conversational
- Ask about dietary preferences (veg/non-veg), spice tolerance, health goals, and group size
- Recommend 2-3 items max per response to avoid overwhelming
- Always use EXACT menu item names and prices from the provided menu
- Include brief reasons for recommendations (taste, health benefits, popularity)
- Mention calories if customers are health-conscious
- Suggest complementary items (starter + main, main + dessert)
- If unsure about preferences, ask clarifying questions
- Never invent menu items or prices

MENU CONTEXT: You have access to our complete menu with detailed nutritional information, ingredients, allergens, and spice levels.

Keep responses concise but helpful. End with a question to keep the conversation flowing.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'system', content: `BASIL & BEANS MENU:\n${JSON.stringify(menu, null, 2)}` },
          ...history,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      return res.status(500).json({ error: 'AI service temporarily unavailable' });
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected OpenAI response format:', data);
      return res.status(500).json({ error: 'Invalid response from AI service' });
    }

    const reply = data.choices[0].message.content || 'I apologize, but I\'m having trouble processing your request. Could you please try again?';
    
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
