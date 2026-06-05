import { GoogleGenAI } from "@google/genai";

import { allDefinitions as calendarDefinitions } from "./tools/calendar.js";
import { allDefinitions as emailDefinitions } from "./tools/email.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

const allDefinitions = calendarDefinitions.concat(emailDefinitions);
const allDeclarations = allDefinitions.map((def) => def.declaration);
const allFunctions = Object.fromEntries(
  allDefinitions.map((def) => [def.declaration.name, def.function]),
);

const baseUseAICalendar = async () => {
  try {
    console.log("Script iniciado:", new Date().toISOString());
    const model = "gemini-3.1-flash-lite"; // "gemini-2.5-flash"

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: "que dia é hoje?",
            // text: "qual a temperatura no Brasil?",
            // text: "quais eventos na minha agenda para o dia 10/06/20230?",
            //text: "quais eventos na minha agenda enter os dias 2026-06-02?",
            //text: "marque um evento novo para dia 10/06/2026 as 20:00, chamado 'Jantar comemorativo' com Roberta e Fernanda.",
            //text: "madar um email com mensagem de bonita e emotiva de feliz aniversario, para Roberta.",
          },
        ],
      },
    ];

    let response = await ai.models.generateContent({
      //model: "gemini-2.5-flash",
      //model: "gemini-3.1-flash-lite",
      model: model,
      contents: contents,
      config: {
        tools: [
          {
            functionDeclarations: allDeclarations,
          },
        ],
      },
    });

    const functionCall = response.candidates[0].content.parts[0].functionCall;
    const functionToExecute = functionCall.name;
    const functionParameters = functionCall.args;

    const fn = allFunctions[functionToExecute];

    const result = fn(functionParameters);

    const functionResponse = {
      role: "user",
      parts: [
        {
          functionResponse: {
            name: functionToExecute,
            response: { result: result },
          },
        },
      ],
    };

    contents.push(functionResponse);

    response = await ai.models.generateContent({
      model: model,
      contents: contents,
    });

    console.log(response.candidates[0].content.parts[0]);
  } catch (error) {
    if (error.status === 429) {
      console.error("Limite de requisições excedido.");
    } else {
      console.error(error);
    }
  }
};

const handleUseCalendar = async () => {
  try {
    console.log("Script iniciado:", new Date().toISOString());
    console.log(
      allDefinitions[5].function({
        contact: "roberta@email",
        message: "Vamos jantar hoje as 20:00h!",
      }),
    );
    console.log(allDefinitions[4].function());
    return;
    console.log(
      allDefinitions[2].function({
        title: "jantar com a Roberta",
        date: "2026-06-04",
        time: "18:00",
        attendees: ["Josuel", "Roberta"],
      }),
    );
    console.log(
      allDefinitions[1].function({
        date: "2026-06-04",
      }),
    );
    console.log(
      allDefinitions[3].function({
        title: "jantar com a Roberta",
        date: "2026-06-04",
        newTime: "20:00",
      }),
    );
    console.log(
      allDefinitions[1].function({
        date: "2026-06-04",
      }),
    );
  } catch (error) {
    if (error.status === 429) {
      console.error("Limite de requisições excedido.");
    } else {
      console.error(error);
    }
  }
};

//handleUseCalendar();
baseUseAICalendar();
