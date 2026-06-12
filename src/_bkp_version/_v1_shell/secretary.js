import { GoogleGenAI } from "@google/genai";

import readline from "readline";

import { allDefinitions as calendarDefinitions } from "./tools/calendar.js";
import { allDefinitions as emailDefinitions } from "./tools/email.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

const allDefinitions = calendarDefinitions.concat(emailDefinitions);
const allDeclarations = allDefinitions.map((def) => def.declaration);
const allFunctions = Object.fromEntries(
  allDefinitions.map((def) => [def.declaration.name, def.function]),
);

//Cria interface terminal (shell)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const baseUseAICalendar = async () => {
  try {
    console.log("Script iniciado:", new Date().toISOString());
    const models = {
      pro: "gemini-2.5-pro",
      flash: "gemini-2.5-flash",
      lite: "gemini-3.1-flash-lite",
      tts: "Gemini 2.5 Flash TTS",
    };

    const model = models.lite;

    // const contents = [
    //   {
    //     role: "user",
    //     parts: [
    //       {
    //         // text: "que dia é hoje?",
    //         // text: "qual a temperatura no Brasil?",
    //         // text: "quais eventos na minha agenda para o dia 10/06/20230?",
    //         //text: "quais eventos na minha agenda enter os dias 2026-06-02?",
    //         //text: "marque um evento novo para dia 10/06/2026 as 20:00, chamado 'Jantar comemorativo' com Roberta e Fernanda.",
    //         //text: "madar um email com mensagem de bonita e emotiva de feliz aniversario, para Roberta.",
    //         //text: "quais eventos tem na minha agenda hoje?",
    //         text: "moster todos os eventos do mes que tenho em minha agenda.",
    //       },
    //     ],
    //   },
    // ];
    const contents = [];

    while (true) {
      const query = await new Promise((resolve) => {
        rl.question("Voce: ", resolve);
      });

      contents.push({
        role: "user",
        parts: [{ text: query }],
      });

      let response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
          tools: [{ functionDeclarations: allDeclarations }],
        },
      });

      while (response.functionCalls) {
        console.log(response.functionCalls.length);

        for (const func of response.functionCalls) {
          const functionToExecute = func.name;
          const functionParameters = func.args;

          console.log(`>> Chamada de função: ${functionToExecute}`);

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
        }

        response = await ai.models.generateContent({
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
      }

      console.log(`AI: ${response.candidates[0].content.parts[0].text}`);
    }
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
