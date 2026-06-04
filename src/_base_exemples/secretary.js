import { GoogleGenAI } from "@google/genai";

try {
  console.log("Script iniciado:", new Date().toISOString());

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

  const contents = [
    {
      role: "user",
      parts: [
        {
          // text: "que dia é hoje?",
          text: "qual a temperatura no Brasil?",
        },
      ],
    },
  ];

  let response = await ai.models.generateContent({
    // model: "gemini-2.5-flash",
    model: "gemini-3.1-flash-lite",
    contents: contents,
    config: {
      tools: [
        {
          functionDeclarations: [
            {
              name: "getTodayDate",
              description: "retorna a data de hoje no formato yyyy-mm-dd",
            },
            {
              name: "getCountryTemperature",
              description: "retorna a temperatura do país indicado",
              parameters: {
                type: "OBJECT",
                properties: {
                  country: {
                    type: "STRING",
                    description: "País para qual se quer saber a temperatura",
                  },
                  isCelsius: {
                    type: "BOOLEAN",
                    description:
                      "Se devemos retornar a temperatura em celsius ou não (padrão é true).",
                  },
                },
                require: ["country", "isCelsius"],
              },
            },
          ],
        },
      ],
    },
  });

  console.log(response.candidates[0].content.parts[0].functionCall);

  /*
  contents.push(response.candidates[0].content);

  contents.push({
    role: "user",
    parts: [
      {
        functionResponse: {
          name: "getTodayDate",
          response: { result: "2026-06-04" },
        },
      },
    ],
  });

  response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });

  console.log(response.candidates[0].content);
  */
} catch (error) {
  if (error.status === 429) {
    console.error("Limite de requisições excedido.");
  } else {
    console.error(error);
  }
}
