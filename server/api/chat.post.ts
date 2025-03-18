import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
  const client = new OpenAI({
    apiKey: process.env.CHATBOT_API_KEY,
  });
  const data = await readBody(event);
  console.log('ini data', data);
  console.log('ini env', process.env.CHATBOT_API_KEY);

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: JSON.parse(data).messages,
  });

  console.log('ini respon', response.choices[0].message);

  return response.choices[0].message;
});
