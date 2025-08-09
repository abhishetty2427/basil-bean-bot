import menu from '../../menu/menu.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { history = [], message = '' } = JSON.parse(req.body || '{}');

  const systemPrompt = `You are Basil & Beans Table Host. Ask the customer for their preferences such as veg or non-veg, spicy level, health goals, and dessert interest. Recommend up to 3 dishes for each course based on the menu provided. Never invent menu items. Provide a concise reason for each recommendation. Always be friendly.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `MENU_JSON:\n${JSON.stringify(menu)}` },
        ...history,
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content || 'Sorry, please try again.';
  res.status(200).json({ reply });
}
