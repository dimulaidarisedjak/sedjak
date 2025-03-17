import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
  const client = new OpenAI({
    apiKey: process.env.CHATBOT_API_KEY,
  });
  const data = await readBody(event);

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: JSON.parse(data).messages,
  });

  return response.choices[0].message;
});
