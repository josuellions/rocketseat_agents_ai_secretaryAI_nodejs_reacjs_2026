import { GoogleGenAI } from "@google/genai";

try {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: "que dia é hoje?",
        },
      ],
    },
  ];

  let response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      tools: [
        {
          functionDeclarations: [
            {
              name: "getTodayDate",
              description: "retorna a data de hoje no formato yyyy-mm-dd",
            },
          ],
        },
      ],
    },
  });

  contents.push(response.candidates[0].content);

  contents.push({
    role: "user",
    parts: [
      {
        functionResponse: {
          name: "getTodayDate",
          response: { result: "2026-06-03" },
        },
      },
    ],
  });

  response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });

  console.log(response.candidates[0].content);
} catch (error) {
  if (error.status === 429) {
    console.error("Limite de requisições excedido.");
  } else {
    console.error(error);
  }
}
