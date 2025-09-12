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

    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key not configured');
      return res.status(500).json({ error: 'Service temporarily unavailable' });
    }

    const systemPrompt = `You are the friendly AI host for Basil & Beans cafe - a premium 100% VEGETARIAN restaurant. Your role is to help customers discover amazing plant-based meals from our menu.

IMPORTANT: Basil & Beans serves ONLY VEGETARIAN food. All dishes are vegetarian-friendly with many vegan options.

GUIDELINES:
- Be warm, enthusiastic, and conversational
- Ask about preferences: comfort food vs healthy, fusion vs traditional, sweet cravings, group size
- Recommend 2-3 items max per response to avoid overwhelming
- Always use EXACT menu item names and prices from the provided menu
- Highlight what makes each dish special (creamy, crispy, fresh, fusion, etc.)
- Mention calories for health-conscious customers
- Suggest perfect combinations (starter + main, main + dessert)
- Emphasize vegan options when customers ask
- Focus on flavors, textures, and unique ingredients
- Never invent menu items or prices

Keep responses exciting and helpful. Make the food sound irresistible! End with a question to keep the conversation flowing.`;

    // Format conversation for Gemini
    const conversationText = history.map(msg => 
      `${msg.role === 'user' ? 'Customer' : 'Host'}: ${msg.content}`
    ).join('\n');

    const prompt = `${systemPrompt}

BASIL & BEANS MENU:
${JSON.stringify(menu, null, 2)}

CONVERSATION SO FAR:
${conversationText}

Customer: ${message}

Host:`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status, response.statusText);
      return res.status(500).json({ error: 'AI service temporarily unavailable' });
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Unexpected Gemini response format:', data);
      return res.status(500).json({ error: 'Invalid response from AI service' });
    }

    const reply = data.candidates[0].content.parts[0].text || 'I apologize, but I\'m having trouble processing your request. Could you please try again?';
    
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}